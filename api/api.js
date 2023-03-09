import request from '../utils/request';

/**
 * 获取文章详情
 */
export function uploadImage(data) {
  return request({
    url: '/class/upload/image',
	method: 'post',
    data
  });
}

export function createClass(data) {
  return request({
    url: '/class/create',
	method: 'post',
    data
  });
}

export function createTask(data) {
  return request({
    url: '/class/task/create',
	method: 'post',
    data
  });
}

export function getMyClasses(data) {
  return request({
    url: '/class/my/class',
    data
  });
}

export function getClassOne(data) {
  return request({
    url: '/class/one/'+data.id,
    data
  });
}

export function metchToken(data) {
  return request({
    url: '/class/metch/token',
	method: 'post',
    data
  });
}

export function getAllUsers(data) {
  return request({
    url: '/class/users/all/' + data.id,
    data
  });
}

export function getTaskTypes(data) {
  return request({
    url: '/class/task/types',
    data
  });
}

export function myTask(data) {
  return request({
    url: '/class/my/tasks/'+data.day+"/"+data.num+"/"+data.classId,
    data
  });
}

export function updateUserInfo(data){
	return request({
	  url: '/class/user/update',
	  method: 'post',
	  data
	});
}

export function releaseClass(data){
	return request({
	  url: '/class/release/'+data.id,
	  method: 'delete',
	  data
	});
}

export function exitClass(data){
	return request({
	  url: '/class/exit/'+data.id,
	  method: 'post',
	  data
	});
}

export function taskDesc(data){
	return request({
	  url: '/class/task/desc/'+data.id,
	  data
	});
}

export function taskReport(data){
	return request({
	  url: '/class/task/report',
	  method: 'post',
	  data
	});
}

export function updateStatus(data){
	return request({
	  url: '/class/task/status/'+data.taskId+'/'+data.status,
	  method: 'post',
	  data
	});
}

export function finishTask(data){
	return request({
	  url: '/class/task/finish/'+data.taskId,
	  data
	});
}