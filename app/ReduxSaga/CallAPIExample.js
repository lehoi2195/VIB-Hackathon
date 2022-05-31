import {put, select, takeLatest, call} from 'redux-saga/effects';
import {createModule} from 'saga-slice';
import {GET} from '../Utils/ApiActions';
import {API_AUTH} from '../Configs/apiConstants';

const CallAPIExample = createModule({
  // Key name that gets added to combineReducers
  name: 'APIExample',
  initialState: {
    isFetching: false,
    data: null,
    error: null,
    shouldRunOnce: 0,
  },

  // Reducers object is the bread and butter of saga slice.
  // Defining a reducer also defines a type and action.
  // The type will be `todos/fetch`, using the pattern of `{name}/{key}`
  reducers: {
    apiExampleFetch: (state, payload) => {
      state.isFetching = true;
    },
    apiExampleSuccess: (state, payload) => {
      state.isFetching = false;
      state.data = payload;
    },
    apiExampleFailed: (state, payload) => {
      state.isFetching = false;
      state.error = payload;
    },
  },

  // The sagas option is a function that gets passed the Actions object.
  // Actions are converted into strings which are the value of its
  // corresponding type. You can also use the actions object to dispatch
  // actions from sagas using the `put` effect.
  sagas: Actions => ({
    *[Actions.apiExampleFetch]({payload}) {
      try {
        console.log(`payload`, payload);
        const api = GET(API_AUTH.PROFILE_ME, {}, null);

        console.log(`api>>>>>>>`, api);

        const reponse = yield call(api);

        console.log(`reponse>>>>>>>`, reponse);

        yield put(Actions.apiExampleSuccess({data: {status: 'successed'}}));
      } catch (e) {
        yield put(Actions.apiExampleFailed({data: {status: 'successed'}}));
      }
    },
  }),
});

// Export actions for convenience when importing from other modules
export const {actions} = CallAPIExample;
export default CallAPIExample;
