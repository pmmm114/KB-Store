import type { DefaultBodyType, HttpRequestHandler, HttpResponseResolver, PathParams } from 'msw';

import { MSW_HTTP_METHOD } from './msw';

export type MSW_HTTP_METHOD = Record<string, HttpRequestHandler>;

/**
 * createHandler 함수 파라미터
 */
export interface ICreateHandlerParams<Req extends DefaultBodyType = DefaultBodyType, Res extends DefaultBodyType = DefaultBodyType> {
  method: keyof typeof MSW_HTTP_METHOD;
  path: string;
  handlerFunction: HttpResponseResolver<PathParams, Req, Res>;
}
