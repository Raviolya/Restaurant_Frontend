import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '@/shared/ui/kit/label';

describe('Label', () => {
  const renderLabel = (props = {}) => {
    return render(<Label {...props} />);
  };

  it('отображает текст метки', () => {
    renderLabel({ children: 'Тестовая метка' });
    expect(screen.getByText('Тестовая метка')).toBeInTheDocument();
  });

  it('имеет правильные атрибуты', () => {
    renderLabel({ htmlFor: 'test-input' });
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('data-slot', 'label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('применяет пользовательские классы', () => {
    renderLabel({ className: 'custom-class' });
    const label = screen.getByTestId('label');
    expect(label).toHaveClass('custom-class');
  });

  it('имеет базовые стили', () => {
    renderLabel();
    const label = screen.getByTestId('label');
    expect(label).toHaveClass(
      'flex items-center gap-2 text-sm leading-none font-medium select-none'
    );
  });

  it('поддерживает disabled состояние через группу', () => {
    render(
      <div data-disabled="true">
        <Label>Тестовая метка</Label>
      </div>
    );
    const label = screen.getByText('Тестовая метка');
    expect(label).toHaveClass(
      'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50'
    );
  });
});
