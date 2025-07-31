'use client';

import Image from 'next/image';
import React from 'react';

import type { IPickedCardListProps } from '../../model/types';

import styles from './PickedCardList.module.css';

export const PickedCardList = ({
  cards,
  selectedIds,
}: IPickedCardListProps) => {
  const pickedCards = cards.filter((card) =>
    selectedIds.includes(Number(card.id)),
  );

  if (pickedCards.length === 0) return null;

  return (
    <div className={styles.container}>
      {pickedCards.map((card, index) => {
        const isLast = index === pickedCards.length - 1;

        return (
          <div
            key={card.id}
            className={`${styles.pickedCard} ${isLast ? styles.isLast : ''}`}
          >
            <Image
              src="/cards/CardBacks.png"
              alt={`Picked card ${card.id}`}
              fill
              style={{ objectFit: 'contain' }}
            />
            {isLast && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => {
                  console.log('remove', card.id);
                }}
              >
                X
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
