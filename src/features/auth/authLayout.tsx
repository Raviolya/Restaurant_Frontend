import type React from 'react';
import type { FC } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes';

interface AuthLayoutProps {
  title: React.ReactNode;
  form: React.ReactNode;
  description: React.ReactNode;
  footer: React.ReactNode;
  textLink: React.ReactNode;
  link: (typeof ROUTES)[keyof typeof ROUTES];
}

const AuthLayout: FC<AuthLayoutProps> = ({ title, form, description, footer, link, textLink }) => {
  return (
    <>
      <main className="grow flex flex-col pt-[100px] items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <CardAction>
              <Button variant="link">
                <Link to={link}>{textLink}</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>{form}</CardContent>
          <CardFooter className="flex-col gap-2">{footer}</CardFooter>
        </Card>
      </main>
    </>
  );
};

export default AuthLayout;
