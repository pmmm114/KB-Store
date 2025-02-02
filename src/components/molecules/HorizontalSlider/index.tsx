import { applyClass } from '@/utils/style/tailwind';

import * as S from './styles';

interface IHorizontalSliderProps<T extends React.ElementType> {
  as?: T;
}
export type THorizontalSliderProps<T extends React.ElementType> =
  IHorizontalSliderProps<T> & React.ComponentProps<T>;

/**
 * 가로 슬라이더
 *
 * - 시스템 스크롤을 사용
 * - 스크롤 바를 제거
 */
const HorizontalSlider = <T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: THorizontalSliderProps<T>) => {
  const Component = as || 'div';

  return (
    <Component
      className={applyClass(S.HORIZONTAL_SLIDER_TAILWIND_CLASS.ROOT, className)}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default HorizontalSlider;
