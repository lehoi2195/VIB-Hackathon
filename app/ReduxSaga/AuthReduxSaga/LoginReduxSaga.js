import {put, select, takeLatest, call, delay} from 'redux-saga/effects';
import {createModule} from 'saga-slice';
import {ApiCall} from '@/Utils/ApiActions';
import {API_AUTH} from '@/Configs/apiConstants';
import {StartLoading, StopLoading, GeneralModalOpen} from '@/ReduxSaga';
import {setValue, removeValue} from '@/Utils/LocalStorage';
import {CONSTANTS} from '@/Constants';

const LoginReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'Login',
  initialState: {
    data: null,
    error: null,
    params: null,
    loginStatus: false,
    shouldRunOnce: 0,
  },

  // Reducers object is the bread and butter of saga slice.
  // Defining a reducer also defines a type and action.
  reducers: {
    LoginRequest: (state, payload) => {
      state.params = payload;
    },
    LoginSuccess: (state, payload) => {
      state.data = payload;
      state.loginStatus = true;
    },
    LoginFailed: (state, payload) => {
      state.error = payload;
    },
    LoginOut: state => {
      state.loginStatus = false;
      removeValue(CONSTANTS.TOKEN);
      removeValue(CONSTANTS.PROFILE_ME);
    },
  },

  // The sagas option is a function that gets passed the Actions object.
  // Actions are converted into strings which are the value of its
  // corresponding type. You can also use the actions object to dispatch
  // actions from sagas using the `put` effect.
  sagas: LoginActions => ({
    *[LoginActions.LoginRequest]({payload}) {
      try {
        yield put(StartLoading());

        /** 1. CALL API**/
        const api = () => ApiCall(API_AUTH.LOGIN, 'POST', payload, false);

        /** 2. API response**/
        const response = yield call(api);

        console.log(`response>>>>>>`, response);

        /** 3. SUCCESS **/
        if (response?.jwt) {
          setValue(CONSTANTS.TOKEN, response?.jwt);
          setValue(CONSTANTS.PROFILE_ME, response?.user);
          console.log(`response?.jwt`, response?.jwt);
          yield put(LoginActions.LoginSuccess(response));
          yield put(StopLoading());
        } else {
          /** 4. FAILED**/
          yield put(StopLoading());
          yield put(LoginActions.LoginFailed(response));
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
        yield put(LoginActions.LoginFailed(e));
        yield put(StopLoading());
      }
    },
  }),
  takers: takeLatest,
});

// Export actions for convenience when importing from other modules
export const {LoginRequest, LoginSuccess, LoginOut} = LoginReducer.actions;
export {LoginReducer};
