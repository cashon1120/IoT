import request from '@/utils/request';
import {API_URL} from '../../public/config'

export async function saveApp(params: object): Promise<any> {
  return request(API_URL + '/app/saveApp', {
    method: 'POST',
    data: params,
  });
}

export async function appList(params: object): Promise<any> {
  return request(API_URL + '/app/appList', {
    method: 'POST',
    data: params,
  });
}

export async function delApp(params: object): Promise<any> {
  return request(API_URL + '/app/delApp', {
    method: 'POST',
    data: params,
  });
}




