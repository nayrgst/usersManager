'use client';
import { cn } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { BackButton } from '@/components/auth/backButton';
import { Header } from '@/components/auth/header';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref: string;
  className?: string;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  className,
}: CardWrapperProps) {
  return (
    <Card className={cn('w-[400px] shadow-md', className)}>
      <>
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>

        <CardContent>{children}</CardContent>

        {backButtonLabel && (
          <CardFooter className="mt-4">
            <BackButton label={backButtonLabel} href={backButtonHref} />
          </CardFooter>
        )}
      </>
    </Card>
  );
}
