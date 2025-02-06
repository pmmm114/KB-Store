import { HttpResponse } from 'msw';

import { createMswHandler, sleep } from '@/libs/msw/msw';
import { generateRandomArray } from '@/utils/core/array';
import { getRandomImageUrl } from '@/utils/api/image';

import type { DefaultBodyType } from 'msw';
import * as ServiceTypes from '@/api/service/types';

/**
 * 탑배너 정보 가져오기
 */
const getTopBanner = createMswHandler({
  method: 'GET',
  path: '/api/top-banner',
  handlerFunction: async ({ request }) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const searchParamsPage = searchParams.get('page');
    const _pageNumber = Number(searchParamsPage) || null;

    if (_pageNumber === null || _pageNumber < 1) {
      return HttpResponse.json({
        list: [],
        nextCursor: '',
      });
    }
    const _hasNext = _pageNumber > 5 ? false : true;

    const list = generateRandomArray<
      ServiceTypes.ExtractArrayType<ServiceTypes.TGetScrollListResponse['list']>
    >({
      maxLength: 10,
      minLength: _hasNext ? 10 : 1,
      generator: (i) => {
        const _index = (_pageNumber - 1) * 10 + i;
        return {
          id: _index,
          title: `Top NFT Title - ${_index}`,
          category: ['ART', 'GAME'][
            Math.floor(Math.random() * 2)
          ] as ServiceTypes.TGetScrollListResponse['list'][number]['category'],
          imageUrl: getRandomImageUrl({
            width: 180,
            height: 180,
            extension: 'webp',
            isRandom: true,
          }),
          description: `Top NFT Description - ${_index}`,
          footer: `Top NFT Footer - ${_index}`,
        };
      },
    });

    await sleep(10000);
    // INFO: 페이지 넘버가 5 이상이면 더 이상 데이터가 없음
    return HttpResponse.json({
      list,
      nextCursor: `?page=${_pageNumber + 1}`,
      hasNext: _hasNext,
    });
  },
});

/**
 * 스크롤 배너 정보 가져오기
 */
const getScrollList = createMswHandler<
  DefaultBodyType,
  ServiceTypes.TGetScrollListResponse
>({
  method: 'GET',
  path: '/api/scroll-list',
  handlerFunction: ({ request }) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const searchParamsPage = searchParams.get('page');
    const searchParamsCategory = searchParams.get('category');
    const _pageNumber = Number(searchParamsPage) || null;
    const _category = searchParamsCategory || null;

    if (_pageNumber === null || _pageNumber < 1 || _category === null) {
      return HttpResponse.json({
        list: [],
        nextCursor: '',
        hasNext: false,
      });
    }
    const _hasNext = _pageNumber > 5 ? false : true;

    const list = generateRandomArray<
      ServiceTypes.ExtractArrayType<ServiceTypes.TGetScrollListResponse['list']>
    >({
      maxLength: 10,
      minLength: _hasNext ? 10 : 1,
      generator: (i) => {
        const _index = (_pageNumber - 1) * 10 + i;
        return {
          id: _index,
          title: `${_category} NFT Title - ${_index}`,
          category:
            _category === 'ALL'
              ? (['ART', 'GAME'][
                  Math.floor(Math.random() * 2)
                ] as ServiceTypes.TGetScrollListResponse['list'][number]['category'])
              : _category,
          imageUrl: getRandomImageUrl({
            width: 334,
            height: 334,
            extension: 'webp',
            isRandom: true,
          }),
          description: `${_category} NFT Description - ${_index}`,
          footer: `${_category} NFT Footer - ${_index}`,
        };
      },
    });

    // INFO: 페이지 넘버가 5 이상이면 더 이상 데이터가 없음
    return HttpResponse.json({
      list,
      nextCursor: `?page=${_pageNumber + 1}&category=${_category}`,
      hasNext: _hasNext,
    });
  },
});

/**
 * MSW 공통으로 들어갈 handler를 설정합니다
 */
function handlers() {
  return [getTopBanner, getScrollList];
}

export { handlers };
