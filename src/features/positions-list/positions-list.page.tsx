import type { FC } from 'react';

const PositionsPage: FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-white">Меню</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Здесь будет список позиций */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">Заглушка позиции</h2>
          <p className="text-gray-600">Описание позиции</p>
          <p className="text-lg font-bold mt-2">100 ₽</p>
        </div>
      </div>
    </div>
  );
};

export const Component = PositionsPage;
