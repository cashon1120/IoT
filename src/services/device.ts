import request from '@/utils/request';
import {API_URL} from '../../public/config'

export async function deviceAll(params: object): Promise<any> {
  return request(API_URL + '/device/deviceAll', {
    method: 'POST',
    data: params,
  });
}

export async function registerDeviceList(params: object): Promise<any> {
  return request(API_URL + '/device/registerDeviceList', {
    method: 'POST',
    data: params,
  });
}


export async function saveDevice(params: object): Promise<any> {
  return request(API_URL + '/device/saveDevice', {
    method: 'POST',
    data: params,
  });
}

// 车辆
export async function delDevice(params: object): Promise<any> {
  return request(API_URL + '/device/delDevice', {
    method: 'POST',
    data: params,
  });
}

