import { useRef } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { applyClass } from '@/utils/style/tailwind';

import * as S from './styles';

/**
 * useWindowVirtualizer의 파라미터 타입 추론
 */
type UseWindowVirtualizerParams = Parameters<typeof useWindowVirtualizer>[0];

/**
 * VirtualScroller의 기본 Props
 */
interface IVirtualScrollerProps<T extends React.ElementType> {
  as?: T;
  /**
   * 열 간격
   */
  columnsGap?: number;
  /**
   * 가상 스크롤러 옵션
   */
  virtualizerOptions: UseWindowVirtualizerParams;
  /**
   * 가상화 높이가 정해지는 컨테이너의 ClassName
   */
  scrollInnerClassName?: string;
  /**
   * 아이템 렌더링 함수
   */
  renderItem: (index: number) => React.ReactNode;
}
/**
 * VirtualScroller ComponentProps
 */
export type TExtendsVirtualScrollerComponentProps<T extends React.ElementType> =
  IVirtualScrollerProps<T> & React.ComponentPropsWithRef<T>;

/**
 * react-virtual 가상 스크롤러를 지원하는 컴포넌트로 치환
 *
 * NOTICE: 현재 1열, 2열 레이아웃만 지원하고 있습니다.
 */
const VirtualScroller = <T extends React.ElementType = 'div'>({
  as,
  columnsGap = 0,
  virtualizerOptions,
  scrollInnerClassName,
  renderItem,
  className,
  ...rest
}: TExtendsVirtualScrollerComponentProps<T>) => {
  const Component = as || 'div';
  /**
   * 스크롤 컨테이너 Ref
   */
  const listRef = useRef<HTMLDivElement | null>(null);

  /**
   * 가상 스크롤러
   */
  const defaultOptions: UseWindowVirtualizerParams = {
    count: 0,
    estimateSize: () => 0,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  };

  const virtualizer = useWindowVirtualizer({
    ...defaultOptions,
    ...virtualizerOptions,
  });

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
