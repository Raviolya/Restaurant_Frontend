import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '@/shared/ui/kit/skeleton';

describe('Skeleton', () => {
  const renderSkeleton = (props = {}) => {
    return render(<Skeleton {...props} />);
  };

  it('отображает компонент с правильными атрибутами', () => {
    renderSkeleton();
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('data-slot', 'skeleton');
  });

  it('имеет базовые стили', () => {
    renderSkeleton();
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('bg-accent animate-pulse rounded-md');
  });

  it('применяет пользовательские классы', () => {
    renderSkeleton({ className: 'custom-class' });
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('custom-class');
  });

  it('поддерживает пользовательские размеры', () => {
    renderSkeleton({ style: { width: '100px', height: '20px' } });
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({ width: '100px', height: '20px' });
  });
});
