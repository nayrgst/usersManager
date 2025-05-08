'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';

import { register } from '@/actions/register';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema } from '@/schemas/userSchema';
import { CardWrapper } from '@/components/auth/cardWrapper';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/formError';
import { FormSucess } from '@/components/formSucess';

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      cep: '',
      state: '',
      city: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });

    form.reset({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      cep: '',
      state: '',
      city: '',
    });
  }

  return (
    <>
      <CardWrapper
        headerLabel="Criar uma conta"
        backButtonLabel="Já tem uma conta?"
        backButtonHref="/auth/login"
        showSocialButtons
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <section className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="Gustavo Mateus João de Thiago"
                          className="pl-10"
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
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="00000000"
                        maxLength={8}
                        disabled={isPending}
                        onBlur={async (e) => {
                          const cep = e.target.value;
                          if (/^[0-9]{8}$/.test(cep)) {
                            try {
                              const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                              const data = await res.json();
                              if (!data.erro) {
                                form.setValue('state', data.uf);
                                form.setValue('city', data.localidade);
                              }
                            } catch (error) {
                              console.error('Erro ao buscar CEP', error);
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="SP" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="São Paulo" disabled />
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
                          placeholder="123456"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha:</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="123456"
                          type="password"
                          {...field}
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
              CRIAR CONTA
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
