// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/msg/save */
export async function saveUserMessage(body: API.ChatRequest, options?: { [key: string]: any }) {
  return request<any>('/api/msg/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/msg/selMsg */
export async function selectMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.selectMessageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListMessageVO>('/api/msg/selMsg', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/msg/selSes */
export async function selectSession(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.selectSessionParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSessionVO>('/api/msg/selSes', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/msg/updateSes */
export async function updateSession(body: API.SessionRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/api/msg/updateSes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
