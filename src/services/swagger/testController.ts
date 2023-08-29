// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /dialogue/chat */
export async function chat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatParams,
  options?: { [key: string]: any },
) {
  return request<API.SseEmitter>('/dialogue/chat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
