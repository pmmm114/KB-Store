'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

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
}: T.IScrollableFanCardProps) => {
  const [isSelected, setIsSelected] = useState<number[]>([]);

  /**
   * 카드 선택
   */
  const onSelect = useCallback((cardId: number) => {
    console.log('onSelect', cardId);

    setIsSelected((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      }
      // CONDITION: 이미 최대 개수만큼 선택했다면 추가 선택 불가
      if (prev.length >= CARD_SELECT_LIMIT) {
        return prev;
      }

      return [...new Set([...prev, cardId])];
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        {cards.map((card, idx) => {
          const _isSelected = isSelected.includes(Number(card.id));

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
