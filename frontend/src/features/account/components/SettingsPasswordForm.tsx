'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, PasswordFormValues } from '../schemas/accountSchemas';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { FormField } from '@/components/ui/FormField';
import { PasswordInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SettingsPasswordForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (_data: PasswordFormValues) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    toast.info('This feature is ready for backend integration and will become available in a future update.');
    reset();
  };

  return (
    <section id="security">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Password & Security</CardTitle>
            <CardDescription>Update your password to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 max-w-xl">
            <FormField label="Current Password" error={errors.currentPassword?.message}>
              <PasswordInput 
                {...register('currentPassword')} 
              />
            </FormField>

            <FormField label="New Password" error={errors.newPassword?.message}>
              <PasswordInput 
                {...register('newPassword')} 
              />
            </FormField>

            <FormField label="Confirm New Password" error={errors.confirmPassword?.message}>
              <PasswordInput 
                {...register('confirmPassword')} 
              />
            </FormField>
          </CardContent>
          <CardFooter className="justify-end pt-0">
            <Button 
              type="submit" 
              variant="secondary"
              loading={isSubmitting}
            >
              Update Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
