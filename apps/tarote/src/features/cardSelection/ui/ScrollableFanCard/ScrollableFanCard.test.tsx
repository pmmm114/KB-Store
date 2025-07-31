import { render, screen, fireEvent } from '@testing-library/react';
import { ScrollableFanCard } from './ScrollableFanCard';

const CARDS = Array.from({ length: 78 }).map((_, idx) => ({ id: idx }));

describe('ScrollableFanCard', () => {
  it('카드는 78장 렌더링', () => {
    render(<ScrollableFanCard cards={CARDS} />);
    expect(screen.getAllByRole('button').length).toBe(78);
  });

  it('카드를 클릭하면 active 적용', () => {
    render(<ScrollableFanCard cards={CARDS} />);

    const cards = screen.getAllByRole('button');

    const selectedCard = [1];

    selectedCard.forEach((card) => {
      fireEvent.click(cards[card]);
    });

    selectedCard.forEach((card) => {
      expect(cards[card]).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('active된 카드를 클릭하면 active 효과 해제', () => {
    render(<ScrollableFanCard cards={CARDS} />);

    const cards = screen.getAllByRole('button');

    const selectedCard = [1, 2];

    // 카드 active 적용
    selectedCard.forEach((card) => {
      fireEvent.click(cards[card]);
    });

    // 카드 active 해제
    selectedCard.forEach((card) => {
      fireEvent.click(cards[card]);
    });

    selectedCard.forEach((card) => {
      expect(cards[card]).toHaveAttribute('aria-pressed', 'false');
    });
  });

  it('카드는 3개까지 선택 가능', () => {
    render(<ScrollableFanCard cards={CARDS} />);
    const cards = screen.getAllByRole('button');

    const selectedCard = [2, 3, 4, 5];

    selectedCard.forEach((card) => {
      fireEvent.click(cards[card]);
    });

    selectedCard.slice(0, 3).forEach((card) => {
      expect(cards[card]).toHaveAttribute('aria-pressed', 'true');
    });

    selectedCard.slice(-1).forEach((card) => {
      expect(cards[card]).toHaveAttribute('aria-pressed', 'false');
    });
  });

  it('카드가 없으면 아무것도 보이지 않는다', () => {
    render(<ScrollableFanCard cards={[]} />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
