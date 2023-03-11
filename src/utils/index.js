//统一封装工具函数

//导入工具函数（子模块）
import { http } from './http'
import {
  setToken,
  getToken,
  removeToken
} from './token'

//统一导出（统一管理）
export {  
  http,
  setToken,
  getToken,
  removeToken
 }

//使用：import {http} from '@/utils'