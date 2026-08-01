'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useRegister } from '@/features/auth/hooks/useAuthQueries';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: registerMutation, isPending } = useRegister();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch('password') || '';

  const { strengthText, strengthColor, strengthWidth } = useMemo(() => {
    const val = passwordValue;
    let strength = 0;

    if (val.length > 0) strength += 20;
    if (val.length > 8) strength += 20;
    if (/[A-Z]/.test(val)) strength += 20;
    if (/[0-9]/.test(val)) strength += 20;
    if (/[^A-Za-z0-9]/.test(val)) strength += 20;

    let text = 'Weak';
    let color = '#ffb4ab'; // error

    if (strength > 20 && strength <= 60) {
      text = 'Moderate';
      color = '#9a8f81'; // outline
    } else if (strength > 60 && strength <= 80) {
      text = 'Strong';
      color = '#e8c086'; // primary
    } else if (strength > 80) {
      text = 'Exceptional';
      color = '#e8c086';
    }

    return {
      strengthText: val ? text : 'Weak',
      strengthColor: val ? color : 'var(--outline)',
      strengthWidth: `${strength}%`,
    };
  }, [passwordValue]);

  const onSubmit = (data: RegisterFormData) => {
    registerMutation(
      { name: data.name, email: data.email, securityKey: data.password },
      {
        onSuccess: () => {
          toast.success('Registration successful. Please login.');
          router.push('/login');
        },
        onError: (err: unknown) => {
          const axiosError = err as AxiosError<{ message?: string }>;
          let message = 'Registration failed';
          
          if (axiosError.response) {
            message = axiosError.response.data?.message || 'Email already exists';
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
      
      <div className="w-full">
        {/* Header/Logo Area */}
        <div className="flex flex-col items-center text-center gap-4 mb-10 lg:hidden">
          <div className="relative group">
            <span className="font-display-lg text-[42px] leading-[1.1] font-light tracking-tight text-primary uppercase tracking-widest">Catalog</span>
            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          </div>
        </div>
        
        <header className="mb-10 lg:block hidden">
          <h2 className="font-headline-md text-3xl text-on-surface mb-2 tracking-tight">Create Profile</h2>
          <p className="font-body-md text-on-surface-variant/70">Join the executive network.</p>
        </header>
        
        {/* Registration Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest mb-2 block" htmlFor="full-name">
              Full Name
            </label>
            <div className="relative">
              <input
                {...register('name')}
                className={`w-full bg-surface-container/30 border ${errors.name ? 'border-error' : 'border-outline-variant/20'} rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all duration-300 focus:outline-none focus:border-primary focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(232,192,134,0.15)]`}
                id="full-name"
                placeholder="Alexander Vane"
                type="text"
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-error text-xs mt-2">{errors.name.message}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest mb-2 block" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <input
                {...register('email')}
                className={`w-full bg-surface-container/30 border ${errors.email ? 'border-error' : 'border-outline-variant/20'} rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all duration-300 focus:outline-none focus:border-primary focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(232,192,134,0.15)]`}
                id="email"
                placeholder="archive@catalog.io"
                type="email"
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-error text-xs mt-2">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password Field & Strength */}
          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-2">
              <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block" htmlFor="password">
                Security Key
              </label>
              <span className="font-data-md font-medium text-[10px] uppercase" style={{ color: strengthColor }}>
                {strengthText}
              </span>
            </div>
            <div className="relative group">
              <input
                {...register('password')}
                className={`w-full bg-surface-container/30 border ${errors.password ? 'border-error' : 'border-outline-variant/20'} rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all duration-300 focus:outline-none focus:border-primary focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(232,192,134,0.15)] pr-12`}
                id="password"
                placeholder="••••••••••••"
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
              
              {/* Brass Progress Bar Container */}
              <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-surface-container-highest overflow-hidden rounded-full mt-2">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_8px_rgba(232,192,134,0.4)]"
                  style={{ width: strengthWidth }}
                ></div>
              </div>
            </div>
            {errors.password && (
              <p className="text-error text-xs mt-3">{errors.password.message}</p>
            )}
            <p className="font-body-sm text-[11px] text-on-surface-variant/60 italic leading-relaxed mt-2">
              Ensure your key includes at least 8 characters with varied archetypes.
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col mt-2">
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest mb-2 block" htmlFor="confirmPassword">
              Confirm Security Key
            </label>
            <div className="relative group">
              <input
                {...register('confirmPassword')}
                className={`w-full bg-surface-container/30 border ${errors.confirmPassword ? 'border-error' : 'border-outline-variant/20'} rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all duration-300 focus:outline-none focus:border-primary focus:bg-surface-container/50 focus:shadow-[0_0_15px_rgba(232,192,134,0.15)] pr-12`}
                id="confirmPassword"
                placeholder="••••••••••••"
                type={showConfirmPassword ? 'text' : 'password'}
                disabled={isPending}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-error text-xs mt-2">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-4 mt-2">
            <button
              disabled={isPending}
              className="mt-2 w-full bg-primary hover:bg-primary/90 text-on-primary rounded-lg py-3.5 flex items-center justify-center gap-3 group overflow-hidden relative active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(232,192,134,0.2)] hover:shadow-[0_0_30px_rgba(232,192,134,0.4)]"
              type="submit"
            >
              <span className="relative z-10 font-label-caps text-[12px] tracking-[0.2em] uppercase">
                {isPending ? 'Authenticating...' : 'Create Account'}
              </span>
              {isPending ? (
                <Loader2 className="animate-spin relative z-10 text-on-primary" size={18} />
              ) : null}
              {!isPending && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
              )}
            </button>
            <div className="text-center mt-2">
              <span className="font-body-sm text-[14px] text-on-surface-variant/60">Already have an account?</span>
              <Link className="text-primary hover:text-primary/80 transition-colors duration-300 ml-2" href="/login">
                Login
              </Link>
            </div>
          </div>
        </form>
        

      </div>
    </div>
  );
}
