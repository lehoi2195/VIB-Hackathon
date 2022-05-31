import { createModule } from 'saga-slice';
import { put, select, takeLatest, call, debounce } from 'redux-saga/effects';
const LoadingReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'Loading',
  initialState: {
    loading: false,
  },
  reducers: {
    StartLoading: state => {
      state.loading = true;
    },
    StopLoading: state => {
      state.loading = false;
    },
  },
});

const GeneralModalReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'GeneralModal',
  initialState: {
    generalType: {
      type: 'WARNING',
      action: false,
      isOpen: false,
      backdropClose: false,
      title: '',
      message: '',
    },
  },
  reducers: {
    GeneralModalOpen: (state, payload) => {
      state.generalType = payload;
      console.log('payload===>', payload)
    },
    GeneralModalClose: state => {
      state.generalType = {
        action: false,
        isOpen: false,
      };
    },
  },
});

const PaymentModalReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'PaymentModal',
  initialState: {
    open: false,
  },
  reducers: {
    PaymentModalOpen: (state, payload) => {
      state.open = true;
    },
    PaymentModalClose: state => {
      state.open = false;
    },
  },
});

const VoiceModalReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'VoiceModal',
  initialState: {
    open: false,
    voiceText: null,
  },
  reducers: {
    VoiceModalOpen: (state, payload) => {
      state.open = true;
    },
    VoiceModalAddText: (state, payload) => {
      state.voiceText = payload;
    },
    VoiceModalClose: state => {
      state.open = false;
    },
  },
});

const PopupModalReducer = createModule({
  // Key name that gets added to combineReducers
  name: 'PopupModal',
  initialState: {
    popupType: {
      type: 'WARNING',
      action: false,
      isOpen: false,
      backdropClose: false,
      title: '',
      message: '',
    },
  },
  reducers: {
    PopupModalOpen: (state, payload) => {
      console.log('payload===>', payload)
      state.popupType = payload;
    },
    PopupModalClose: state => {
      state.popupType = {
        action: false,
        isOpen: false,
      };
    },
  },
});

// Export actions for convenience when importing from other modules
export const { StartLoading, StopLoading } = LoadingReducer.actions;
export const { GeneralModalOpen, GeneralModalClose } =
  GeneralModalReducer.actions;
export const { PaymentModalOpen, PaymentModalClose } =
  PaymentModalReducer.actions;
export const { VoiceModalOpen, VoiceModalClose, VoiceModalAddText } =
  VoiceModalReducer.actions;
export const { PopupModalOpen, PopupModalClose } =
  PopupModalReducer.actions;
export {
  LoadingReducer,
  GeneralModalReducer,
  PaymentModalReducer,
  VoiceModalReducer,
  PopupModalReducer,
};
