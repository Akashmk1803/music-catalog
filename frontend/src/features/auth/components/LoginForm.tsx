'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useAuth } from '@/providers/AuthProvider';
import { useLogin } from '@/features/auth/hooks/useAuthQueries';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { mutate: loginMutation, isPending } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation(
      { email: data.email, securityKey: data.password },
      {
        onSuccess: (res) => {
          toast.success('Successfully authenticated');
          login(res.token);
          router.push('/dashboard');
        },
        onError: (err: unknown) => {
          const axiosError = err as AxiosError<{ message?: string }>;
          let message = 'Authentication failed';
          
          if (axiosError.response) {
            message = axiosError.response.data?.message || 'Invalid email or password';
          } else {
            message = 'Network error. Please check your connection.';
          }
          
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col w-full relative">
      
      {/* Main Login Card */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Branding Accent */}
        <div className="mb-10 flex flex-col items-center gap-4 lg:hidden">
          <div className="w-12 h-[1px] bg-primary/40"></div>
          <span className="font-label-caps text-[12px] leading-none text-primary tracking-[0.3em] uppercase font-semibold">Executive Access</span>
        </div>
        
        {/* The Form Panel */}
        <div className="w-full">
          <header className="mb-10">
            <h2 className="font-headline-md text-3xl text-on-surface mb-2 tracking-tight">Welcome Back</h2>
            <p className="font-body-md text-on-surface-variant/70">Enter your credentials to access the Catalog.</p>
          </header>
          
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="group relative">
              <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest mb-2 block" htmlFor="email">
                Email Address
              </label>
              <input
                {...register('email')}
                className={`w-full bg-surface-container/30 border ${errors.email ? 'border-error' : 'border-outline-variant/20'} rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all duration-300 focus:outline-none focus:border-primary focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(232,192,134,0.15)]`}
                id="email"
                placeholder="name@studio.com"
                type="email"
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-error text-xs mt-2">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="group relative">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block" htmlFor="password">
                  Security Key
                </label>
                <Link className="font-label-caps text-[10px] text-primary/80 hover:text-primary transition-colors duration-200 uppercase tracking-widest" href="#">
                  Reset
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  className={`w-full bg-surface-container/30 border ${errors.password ? 'border-error' : 'border-outline-variant/20'} rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all duration-300 focus:outline-none focus:border-primary focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(232,192,134,0.15)] pr-12`}
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  disabled={isPending}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-error text-xs mt-2">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              disabled={isPending}
              className="mt-6 w-full bg-primary hover:bg-primary/90 text-on-primary rounded-lg py-3.5 flex items-center justify-center gap-3 group overflow-hidden relative active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(232,192,134,0.2)] hover:shadow-[0_0_30px_rgba(232,192,134,0.4)]"
            >
              <span className="relative z-10 font-label-caps text-[12px] tracking-[0.2em] uppercase">
                {isPending ? 'Authenticating...' : 'Establish Connection'}
              </span>
              {isPending ? (
                <Loader2 className="animate-spin relative z-10 text-on-primary" size={18} />
              ) : (
                <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-on-primary" size={18} />
              )}
              {!isPending && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
              )}
            </button>
          </form>
          
          {/* Footer Actions */}
          <footer className="mt-8 pt-8 flex flex-col items-start gap-4">
            <p className="font-body-sm text-[14px] text-on-surface-variant/60">
              Don&apos;t have an invitation? 
              <Link className="text-primary hover:text-primary/80 transition-colors duration-300 ml-2" href="/register">
                Register Profile
              </Link>
            </p>
          </footer>
        </div>
        
        {/* Technical Metadata Decoration */}
      </div>
    </div>
  );
}
