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
interface IImageCardProps extends React.ComponentProps<typeof Card> {}
const ImageCard = ({ className, ...rest }: IImageCardProps) => {
  return (
    <Card
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.ROOT, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 제목 컴포넌트
 */
interface IImageCardTitleProps extends React.ComponentProps<typeof CardTitle> {}
const ImageCardTitle = ({ className, ...rest }: IImageCardTitleProps) => {
  return (
    <CardTitle
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.TITLE, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 컨텐츠 컴포넌트
 */
interface IImageCardContentProps
  extends React.ComponentProps<typeof CardContent> {}
const ImageCardContent = ({ className, ...rest }: IImageCardContentProps) => {
  return (
    <CardContent
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.CONTENT, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 헤더 컴포넌트
 */
interface IImageCardHeaderProps
  extends React.ComponentProps<typeof CardHeader> {}
const ImageCardHeader = ({ className, ...rest }: IImageCardHeaderProps) => {
  return (
    <CardHeader
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.HEADER, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 푸터 컴포넌트
 */
interface IImageCardFooterProps
  extends React.ComponentProps<typeof CardFooter> {}
const ImageCardFooter = ({ className, ...rest }: IImageCardFooterProps) => {
  return (
    <CardFooter
      className={applyClass(S.IMAGE_CARD_TAILWIND_CLASS.FOOTER, className)}
      {...rest}
    />
  );
};

/**
 * 이미지 카드 설명 컴포넌트
 */
interface IImageCardDescriptionProps
  extends React.ComponentProps<typeof CardDescription> {}
const ImageCardDescription = ({
  className,
  ...rest
}: IImageCardDescriptionProps) => {
  return (
    <CardDescription
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
