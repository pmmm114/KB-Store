import { HttpClient, RequestParams } from '@/api/client/http-client';

import * as DTO from '@/api/dto/dto';

export class DemoController<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }
  getTopBanner = (query: DTO.IGetTopBannerReq, params: RequestParams = {}) =>
    this.http.request<DTO.IGetTopBannerRes>({
      path: `/api/top-banner`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });

  getScrollList = (query: DTO.IGetScrollListReq, params: RequestParams = {}) =>
    this.http.request<DTO.IGetScrollListRes>({
      path: `/api/scroll-list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
}
