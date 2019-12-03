import {Reducer} from 'redux';
import {Effect} from 'dva';
import {
  deviceAll,
  saveDevice,
  registerDeviceList,
  delDevice
} from '@/services/device';

export interface DeviceModelState {
  deviceData : any;
  registerDevice : any;
}

export interface ModelType {
  namespace : string;
  state : DeviceModelState;
  effects : {
    deviceAll: Effect;
    saveDevice: Effect;
    registerDeviceList: Effect;
    delDevice: Effect;
  };
  reducers : {
    saveAllDevice: Reducer < {} >;
    saveRegisterDevice: Reducer < {} >;
  };
}

const LoginModel : ModelType = {
  namespace: 'device',

  state: {
    deviceData: [],
    registerDevice: [],
  },

  effects: {
    *deviceAll({
      payload,
      callback
    }, {put, call}) {
      const response = yield call(deviceAll, payload);
      if (response) {
        yield put({type: 'saveAllDevice', payload: response});
      }
      if(callback){
        callback(response)
      }
    },
    *saveDevice({
      payload,
      callback
    }, {call}) {
      const response = yield call(saveDevice, payload);
      if (callback) {
        callback(response);
      }
    },
    
    *registerDeviceList({
      payload
    }, {put, call}) {
      const response = yield call(registerDeviceList, payload);
      if (response) {
        yield put({type: 'saveRegisterDevice', payload: response});
      }
    },
    
    *delDevice({
      payload,
      callback
    }, {call}) {
      const response = yield call(delDevice, payload);
      if (callback) {
        callback(response);
      }
    },
  },

  reducers: {
    saveAllDevice(state, {payload}) {
      return {
        ...state,
        deviceData: payload.data
      };
    },
    saveRegisterDevice(state, {payload}) {
      return {
        ...state,
        registerDevice: payload.data
      };
    }
  }
};

export default LoginModel;
