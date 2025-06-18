import type { FC } from 'react';

interface BasketProps {}

const Basket: FC<BasketProps> = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Корзина</h1>
      <p>Содержимое корзины будет здесь</p>
    </div>
  );
};

export default Basket;
