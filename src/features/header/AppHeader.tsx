import { useState, type FC } from 'react';

import { LogOut, ShoppingBasket, User, Menu as MenuIcon } from 'lucide-react';
import { ROUTES } from '@/shared/model/routes';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/kit/button';

interface AppHeaderProps { }

const AppHeader: FC<AppHeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        </ul>
      </nav>

      <div className="flex-1 flex items-center justify-end gap-6">
        <Button variant="ghost" size="icon" className="relative">
          <Link to={ROUTES.BASKET}>
            <ShoppingBasket className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              0
            </span>
          </Link>
        </Button>

        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon className="h-6 w-6" />
        </Button>

        {isMenuOpen && (
          <div className="absolute top-[100px] right-0 bg-white shadow-md p-4 rounded-lg">
            <ul className="flex flex-col gap-4">
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
                    Профиль
                  </Link>
                </Button>
              </li>
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
                    <LogOut className="h-5 w-5" />
                    Выйти
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
