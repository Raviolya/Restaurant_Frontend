import { Button } from '@/shared/ui/kit/button';
import type { Category } from '@/shared/api/categories';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onCategorySelect(null)}
        >
          Все
        </Button>
        {categories.map((category) => (
          <Button
            key={category.Id}
            variant={selectedCategory === category.Id ? "default" : "outline"}
            onClick={() => onCategorySelect(category.Id)}
          >
            {category.Name}
          </Button>
        ))}
      </div>
    </div>
  );
}; 