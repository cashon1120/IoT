import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { LoginModelState } from './login';
import { ProductModelState } from './product';
import { SystemModelState } from './system';
import { DeviceModelState } from './device';

export {
  GlobalModelState,
  SettingModelState,
  UserModelState,
  LoginModelState,
  ProductModelState,
  SystemModelState,
  DeviceModelState,
};

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    user?: boolean;
    login?: boolean;
    device?: boolean;
    system?: boolean
    product?: boolean
  };
}

export interface ConnectState {
  global: GlobalModelState;
  user: UserModelState;
  loading: Loading;
  settings: SettingModelState;
  device: DeviceModelState;
  system: SystemModelState
  product: ProductModelState
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: ConnectState) => T) => T },
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch;
}
