import {
  Card as ShadcnCard,
  CardTitle as ShadcnCardTitle,
  CardContent as ShadcnCardContent,
} from '@/components/shadcn/ui/card';
import { applyClass } from '@/utils/style/tailwind';

import * as S from './ItemCard.styles';

type TCardContentProps = React.ComponentProps<typeof ShadcnCardContent>;
const CardContent = ({ className, ...rest }: TCardContentProps) => {
  return (
    <ShadcnCardContent
      className={applyClass(S.CARD_TAILWIND_CLASS.CONTENT, className)}
      {...rest}
    />
  );
};

type TCardTitleProps = React.ComponentProps<typeof ShadcnCardTitle>;
const CardTitle = ({ className, ...rest }: TCardTitleProps) => {
  return (
    <ShadcnCardTitle
      className={applyClass(S.CARD_TAILWIND_CLASS.TITLE, className)}
      {...rest}
    />
  );
};

type TCardProps = React.ComponentProps<typeof ShadcnCard>;
const Card = ({ className, ...rest }: TCardProps) => {
  return (
    <ShadcnCard
      className={applyClass(S.CARD_TAILWIND_CLASS.CARD, className)}
      {...rest}
    />
  );
};

export {
  CardHeader as ItemCardHeader,
  CardFooter as ItemCardFooter,
  CardDescription as ItemCardDescription,
} from '@/components/shadcn/ui/card';
export {
  CardTitle as ItemCardTitle,
  Card as ItemCard,
  CardContent as ItemCardContent,
};
