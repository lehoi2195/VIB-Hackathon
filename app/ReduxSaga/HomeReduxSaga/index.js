import {put, select, takeLatest, call, delay} from 'redux-saga/effects';
import {createModule} from 'saga-slice';
import {ApiCall} from '@/Utils/ApiActions';
import {API_PAYMENT} from '@/Configs/apiConstants';
import {StartLoading, StopLoading, GeneralModalOpen} from '@/ReduxSaga';
import {CONSTANTS} from '@/Constants';

const HomeReducer = createModule({
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
    GetAccountRequest: (state, payload) => {
      state.params = payload;
    },
    GetAccountSuccess: (state, payload) => {
      state.data = payload;
    },
    GetAccountFailed: (state, payload) => {
      state.error = payload;
    },
  },

  // The sagas option is a function that gets passed the Actions object.
  // Actions are converted into strings which are the value of its
  // corresponding type. You can also use the actions object to dispatch
  // actions from sagas using the `put` effect.
  sagas: AccountActions => ({
    *[AccountActions.GetAccountRequest]({payload}) {
      try {
        yield put(StartLoading());

        /** 1. CALL API**/
        const api = () =>
          ApiCall(API_PAYMENT.TRANSACTIONS_DETAIL, 'GET', payload, true);

        /** 2. API response**/
        const response = yield call(api);

        console.log(`response>>>>>>`, response);

        /** 3. SUCCESS **/
        if (response) {
          yield put(AccountActions.GetAccountSuccess(response));
          yield put(StopLoading());
        } else {
          /** 4. FAILED**/
          yield put(StopLoading());
          yield put(AccountActions.GetAccountFailed(response));
          yield delay(400);
          const generalType = {
            type: 'FAILED',
            action: true,
            isOpen: true,
            backdropClose: false,
            title: 'Failed Request',
            message: 'Vui lòng kiềm tra lại username và password',
          };
          yield put(GeneralModalOpen(generalType));
        }
      } catch (e) {
        /** 5. Error **/
        yield put(AccountActions.GetAccountFailed(e));
        yield put(StopLoading());
      }
    },
  }),
  takers: takeLatest,
});

// Export actions for convenience when importing from other modules
export const {GetAccountRequest, GetAccountSuccess, GetAccountFailed} =
  HomeReducer.actions;
export {HomeReducer};
