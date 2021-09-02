import { get, post } from './http';

// 登陆
const login = function (data) {
  return post('/login', data);
}
const register = function (data) {
  return post('/register', data);
}
// 获取所有项目
const allProjects = function () {
  return get('/allProjects')
}


export default {
  register,
  login,
  allProjects
}