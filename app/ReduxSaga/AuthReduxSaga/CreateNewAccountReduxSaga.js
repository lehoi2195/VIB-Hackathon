import {put, select, takeLatest, delay, call} from 'redux-saga/effects';
import {createModule} from 'saga-slice';
import {ApiCall} from '@/Utils/ApiActions';
import {API_AUTH} from '@/Configs/apiConstants';
import {StartLoading, StopLoading, GeneralModalOpen} from '@/ReduxSaga';
const CreateNewAccountReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'CreateNewAccount',
  initialState: {
    params: null,
    data: null,
    error: null,
    shouldRunOnce: 0,
  },

  // Reducers object is the bread and butter of saga slice.
  // Defining a reducer also defines a type and action.
  // The type will be `todos/fetch`, using the pattern of `{name}/{key}`
  reducers: {
    CreateNewAccountRequest: (state, payload) => {
      state.params = payload;
    },
    CreateNewAccountSuccess: (state, payload) => {
      state.error = payload;
    },
    CreateNewAccountFailed: (state, payload) => {
      state.error = payload;
    },
  },

  // The sagas option is a function that gets passed the Actions object.
  // Actions are converted into strings which are the value of its
  // corresponding type. You can also use the actions object to dispatch
  // actions from sagas using the `put` effect.
  sagas: CreateNewAccountActions => ({
    *[CreateNewAccountActions.CreateNewAccountRequest]({payload}) {
      try {
        console.log(`payload>>>>>>`, payload);

        yield put(StartLoading());
        const api = () => ApiCall(API_AUTH.REGISTER, 'POST', payload, false);

        const response = yield call(api);

        console.log(`reponse>>>>>>>`, response);

        /** 3. SUCCESS **/
        if (response?.jwt) {
          yield put(CreateNewAccountActions.CreateNewAccountSuccess(response));
          yield put(StopLoading());
          yield delay(200);
          const generalType = {
            type: 'SUCCESS',
            action: true,
            isOpen: true,
            backdropClose: false,
            navigateTo: 'Login',
            title: 'Succeed Request',
            message: 'Chúc mừng, bạn đã tạo tài khoản thành công',
          };
          yield put(GeneralModalOpen(generalType));
        } else {
          /** 4. FAILED**/
          yield put(StopLoading());
          yield put(CreateNewAccountActions.CreateNewAccountFailed(response));
          yield delay(400);
          const generalType = {
            type: 'FAILED',
            action: true,
            isOpen: true,
            backdropClose: false,
            title: 'Failed Request',
            message:
              'Vui lòng email hoặc username đã tồn tại, xin chọn email hoặc username khác!',
          };
          yield put(GeneralModalOpen(generalType));
        }
      } catch (e) {
        yield put(CreateNewAccountActions.CreateNewAccountFailed(e));
      }
    },
  }),
  takers: takeLatest,
});

// Export actions for convenience when importing from other modules
export const {CreateNewAccountRequest} = CreateNewAccountReducer.actions;
export {CreateNewAccountReducer};
