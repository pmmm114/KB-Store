'use client';

import Image from 'next/image';
import { useCallback } from 'react';

import { CARD_SELECT_LIMIT } from '../../model/const';
import styles from './ScrollableFanCard.module.css';

import type * as T from './ScrollableFanCard.types';

/**
 * Horizontally scrollable, fan-shaped row of cards.
 * Cards rotate & scale based on their position relative to the centre of the scroll container.
 * Uses requestAnimationFrame to update transforms on scroll for 60fps on modern devices.
 */
export const ScrollableFanCard = ({
  cards,
  cardBackSrc = '/cards/CardBacks.png',
  selectedIds = [],
  onSelectionChange,
}: T.IScrollableFanCardProps) => {
  /**
   * 카드 선택
   */
  const onSelect = useCallback(
    (cardId: number) => {
      const newSelection = selectedIds.includes(cardId)
        ? selectedIds.filter((id) => id !== cardId)
        : selectedIds.length >= CARD_SELECT_LIMIT
          ? selectedIds
          : [...selectedIds, cardId];

      onSelectionChange?.(newSelection);
    },
    [selectedIds, onSelectionChange],
  );

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        {cards.map((card) => {
          const _isSelected = selectedIds.includes(Number(card.id));

          return (
            <button
              key={card.id}
              type="button"
              className={`${styles.card} ${_isSelected ? styles.active : ''}`}
              onClick={() => onSelect(Number(card.id))}
              aria-pressed={_isSelected}
            >
              <Image
                src={cardBackSrc}
                width={35}
                height={63}
                alt={`타로 카드 후면`}
                className={styles.cardImage}
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
