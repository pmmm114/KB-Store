'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { ScrollableFanCard } from '../../../features/cardSelection/ui/ScrollableFanCard/ScrollableFanCard';
import { CompleteButton } from '../../../features/cardSelection/ui/CompleteButton/CompleteButton';

import {
  CARD_SELECT_LIMIT,
  CARDS,
} from '../../../features/cardSelection/model/const';

import * as T from './CardSelectionSection.types';

export const CardSelectionSection = ({
  onComplete,
}: T.ICardSelectionSectionProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const router = useRouter();

  const handleComplete = useCallback(
    async (_e: React.MouseEvent<HTMLButtonElement>) => {
      if (selectedIds.length !== CARD_SELECT_LIMIT) return;

      await onComplete?.(selectedIds);
      router.push('/tarot/result');
    },
    [onComplete, router, selectedIds],
  );

  return (
    <>
      <ScrollableFanCard cards={CARDS} />
      <CompleteButton selectedIds={selectedIds} onClick={handleComplete} />
    </>
  );
};
