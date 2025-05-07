'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Lock, Mail } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';

import { loginAction } from '@/actions/login';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/formError';
import { FormSucess } from '@/components/formSucess';
import { loginSchema } from '@/schemas/loginSchema';
import { CardWrapper } from '@/components/auth/cardWrapper';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui/form';

export function LoginForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError('');
    setSuccess('');

    startTransition(() => {
      loginAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }

  return (
    <CardWrapper
      backButtonHref="auth/register"
      backButtonLabel="Não tem uma conta ?"
      headerLabel="BEM-VINDO!"
      showSocialButtons
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <section className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="exemplo@exemplo.com"
                        className="pl-10"
                        type="email"
                        disabled={isPending}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        {...field}
                        placeholder="*******"
                        type="password"
                        className="pl-10"
                        disabled={isPending}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <FormError message={error} />
          <FormSucess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            ENTRAR
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
