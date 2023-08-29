// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /api/test/chat */
export async function sseChatDialogue(body: API.ChatRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/api/test/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/test/closeSse */
export async function closeConnect(options?: { [key: string]: any }) {
  return request<any>('/api/test/closeSse', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/test/create_sse */
export async function createSseConnect(options?: { [key: string]: any }) {
  return request<API.SseEmitter>('/api/test/create_sse', {
    method: 'GET',
    ...(options || {}),
  });
}
