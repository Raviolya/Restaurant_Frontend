import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select';

describe('Select', () => {
  const renderSelect = () => {
    return render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Выберите опцию" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Опции</SelectLabel>
            <SelectItem value="1">Опция 1</SelectItem>
            <SelectItem value="2">Опция 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  it('отображает select с правильными атрибутами', () => {
    renderSelect();
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('data-slot', 'select-trigger');
  });

  it('отображает placeholder', () => {
    renderSelect();
    expect(screen.getByText('Выберите опцию')).toBeInTheDocument();
  });

  //   it('отображает опции при клике', async () => {
  //     const user = userEvent.setup();
  //     renderSelect();

  //     const trigger = screen.getByRole('combobox');
  //     await user.click(trigger);

  //     await waitFor(() => {
  //       const content = document.querySelector('[data-radix-popper-content-wrapper]');
  //       expect(content).toBeInTheDocument();
  //     });
  //     expect(screen.getByText('Опция 1')).toBeInTheDocument();
  //     expect(screen.getByText('Опция 2')).toBeInTheDocument();
  //   });

  //   it('выбирает опцию при клике', async () => {
  //     const user = userEvent.setup();
  //     renderSelect();

  //     const trigger = screen.getByRole('combobox');
  //     await user.click(trigger);

  //     await waitFor(() => {
  //       const content = document.querySelector('[data-radix-popper-content-wrapper]');
  //       expect(content).toBeInTheDocument();
  //     });
  //     const option = screen.getByText('Опция 1');
  //     await user.click(option);

  //     expect(trigger).toHaveTextContent('Опция 1');
  //   });

  it('поддерживает disabled состояние', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Выберите опцию" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('применяет правильные классы', () => {
    render(
      <Select>
        <SelectTrigger className="custom-class">
          <SelectValue placeholder="Выберите опцию" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('custom-class');
  });
});
