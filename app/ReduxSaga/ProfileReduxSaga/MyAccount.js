import {put, select, takeLatest, call, delay} from 'redux-saga/effects';
import {createModule} from 'saga-slice';
import {ApiCall} from '@/Utils/ApiActions';
import {API_BANK_ACCOUNT} from '@/Configs/apiConstants';
import {StartLoading, StopLoading, GeneralModalOpen} from '@/ReduxSaga';
import {setValue, removeValue} from '@/Utils/LocalStorage';
import {CONSTANTS} from '@/Constants';

const MyAccountReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'MyAccount',
  initialState: {
    data: null,
    error: null,
    params: null,
    shouldRunOnce: 0,
  },

  // Reducers object is the bread and butter of saga slice.
  // Defining a reducer also defines a type and action.
  reducers: {
    MyAccountRequest: (state, payload) => {
      state.params = payload;
    },
    MyAccountSuccess: (state, payload) => {
      state.data = payload;
    },
    MyAccountFailed: (state, payload) => {
      state.error = payload;
    },
  },

  // The sagas option is a function that gets passed the Actions object.
  // Actions are converted into strings which are the value of its
  // corresponding type. You can also use the actions object to dispatch
  // actions from sagas using the `put` effect.
  sagas: MyAccountActions => ({
    *[MyAccountActions.MyAccountRequest]({payload}) {
      try {
        yield put(StartLoading());

        /** 1. CALL API**/
        const api = () =>
          ApiCall(
            API_BANK_ACCOUNT.BANK_ACCOUNTS_DETAIL(payload),
            'GET',
            {},
            false,
          );

        /** 2. API response**/
        const response = yield call(api);

        /** 3. SUCCESS **/
        if (response[0]?.user) {
          yield put(MyAccountActions.MyAccountSuccess(response[0]));
          yield put(StopLoading());
        } else {
          /** 4. FAILED**/
          yield put(StopLoading());
          yield put(MyAccountActions.MyAccountFailed(response));
          yield delay(400);
          const generalType = {
            type: 'FAILED',
            action: true,
            isOpen: true,
            backdropClose: false,
            title: 'Failed Request',
            message: 'Vui lòng kiềm tra các thông tin đã nhập',
          };
          yield put(GeneralModalOpen(generalType));
        }
      } catch (e) {
        /** 5. Error **/
        yield put(MyAccountActions.PaymentFailed(e));
        yield put(StopLoading());
      }
    },
  }),
  takers: takeLatest,
});

// Export actions for convenience when importing from other modules
export const {MyAccountRequest, MyAccountSuccess} = MyAccountReducer.actions;
export {MyAccountReducer};
