import request from '../utils/request';

/**
 * 用户登录
 */
export function login(data) {
  return request({
    url: '/class/sys/login',
    method: 'POST',
    data
  });
}

export function login1(data) {
  return request({
    url: '/sys/login1',
    method: 'POST',
    data
  });
}
