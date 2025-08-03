'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTarotReading } from '../../../tarotReading';
import { ScrollableFanCard } from '../ScrollableFanCard/ScrollableFanCard';
import { CompleteButton } from '../CompleteButton/CompleteButton';
import { CARD_SELECT_LIMIT, CARDS } from '../../model';

export const CardSelectionContainer = () => {
  const { selectedCards, setSelectedCards } = useTarotReading();
  const router = useRouter();

  const handleSelectionChange = useCallback(
    (selectedIds: number[]) => {
      setSelectedCards(selectedIds);
    },
    [setSelectedCards],
  );

  const handleComplete = useCallback(
    async (_e: React.MouseEvent<HTMLButtonElement>) => {
      if (selectedCards.length !== CARD_SELECT_LIMIT) return;
      router.push('/result');
    },
    [selectedCards, router],
  );

  return (
    <>
      <ScrollableFanCard
        cards={CARDS}
        selectedIds={selectedCards}
        onSelectionChange={handleSelectionChange}
      />
      <CompleteButton selectedIds={selectedCards} onClick={handleComplete} />
    </>
  );
};
