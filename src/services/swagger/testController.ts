// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /dit/abc */
export async function abc(options?: { [key: string]: any }) {
  return request<string>('/dit/abc', {
    method: 'POST',
    ...(options || {}),
  });
}
