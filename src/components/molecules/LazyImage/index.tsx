import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Skeleton } from '@/components/shadcn/ui/skeleton';
import { cn } from '@/libs/shadcn/utils/utils';

export type TLazyImageProps<T extends React.ElementType> =
  React.ComponentProps<T>;

const intersectionObserverOptions = {
  triggerOnce: true,
  threshold: 0.1,
};
const LazyImage = <T extends React.ElementType = 'img'>({
  src,
  className,
  ...rest
}: TLazyImageProps<T>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView(intersectionObserverOptions);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  if (!src) return <Skeleton className={cn('h-full w-full', className)} />;

  return (
    <div ref={ref} className="h-full w-full">
      {isLoaded === false && (
        <Skeleton className={cn('h-full w-full', className)} />
      )}
      {inView === true && (
        <img
          className={cn(
            'h-full w-full object-cover',
            isLoaded ? 'block' : 'hidden',
            className,
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
