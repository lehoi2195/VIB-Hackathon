import {put, select, takeLatest} from 'redux-saga/effects';
import {createModule} from 'saga-slice';

const sagaSlice = createModule({
  // Key name that gets added to combineReducers
  name: 'todos',
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
    fetch: state => {
      state.isFetching = true;
    },
    fetchSuccess: (state, payload) => {
      state.isFetching = false;
      state.data = payload;
    },
    fetchFail: (state, payload) => {
      state.isFetching = false;
      state.error = payload;
    },
  },

  // The sagas option is a function that gets passed the Actions object.
  // Actions are converted into strings which are the value of its
  // corresponding type. You can also use the actions object to dispatch
  // actions from sagas using the `put` effect.
  sagas: A => ({
    *[A.fetch]({payload}) {
      try {
        console.log(`payload`, payload);
        // const { data } = yield.axios.get('/todos');
        yield put(A.fetchSuccess({data: {status: 'successed'}}));
      } catch (e) {
        yield put(A.fetchFail({data: {status: 'successed'}}));
      }
    },
  }),
});

// Export actions for convenience when importing from other modules
export const {actions} = sagaSlice;
export default sagaSlice;
