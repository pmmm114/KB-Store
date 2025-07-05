import { render, screen, fireEvent } from '@testing-library/react';
import { CompleteButton } from './CompleteButton';

describe('CompleteButton', () => {
  it('버튼 비활성화', () => {
    render(<CompleteButton selectedIds={[]} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('버튼 활성화', () => {
    render(<CompleteButton selectedIds={[1, 2, 3]} />);
    expect(screen.getByRole('button')).toBeEnabled();
  });
});
