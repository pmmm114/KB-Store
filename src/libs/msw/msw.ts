import { type DefaultBodyType, http } from 'msw';

import * as T from './type';


export async function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

/**
 * MSW 경로 패턴으로 변환합니다.
 * - `{param}` → `:param`
 * - `${param}` → `:param`
 * - 와일드카드(*) 자동 추가
 */
export const normalizeMswPath = (path: string): string => {
    const PARAM_PATTERN = /\$?{(.*?)}/g;
    const WILDCARD = '*';
    
    return `${WILDCARD}${path.replace(PARAM_PATTERN, ':$1')}`;
  };

/**
 * MSW http request method
 */
export const MSW_HTTP_METHOD = {
  GET: http.get,
  POST: http.post,
  PUT: http.put,
  DELETE: http.delete,
  PATCH: http.patch,
} as const satisfies T.MSW_HTTP_METHOD;

/**
 *
 * @param - {@link ICreateHandlerParams}
 *
 * @returns msw handler를 반환
 */
export const createMswHandler = <Req extends DefaultBodyType, Res extends DefaultBodyType>({
  method,
  path,
  handlerFunction,
}: T.ICreateHandlerParams<Req, Res>) => {
  const httpMethod = MSW_HTTP_METHOD[method];
  
  if (!httpMethod) {
    throw new Error(`[MSW] Invalid method: ${method}`);
  }

  return httpMethod(normalizeMswPath(path), handlerFunction);
};