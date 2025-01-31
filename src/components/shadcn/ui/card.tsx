import * as React from 'react';

import { cn } from '@/libs/shadcn/utils/utils';

/**
 * 공용 컴포넌트 업데이트
 *
 * 2025-01-31
 *  - ForwardRef를 제거
 */

interface ICardProps<T extends React.ElementType> {
  as?: T;
}
export type TCardProps<T extends React.ElementType = 'div'> = ICardProps<T> &
  React.ComponentProps<T>;
const Card = ({ as, className, ...props }: TCardProps) => {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        'bg-card text-card-foreground rounded-xl border shadow',
        className,
      )}
      {...props}
    />
  );
};
Card.displayName = 'Card';

interface ICardHeaderProps<T extends React.ElementType> {
  as?: T;
}
export type TCardHeaderProps<T extends React.ElementType = 'div'> =
  ICardHeaderProps<T> & React.ComponentProps<T>;
const CardHeader = ({ as, className, ...props }: TCardHeaderProps) => {
  const Component = as || 'div';

  return (
    <Component
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
};
CardHeader.displayName = 'CardHeader';

interface ICardTitleProps<T extends React.ElementType> {
  as?: T;
}
export type TCardTitleProps<T extends React.ElementType = 'div'> =
  ICardTitleProps<T> & React.ComponentProps<T>;
const CardTitle = ({ as, className, ...props }: TCardTitleProps) => {
  const Component = as || 'div';

  return (
    <Component
      className={cn('leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  );
};
CardTitle.displayName = 'CardTitle';

interface ICardDescriptionProps<T extends React.ElementType> {
  as?: T;
}
export type TCardDescriptionProps<T extends React.ElementType = 'div'> =
  ICardDescriptionProps<T> & React.ComponentProps<T>;
const CardDescription = ({
  as,
  className,
  ...props
}: TCardDescriptionProps) => {
  const Component = as || 'div';

  return (
    <Component
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
};
CardDescription.displayName = 'CardDescription';

interface ICardContentProps<T extends React.ElementType> {
  as?: T;
}
export type TCardContentProps<T extends React.ElementType = 'div'> =
  ICardContentProps<T> & React.ComponentProps<T>;
const CardContent = ({ as, className, ...props }: TCardContentProps) => {
  const Component = as || 'div';

  return <Component className={cn('p-6 pt-0', className)} {...props} />;
};
CardContent.displayName = 'CardContent';

interface ICardFooterProps<T extends React.ElementType> {
  as?: T;
}
export type TCardFooterProps<T extends React.ElementType = 'div'> =
  ICardFooterProps<T> & React.ComponentProps<T>;
const CardFooter = ({ as, className, ...props }: TCardFooterProps) => {
  const Component = as || 'div';

  return (
    <Component
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
};
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
