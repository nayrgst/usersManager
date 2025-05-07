'use client';
import { cn } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { BackButton } from '@/components/auth/backButton';
import { Header } from '@/components/auth/header';
import { SocialButtons } from '@/components/auth/socialButtons';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref: string;
  showSocialButtons?: boolean;
  showImageBg?: boolean;
  className?: string;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocialButtons,
  className,
}: CardWrapperProps) {
  return (
    <Card className={cn('w-[400px] shadow-md', className)}>
      <>
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>

        <CardContent>{children}</CardContent>

        {showSocialButtons && (
          <CardFooter>
            <SocialButtons />
          </CardFooter>
        )}

        {backButtonLabel && (
          <CardFooter className="mt-4">
            <BackButton label={backButtonLabel} href={backButtonHref} />
          </CardFooter>
        )}
      </>
    </Card>
  );
}
