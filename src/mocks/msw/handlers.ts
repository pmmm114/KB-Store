import { HttpResponse } from 'msw';

import { createMswHandler } from '@/libs/msw/msw';
import { generateRandomArray } from '@/utils/core/array';
import { getRandomImageUrl } from '@/utils/\bapi/image';


/**
 * 탑배너 정보 가져오기
 */
const getTopBanner = createMswHandler({
  method: 'GET',
  path: '/api/top-banner',
  handlerFunction: ({ request }) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const searchParamsPage = searchParams.get('page');
    const _pageNumber = Number(searchParamsPage) || null;

    if(_pageNumber === null || _pageNumber < 1) {
      return HttpResponse.json({
        list: [],
        nextCursor: '',
      });
    }

    const list = generateRandomArray({
      maxLength: 10,
      minLength: 1,
      generator: (i) => {
        const _index = (_pageNumber - 1) * 10 + i;
        return {
          id: _index,
          title: `title ${_index}`,
          image: getRandomImageUrl({
            width: 200,
            height: 200,
            extension: 'webp',
            isRandom: true,
          }),
          description: `description ${_index}`,
        };
      },
    });

    return HttpResponse.json({
      list,
      nextCursor: `?page=${_pageNumber + 1}`,
    });
  },
});

/**
 * 스크롤 배너 정보 가져오기
 */
const getScrollList = createMswHandler({
  method: 'GET',
  path: '/api/scroll-list',
  handlerFunction: () => {
    return HttpResponse.json();
  },
});

/**
 * MSW 공통으로 들어갈 handler를 설정합니다
 */
function handlers() { return [getTopBanner, getScrollList] }


export { handlers };
