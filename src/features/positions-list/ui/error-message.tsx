import { Card, CardContent } from '@/shared/ui/kit/card';
import { Button } from '@/shared/ui/kit/button';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <p className="text-xl font-semibold text-red-500 mb-4">{message}</p>
          <Button onClick={onRetry}>
            Попробовать снова
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}; 