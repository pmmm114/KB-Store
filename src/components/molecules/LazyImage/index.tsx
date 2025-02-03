import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { applyClass } from '@/utils/style/tailwind';

import { Skeleton } from '@/components/shadcn/ui/skeleton';

import { cn } from '@/libs/shadcn/utils/utils';

import * as S from './styles';

/**
 * LazyImage의 기본 Props
 */
interface ILazyImageProps {
  rootClassName?: string;
}
/**
 * LazyImage ComponentProps
 */
type TLazyImageComponentProps<T extends React.ElementType> = ILazyImageProps &
  React.ComponentPropsWithRef<T>;
/**
 * LazyImage에서 사용할 Props
 *  - children을 포함한 Props
 */
type TLazyImagePropsWithChildren<T extends React.ElementType> =
  React.PropsWithChildren<TLazyImageComponentProps<T>>;

const intersectionObserverOptions = {
  triggerOnce: true,
  threshold: 0.1,
};
const LazyImage = <T extends React.ElementType = 'img'>({
  src,
  rootClassName,
  className,
  ...rest
}: TLazyImagePropsWithChildren<T>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView(intersectionObserverOptions);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  if (!src)
    return (
      <Skeleton className={applyClass(S.LAZY_IMAGE_TAILWIND_CLASS.SKELETON)} />
    );

  return (
    <div
      ref={ref}
      className={applyClass(S.LAZY_IMAGE_TAILWIND_CLASS.ROOT, rootClassName)}
    >
      {isLoaded === false && (
        <Skeleton
          className={applyClass(S.LAZY_IMAGE_TAILWIND_CLASS.SKELETON)}
        />
      )}
      {inView === true && (
        <img
          className={applyClass(
            S.LAZY_IMAGE_TAILWIND_CLASS.IMAGE,
            cn(isLoaded ? 'block' : 'hidden', className),
          )}
          src={src}
          onLoad={() => setIsLoaded(true)}
          {...rest}
        />
      )}
    </div>
  );
};

export { LazyImage };
