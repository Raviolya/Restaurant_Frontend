import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneInput } from '@/shared/ui/kit/phone-input';

describe('PhoneInput', () => {
  const renderPhoneInput = (props = {}) => {
    return render(<PhoneInput {...props} />);
  };

  it('отображает компонент с правильными атрибутами', () => {
    renderPhoneInput();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'tel');
  });

  it('отображает кнопку выбора страны', () => {
    renderPhoneInput();
    const countryButton = screen.getByRole('button');
    expect(countryButton).toBeInTheDocument();
    expect(countryButton).toHaveClass('flex gap-1 rounded-e-none rounded-s-lg');
  });

  it('позволяет вводить номер телефона', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderPhoneInput({ onChange });

    const input = screen.getByRole('textbox');
    await user.type(input, '+7 (999) 123-45-67');

    expect(onChange).toHaveBeenCalled();
  });

  it('поддерживает disabled состояние', () => {
    renderPhoneInput({ disabled: true });

    const input = screen.getByRole('textbox');
    const countryButton = screen.getByRole('button');

    expect(input).toBeDisabled();
    expect(countryButton).toBeDisabled();
  });

  it('применяет пользовательские классы', () => {
    renderPhoneInput({ className: 'custom-class' });

    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('отображает флаг выбранной страны', () => {
    renderPhoneInput({ value: '+1' });

    const flagContainer = screen.getByRole('button').querySelector('span');
    expect(flagContainer).toHaveClass('flex h-4 w-6 overflow-hidden rounded-sm');
  });
});
