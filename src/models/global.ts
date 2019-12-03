import {Reducer} from 'redux';
import {Effect} from './connect.d';
import {appList} from '@/services/product';

export interface GlobalModelState {
  appListData : any[];
}

export interface GlobalModelType {
  namespace : 'global';
  state : GlobalModelState;
  effects : {
    appList: Effect;
  };
  reducers : {
    saveAppList: Reducer < {} >
  };
}

const GlobalModel : GlobalModelType = {
  namespace: 'global',
  state: {
    appListData: [],
  },

  effects: {
    *appList({
      payload
    }, {put, call}) {
      const response = yield call(appList, payload);
      if (response) {
        yield put({type: 'saveAppList', payload: response});
      }
    }
  },

  reducers: {
    saveAppList(state, {payload}) {
      return {
        ...state,
        appListData: payload.data.list
      };
    }
  }
};

export default GlobalModel;
