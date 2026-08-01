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
      {/* Ambient Background Blooms */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50"></div>
        <div className="absolute top-[40%] -right-[15%] w-[500px] h-[500px] bg-tertiary-container/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
      </div>
      
      {/* Main Login Card */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Branding Accent */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="w-12 h-[1px] bg-primary/40"></div>
          <span className="font-label-caps text-[12px] leading-none text-primary tracking-[0.3em] uppercase font-semibold">Executive Access</span>
        </div>
        
        {/* The Smoked Glass Panel */}
        <div className="w-full glass-panel bg-surface-container-low/45 rounded-xxl p-8 sm:p-12 border-t border-[#EDE8DD]/15 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]">
          <header className="mb-12 text-center">
            <h1 className="font-display-lg text-[48px] leading-[1.1] text-on-surface mb-xs italic font-light tracking-[-0.02em]">Welcome Back</h1>
            <p className="font-body-sm text-[14px] leading-[1.5] text-on-surface-variant/60 tracking-tight">Enter your credentials to access the Catalog.</p>
          </header>
          
          <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div className="group relative">
              <label className="font-label-caps font-semibold text-[10px] text-on-surface-variant/50 uppercase mb-xs block ml-unit" htmlFor="email">
                Email Address
              </label>
              <input
                {...register('email')}
                className={`w-full bg-surface-container-lowest/30 border-b ${errors.email ? 'border-destructive' : 'border-outline-variant/30'} px-md py-lg font-body-md text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-300 focus:outline-none focus:border-primary focus:bg-surface-container-lowest/50`}
                id="email"
                placeholder="name@studio.com"
                type="email"
                disabled={isPending}
              />
              {!errors.email && (
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full shadow-[0_0_15px_rgba(176,141,87,0.4)]"></div>
              )}
              {errors.email && (
                <p className="text-destructive text-[11px] mt-xs ml-unit font-body-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="group relative">
              <div className="flex justify-between items-center mb-xs ml-unit">
                <label className="font-label-caps font-semibold text-[10px] text-on-surface-variant/50 uppercase block" htmlFor="password">
                  Security Key
                </label>
                <Link className="font-label-caps font-semibold text-[10px] text-primary/70 hover:text-primary transition-colors duration-200 uppercase tracking-widest" href="#">
                  Reset
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  className={`w-full bg-surface-container-lowest/30 border-b ${errors.password ? 'border-destructive' : 'border-outline-variant/30'} px-md py-lg font-body-md text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-300 focus:outline-none focus:border-primary focus:bg-surface-container-lowest/50 pr-12`}
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
              {!errors.password && (
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-focus-within:w-full shadow-[0_0_15px_rgba(176,141,87,0.4)]"></div>
              )}
              {errors.password && (
                <p className="text-destructive text-[11px] mt-xs ml-unit font-body-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              disabled={isPending}
              className="mt-6 w-full bg-primary py-lg flex items-center justify-center gap-md group overflow-hidden relative active:scale-[0.98] transition-transform duration-100 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 font-label-caps font-semibold text-[12px] text-on-primary tracking-widest uppercase">
                {isPending ? 'Authenticating...' : 'Establish Connection'}
              </span>
              {isPending ? (
                <Loader2 className="animate-spin relative z-10 text-on-primary" size={18} />
              ) : (
                <ArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-on-primary" size={18} />
              )}
              {!isPending && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              )}
            </button>
          </form>
          
          {/* Footer Actions */}
          <footer className="mt-12 pt-8 border-t border-outline-variant/10 flex flex-col items-center gap-md">
            <p className="font-body-sm text-[14px] text-on-surface-variant/40">
              Don&apos;t have an invitation? 
              <Link className="text-on-surface border-b border-on-surface/20 hover:border-primary hover:text-primary transition-all duration-300 ml-xs" href="/register">
                Register Profile
              </Link>
            </p>
          </footer>
        </div>
        
        {/* Technical Metadata Decoration */}
        <div className="mt-12 flex items-center gap-xl opacity-20">
          <div className="flex items-center gap-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-[pulse-soft_3s_infinite]"></span>
            <span className="font-data-md font-medium text-[10px] text-on-surface uppercase tracking-widest">Secure Server: Lon-01</span>
          </div>
          <div className="font-data-md font-medium text-[10px] text-on-surface uppercase tracking-widest">v4.2.0-STABLE</div>
        </div>
      </div>
      
      {/* Decorative Vertical Text */}
      <div className="absolute -left-margin top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="[writing-mode:vertical-rl] font-label-caps font-semibold text-[10px] text-primary/20 tracking-[1em] uppercase select-none">
          Proprietary Access Only • Catalog Music Insights
        </span>
      </div>
    </div>
  );
}
