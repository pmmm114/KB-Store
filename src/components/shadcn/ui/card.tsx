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
export type TExtendsCardProps<T extends React.ElementType> = ICardProps<T> &
  React.ComponentPropsWithRef<T>;
const Card = <T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: TExtendsCardProps<T>) => {
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
export type TExtendsCardHeaderProps<T extends React.ElementType> =
  ICardHeaderProps<T> & React.ComponentPropsWithRef<T>;
const CardHeader = <T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: TExtendsCardHeaderProps<T>) => {
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
export type TExtendsCardTitleProps<T extends React.ElementType> =
  ICardTitleProps<T> & React.ComponentPropsWithRef<T>;
const CardTitle = <T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: TExtendsCardTitleProps<T>) => {
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
export type TExtendsCardDescriptionProps<T extends React.ElementType> =
  ICardDescriptionProps<T> & React.ComponentPropsWithRef<T>;
const CardDescription = <T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: TExtendsCardDescriptionProps<T>) => {
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
export type TExtendsCardContentProps<T extends React.ElementType> =
  ICardContentProps<T> & React.ComponentPropsWithRef<T>;
const CardContent = <T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: TExtendsCardContentProps<T>) => {
  const Component = as || 'div';

  return <Component className={cn('p-6 pt-0', className)} {...props} />;
};
CardContent.displayName = 'CardContent';

interface ICardFooterProps<T extends React.ElementType> {
  as?: T;
}
export type TExtendsCardFooterProps<T extends React.ElementType> =
  ICardFooterProps<T> & React.ComponentPropsWithRef<T>;
const CardFooter = <T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: TExtendsCardFooterProps<T>) => {
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
