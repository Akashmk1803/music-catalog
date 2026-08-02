'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema, AccountFormValues } from '../schemas/accountSchemas';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SettingsAccountForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      fullName: 'User',
      email: '',
      affiliation: ''
    }
  });

  const onSubmit = async (_data: AccountFormValues) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.info('This feature is ready for backend integration and will become available in a future update.');
  };

  return (
    <section className="relative group" id="account">
      <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <Card className="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Account Profile</CardTitle>
            <CardDescription>Manage your professional credentials and identity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField label="Full Name" error={errors.fullName?.message}>
                <Input 
                  type="text" 
                  {...register('fullName')} 
                  placeholder="Enter full name"
                />
              </FormField>
              <FormField label="Email Address" error={errors.email?.message}>
                <Input 
                  type="email" 
                  {...register('email')} 
                  placeholder="user@catalog.ai"
                />
              </FormField>
              <FormField label="Affiliation">
                <Input 
                  type="text" 
                  {...register('affiliation')} 
                  placeholder="e.g. Sterling Audio Group"
                />
              </FormField>
            </div>
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <Button 
              type="submit" 
              variant="secondary"
              loading={isSubmitting}
            >
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
