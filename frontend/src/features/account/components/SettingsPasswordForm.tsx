'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema, PasswordFormValues } from '../schemas/accountSchemas';
import { toast } from 'sonner';

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
    <section className="bg-surface-container-low/45 backdrop-blur-xxl p-8 rounded-xl shadow-xl border-t border-white/5" id="security">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Password & Security</h2>
      <p className="font-body-sm text-on-surface-variant mb-8">Update your password to keep your account secure.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
        <div className="flex flex-col gap-xs">
          <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">Current Password</label>
          <input 
            type="password" 
            {...register('currentPassword')} 
            className="py-sm bg-transparent border-b border-outline-variant/20 focus:border-primary font-data-md text-on-surface outline-none transition-colors"
          />
          {errors.currentPassword && <span className="text-error text-body-sm mt-1">{errors.currentPassword.message}</span>}
        </div>

        <div className="flex flex-col gap-xs">
          <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">New Password</label>
          <input 
            type="password" 
            {...register('newPassword')} 
            className="py-sm bg-transparent border-b border-outline-variant/20 focus:border-primary font-data-md text-on-surface outline-none transition-colors"
          />
          {errors.newPassword && <span className="text-error text-body-sm mt-1">{errors.newPassword.message}</span>}
        </div>

        <div className="flex flex-col gap-xs">
          <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">Confirm New Password</label>
          <input 
            type="password" 
            {...register('confirmPassword')} 
            className="py-sm bg-transparent border-b border-outline-variant/20 focus:border-primary font-data-md text-on-surface outline-none transition-colors"
          />
          {errors.confirmPassword && <span className="text-error text-body-sm mt-1">{errors.confirmPassword.message}</span>}
        </div>

        <div className="flex justify-end pt-8">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-xl py-md bg-surface-container-highest hover:bg-surface-container-highest/80 text-on-surface font-label-caps rounded-lg transition-all tracking-widest disabled:opacity-50 uppercase"
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </section>
  );
}
