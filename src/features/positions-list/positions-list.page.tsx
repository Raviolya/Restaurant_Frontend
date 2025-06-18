import { MenuItemCard } from './ui/menu-item-card';
import { CategoryFilter } from './ui/category-filter';
import { LoadingSkeleton } from './ui/loading-skeleton';
import { ErrorMessage } from './ui/error-message';
import { usePositions } from './model/use-positions';

const PositionsPage = () => {
  const {
    menuItems,
    categories,
    selectedCategory,
    loading,
    error,
    setSelectedCategory,
    handleRetry,
  } = usePositions();

  if (loading && !menuItems.length) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <MenuItemCard key={item.Id} item={item} />
        ))}
      </div>
    </div>
  );
};

export const Component = PositionsPage;
