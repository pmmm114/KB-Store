import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
} from '@/components/molecules/Card';
import { applyClass } from '@/utils/style/tailwind';

import * as S from './ImageCard.styles';

/**
 * 이미지 카드 컴포넌트
 */
export type TImageCardProps<T extends React.ElementType> = React.ComponentProps<
  typeof Card<T>
>;
const ImageCard = <T extends React.ElementType = 'div'>({
  as = 'div',
  className,
  ...rest
}: TImageCardProps<T>) => {
  return (
    <Card
      as={as}
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.ROOT, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 제목 컴포넌트
 */
export type TImageCardTitleProps<T extends React.ElementType> =
  React.ComponentProps<typeof CardTitle<T>>;
const ImageCardTitle = <T extends React.ElementType = 'div'>({
  as = 'div',
  className,
  ...rest
}: TImageCardTitleProps<T>) => {
  return (
    <CardTitle
      as={as}
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.TITLE, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 컨텐츠 컴포넌트
 */
export type TImageCardContentProps<T extends React.ElementType> =
  React.ComponentProps<typeof CardContent<T>>;
const ImageCardContent = <T extends React.ElementType = 'div'>({
  as = 'div',
  className,
  ...rest
}: TImageCardContentProps<T>) => {
  return (
    <CardContent
      as={as}
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.CONTENT, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 헤더 컴포넌트
 */
export type TImageCardHeaderProps<T extends React.ElementType> =
  React.ComponentProps<typeof CardHeader<T>>;
const ImageCardHeader = <T extends React.ElementType = 'div'>({
  as = 'div',
  className,
  ...rest
}: TImageCardHeaderProps<T>) => {
  return (
    <CardHeader
      as={as}
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.HEADER, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 푸터 컴포넌트
 */
export type TImageCardFooterProps<T extends React.ElementType> =
  React.ComponentProps<typeof CardFooter<T>>;
const ImageCardFooter = <T extends React.ElementType = 'div'>({
  as = 'div',
  className,
  ...rest
}: TImageCardFooterProps<T>) => {
  return (
    <CardFooter
      as={as}
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.FOOTER, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 설명 컴포넌트
 */
export type TImageCardDescriptionProps<T extends React.ElementType> =
  React.ComponentProps<typeof CardDescription<T>>;
const ImageCardDescription = <T extends React.ElementType = 'div'>({
  as = 'div',
  className,
  ...rest
}: TImageCardDescriptionProps<T>) => {
  return (
    <CardDescription
      as={as}
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.DESCRIPTION, className)}
      {...rest}
    />
  );
};

export {
  ImageCard,
  ImageCardTitle,
  ImageCardContent,
  ImageCardHeader,
  ImageCardFooter,
  ImageCardDescription,
};
