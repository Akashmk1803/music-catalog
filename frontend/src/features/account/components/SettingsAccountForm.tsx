'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema, AccountFormValues } from '../schemas/accountSchemas';
import { toast } from 'sonner';

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
      <div className="relative bg-surface-container-low/45 backdrop-blur-xxl p-xl rounded-xl shadow-xl border-t border-white/5">
        
        <div className="flex justify-between items-start mb-xl">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Account Profile</h2>
            <p className="font-body-sm text-on-surface-variant">Manage your professional credentials and identity.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
            
            <div className="flex flex-col gap-xs">
              <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                {...register('fullName')} 
                className="py-sm bg-transparent border-b border-outline-variant/20 focus:border-primary font-data-md text-on-surface outline-none transition-colors"
                placeholder="Enter full name"
              />
              {errors.fullName && <span className="text-error text-body-sm mt-1">{errors.fullName.message}</span>}
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                {...register('email')} 
                className="py-sm bg-transparent border-b border-outline-variant/20 focus:border-primary font-data-md text-on-surface outline-none transition-colors"
                placeholder="user@catalog.ai"
              />
              {errors.email && <span className="text-error text-body-sm mt-1">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">Affiliation</label>
              <input 
                type="text" 
                {...register('affiliation')} 
                className="py-sm bg-transparent border-b border-outline-variant/20 focus:border-primary font-data-md text-on-surface outline-none transition-colors"
                placeholder="e.g. Sterling Audio Group"
              />
            </div>
            
          </div>

          <div className="flex justify-end pt-md">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-xl py-md bg-surface-container-highest hover:bg-surface-container-highest/80 text-on-surface font-label-caps rounded-lg transition-all tracking-widest disabled:opacity-50 uppercase"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
