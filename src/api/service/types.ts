import type { AxiosResponse } from 'axios';

import { CLIENT_API } from '.';

/**
 * INFO: 타입 추출을 위한 유틸리티 타입 정의
 */
export type ExtractResponseType<T> =
  T extends Promise<AxiosResponse<infer R, unknown>> ? R : never;

/**
 * INFO: 배열 타입 추출을 위한 유틸리티 타입 정의
 */
export type ExtractArrayType<T> = T extends Array<infer R> ? R : never;

export type TGetTopBanner = typeof CLIENT_API.DemoControllerApi.getTopBanner;
export type TGetScrollList = typeof CLIENT_API.DemoControllerApi.getScrollList;

export type TGetTopBannerParams = Parameters<TGetTopBanner>[0];
export type TGetScrollListParams = Parameters<TGetScrollList>[0];

export type TGetTopBannerResponse = ExtractResponseType<
  ReturnType<TGetTopBanner>
>;
export type TGetScrollListResponse = ExtractResponseType<
  ReturnType<TGetScrollList>
>;
