import { useEffect, useRef } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { applyClass } from '@/utils/style/tailwind';

import * as S from './styles';
import * as T from './types';

/**
 * react-virtual 가상 스크롤러를 지원하는 컴포넌트로 치환
 *
 * NOTICE: 현재 1열, 2열 레이아웃만 지원하고 있습니다.
 */
const VirtualScroller = <T extends React.ElementType = 'div'>({
  as,
  columnsGap = 0,
  virtualizerOptions,
  infiniteScrollStatus,
  scrollInnerClassName,
  renderItem,
  className,
  ...rest
}: T.TExtendsVirtualScrollerComponentProps<T>) => {
  const Component = as || 'div';
  /**
   * 스크롤 컨테이너 Ref
   */
  const listRef = useRef<HTMLDivElement | null>(null);

  /**
   * 가상 스크롤러
   */
  const defaultOptions: T.TUseWindowVirtualizerParams = {
    count: 0,
    estimateSize: () => 0,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  };

  const virtualizer = useWindowVirtualizer({
    ...defaultOptions,
    ...virtualizerOptions,
  });

  /**
   * 무한 스크롤 처리
   */
  useEffect(() => {
    // INFO: 무한 스크롤 상태가 없으면 종료
    if (!infiniteScrollStatus) return;

    // INFO: 마지막 아이템 조회
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    // INFO: 마지막 아이템이 없으면 종료
    if (!lastItem) return;

    // INFO: 무한 스크롤 조건 처리
    if (
      lastItem.index >=
        infiniteScrollStatus?.itemsCount -
          infiniteScrollStatus?.fetchingTriggerIndexFromEnd &&
      infiniteScrollStatus?.hasNextPage &&
      !infiniteScrollStatus?.isFetchingNextPage
    ) {
      infiniteScrollStatus?.fetchNextPage?.();
    }
  }, [
    infiniteScrollStatus,
    infiniteScrollStatus?.hasNextPage,
    infiniteScrollStatus?.fetchingTriggerIndexFromEnd,
    infiniteScrollStatus?.isFetchingNextPage,
    infiniteScrollStatus?.fetchNextPage,
    infiniteScrollStatus?.itemsCount,
    virtualizer,
    virtualizer.getVirtualItems(),
  ]);

  return (
    <Component
      ref={listRef}
      className={applyClass(S.VIRTUAL_SCROLLER_TAILWIND_CLASS.ROOT, className)}
      {...rest}
    >
      <div
        className={applyClass(
          S.VIRTUAL_SCROLLER_TAILWIND_CLASS.SCROLL_INNER,
          scrollInnerClassName,
        )}
        style={{
          height: `${virtualizer.getTotalSize() / virtualizerOptions.lanes}px`,
        }}
      >
        {virtualizer.getVirtualItems().map((_item, index) => {
          return (
            <div
              key={_item.key}
              className={applyClass(
                S.VIRTUAL_SCROLLER_TAILWIND_CLASS.SCROLL_ITEM,
              )}
              style={{
                left: index % virtualizerOptions.lanes === 0 ? 0 : 'auto',
                right: index % virtualizerOptions.lanes === 0 ? 'auto' : 0,
                width: `calc(${100 / virtualizerOptions.lanes}% - ${columnsGap}px)`,
                height: `${_item.size}px`,
                transform: `translateY(${_item.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              {renderItem(_item.index)}
            </div>
          );
        })}
      </div>
    </Component>
  );
};

export { VirtualScroller };
