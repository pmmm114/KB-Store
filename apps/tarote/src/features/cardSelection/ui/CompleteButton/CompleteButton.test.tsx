import { render, screen } from '@testing-library/react';
import { CompleteButton } from './CompleteButton';

describe('CompleteButton', () => {
  describe('버튼 비활성화', () => {
    it('0개 선택', () => {
      render(<CompleteButton selectedIds={[]} />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
    it('1개 선택', () => {
      render(<CompleteButton selectedIds={[1]} />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
    it('2개 선택', () => {
      render(<CompleteButton selectedIds={[1, 2]} />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  it('버튼 활성화', () => {
    render(<CompleteButton selectedIds={[1, 2, 3]} />);
    expect(screen.getByRole('button')).toBeEnabled();
  });
});
