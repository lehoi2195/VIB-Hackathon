import {put, select, takeLatest, call, delay} from 'redux-saga/effects';
import {createModule} from 'saga-slice';
import {ApiCall} from '@/Utils/ApiActions';
import {API_AUTH} from '@/Configs/apiConstants';
import {StartLoading, StopLoading, GeneralModalOpen} from '@/ReduxSaga';

const ForgotPasswordReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'ForgetPassword',
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
    ForgotPasswordRequest: (state, payload) => {
      state.params = payload;
    },
    ForgotPasswordSuccess: (state, payload) => {
      state.data = payload;
    },
    ForgotPasswordFailed: (state, payload) => {
      state.error = payload;
    },
  },

  // The sagas option is a function that gets passed the Actions object.
  // Actions are converted into strings which are the value of its
  // corresponding type. You can also use the actions object to dispatch
  // actions from sagas using the `put` effect.
  sagas: ForgotPasswordActions => ({
    *[ForgotPasswordActions.ForgotPasswordRequest]({payload}) {
      try {
        console.log(`payload>>>>>>`, payload);

        yield put(StartLoading());
        const api = () =>
          ApiCall(API_AUTH.FORGOT_PASSWORD, 'POST', payload, false);

        const response = yield call(api);

        console.log(`reponse>>>>>>>`, response);

        /** 3. SUCCESS **/
        if (response) {
          yield put(ForgotPasswordActions.ForgotPasswordSuccess(response));
          yield put(StopLoading());
          return response;
        } else {
          /** 4. FAILED**/
          yield put(StopLoading());
          yield put(ForgotPasswordActions.ForgotPasswordFailed(response));
          yield delay(200);
          const generalType = {
            type: 'FAILED',
            action: true,
            isOpen: true,
            backdropClose: false,
            title: 'Failed Request',
            message: 'Vui lòng kiềm tra lại email bạn',
          };
          yield put(GeneralModalOpen(generalType));
        }
      } catch (e) {
        yield put(ForgotPasswordActions.ForgotPasswordFailed(e));
      }
    },
  }),
  takers: takeLatest,
});

// Export actions for convenience when importing from other modules
export const {ForgotPasswordRequest} = ForgotPasswordReducer.actions;
export {ForgotPasswordReducer};
