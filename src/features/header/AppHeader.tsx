import { useState, type FC } from 'react';

import { LogOut, ShoppingBasket, User, Menu as MenuIcon } from 'lucide-react';
import { ROUTES } from '@/shared/model/routes';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/kit/button';
import { useAuthStore } from '@/shared/lib/store/auth.store';
import { AuthService } from '@/shared/services/auth.service';
import { useBasketStore } from '@/shared/lib/store/basket.store';

interface AppHeaderProps {}

const AppHeader: FC<AppHeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user } = useAuthStore();
  const basketCount = useBasketStore((state) => state.getCount());

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <header className="h-[100px] w-full bg-white shadow-sm flex justify-between items-center px-4 md:px-6">
      <div className="flex-1 flex items-center">
        <h1>
          <Button variant="link">
            <Link
              className="font-bold text-2xl md:text-3xl hover:text-primary transition-colors"
              to={ROUTES.POSITIONS}
            >
              RESTAURANT
            </Link>
          </Button>
        </h1>
      </div>

      <nav className="hidden md:block flex-1">
        <ul className="flex justify-center">
          <li>
            <Button variant="link">
              <Link
                className="font-bold text-xl hover:text-primary transition-colors"
                to={ROUTES.POSITIONS}
              >
                Меню
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link">
              <Link
                className="font-bold text-xl hover:text-primary transition-colors"
                to={ROUTES.ORDERS}
              >
                История заказов
              </Link>
            </Button>
          </li>
        </ul>
      </nav>

      <div className="flex-1 flex items-center justify-end gap-6">
        <Link to={ROUTES.BASKET} className="relative">
          <Button variant="ghost" size="icon" className="p-2">
            <ShoppingBasket size={32} strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {basketCount}
            </span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon size={32} strokeWidth={1.5} />
        </Button>

        {isMenuOpen && (
          <div className="absolute top-[100px] right-0 bg-white shadow-md p-4 rounded-lg z-50">
            <ul className="flex flex-col gap-4">
              <li className="md:hidden">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
                    to={ROUTES.POSITIONS}
                  >
                    Меню
                  </Link>
                </Button>
              </li>
              <li className="md:hidden">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link
                    className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
                    to={ROUTES.ORDERS}
                  >
                    История заказов
                  </Link>
                </Button>
              </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link
                        className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
                        to={ROUTES.PROFILE}
                      >
                        <User className="h-5 w-5" />
                        {user?.name || 'Профиль'}
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                      <div className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors">
                        <LogOut className="h-5 w-5" />
                        Выйти
                      </div>
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link
                      className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
                      to={ROUTES.LOGIN}
                    >
                      <User className="h-5 w-5" />
                      Вход
                    </Link>
                  </Button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
