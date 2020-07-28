import request from '../utils/request'
import { LoginForm, Passwords, UserData } from '@/interface'

export function login(params: LoginForm) {
  return request({
    url: '/login',
    method: 'post',
    data: params,
  })
}

export function getUserList() {
  return request({
    url: '/user',
    method: 'get',
  })
}

export function getUserById(id: number) {
  return request({
    url: '/user/' + id,
    method: 'get',
  })
}

export function updateUser(id: number, params: UserData) {
  return request({
    url: '/user/' + id,
    method: 'put',
    data: params,
  })
}

export function updatePassword(id: string, params: Passwords) {
  return request({
    url: '/login/' + id,
    method: 'put',
    data: params,
  })
}
