import { useInfiniteQuery } from '@tanstack/react-query';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

/**
 * useWindowVirtualizer의 파라미터 타입 추론
 */
export type TUseWindowVirtualizerParams = Parameters<
  typeof useWindowVirtualizer
>[0];

/**
 * 무한 스크롤 상태
 */
export type TInfiniteScrollStatus = Partial<
  ReturnType<typeof useInfiniteQuery>
> & {
  /**
   * 로딩 플레이스홀더 개수
   */
  loadingPlaceholderCount?: number;
  /**
   * 호출한 데이터 리스의 길이
   */
  itemsCount?: number;
};
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
  virtualizerOptions: TUseWindowVirtualizerParams;
  /**
   * 가상화 높이가 정해지는 컨테이너의 ClassName
   */
  scrollInnerClassName?: string;
  /**
   * 아이템 렌더링 함수
   */
  renderItem: (index: number) => React.ReactNode;
  /**
   * 무한 스크롤 상태
   */
  infiniteScrollStatus?: TInfiniteScrollStatus;
}
/**
 * VirtualScroller ComponentProps
 */
export type TExtendsVirtualScrollerComponentProps<
  T extends React.ElementType = 'div',
> = IVirtualScrollerProps<T> & React.ComponentPropsWithRef<T>;
