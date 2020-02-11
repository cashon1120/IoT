import request from '@/utils/request';
import { API_URL} from '../../public/config'

export async function fetchPartment(params: object): Promise<any> {
  return request(API_URL + '/department/departmentList', {
    method: 'POST',
    data: params,
  });
}

export async function addPartment(params: object): Promise<any> {
  return request(API_URL + '/department/saveDepartment', {
    method: 'POST',
    data: params,
  });
}


export async function delPartment(params: object): Promise<any> {
  return request(API_URL + '/department/delDepartment', {
    method: 'POST',
    data: params,
  });
}

export async function updatePartment(params: object): Promise<{}> {
  return request(API_URL + '/department/editDepartment', {
    method: 'POST',
    data: params,
  });
}
// 角色
export async function fetchRole(params: object): Promise<any> {
  return request(API_URL + '/role/roleList', {
    method: 'POST',
    data: params,
  });
}

export async function addRole(params: object): Promise<any> {
  return request(API_URL + '/role/saveRole', {
    method: 'POST',
    data: params,
  });
}


export async function delRole(params: object): Promise<any> {
  return request(API_URL + '/role/delRole', {
    method: 'POST',
    data: params,
  });
}

export async function updateRole(params: object): Promise<{}> {
  return request(API_URL + '/role/editRole', {
    method: 'POST',
    data: params,
  });
}

// 用户
export async function fetchUser(params: object): Promise<any> {
  return request(API_URL + '/sysUser/userList', {
    method: 'POST',
    data: params,
  });
}

export async function addUser(params: object): Promise<any> {
  return request(API_URL + '/sysUser/save', {
    method: 'POST',
    data: params,
  });
}

export async function updateUser(params: object): Promise<any> {
  return request(API_URL + '/sysUser/editUserInfo', {
    method: 'POST',
    data: params,
  });
}

export async function disableUser(params: object): Promise<any> {
  return request(API_URL + '/userManager/disableActivation', {
    method: 'POST',
    data: params,
  });
}

export async function resetUserPwd(params: object): Promise<any> {
  return request(API_URL + '/userManager/resetPassword', {
    method: 'POST',
    data: params,
  });
}

