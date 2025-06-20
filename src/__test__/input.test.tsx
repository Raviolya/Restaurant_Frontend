import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '@/shared/ui/kit/input';

describe('Input', () => {
  it('отображает input с правильными атрибутами', () => {
    render(<Input placeholder="Введите текст" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Введите текст');
  });

  it('применяет правильные классы', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('поддерживает disabled состояние', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('поддерживает разные типы input', () => {
    render(<Input type="password" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('поддерживает aria-invalid атрибут', () => {
    render(<Input aria-invalid="true" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
