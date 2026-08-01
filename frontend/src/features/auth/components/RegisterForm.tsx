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
      {/* Decorative Ambient Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-[10%] -left-[5%] w-[400px] h-[400px] bg-tertiary-container/10 rounded-full blur-[100px] mix-blend-screen opacity-30 animate-[pulse_12s_ease-in-out_infinite]"></div>
      </div>
      
      <div className="relative z-10 flex flex-col gap-xl">
        {/* Header/Logo Area */}
        <div className="flex flex-col items-center text-center space-y-md">
          <div className="relative group">
            <span className="font-display-lg text-[48px] leading-[1.1] font-light tracking-[-0.02em] text-primary uppercase tracking-widest">Catalog</span>
            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          </div>
          <span className="font-label-caps font-semibold text-[12px] leading-[1.0] text-outline tracking-[0.3em] uppercase">Music Insights</span>
        </div>
        
        {/* Registration Form */}
        <form className="flex flex-col gap-lg" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-caps font-semibold text-[12px] text-on-surface-variant/70 uppercase tracking-widest" htmlFor="full-name">
              Full Name
            </label>
            <div className="relative">
              <input
                {...register('name')}
                className={`w-full bg-surface-container-highest/30 border-b ${errors.name ? 'border-destructive' : 'border-outline-variant/30'} py-md px-xs font-data-md font-medium text-[14px] leading-[1.2] tracking-widest uppercase text-on-surface placeholder:text-on-surface-variant/20 focus:outline-none focus:border-primary transition-all duration-300`}
                id="full-name"
                placeholder="ALEXANDER VANE"
                type="text"
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-destructive text-[11px] mt-xs font-body-sm normal-case">{errors.name.message}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-caps font-semibold text-[12px] text-on-surface-variant/70 uppercase tracking-widest" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <input
                {...register('email')}
                className={`w-full bg-surface-container-highest/30 border-b ${errors.email ? 'border-destructive' : 'border-outline-variant/30'} py-md px-xs font-data-md font-medium text-[14px] leading-[1.2] tracking-widest uppercase text-on-surface placeholder:text-on-surface-variant/20 focus:outline-none focus:border-primary transition-all duration-300`}
                id="email"
                placeholder="ARCHIVE@CATALOG.IO"
                type="email"
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-destructive text-[11px] mt-xs font-body-sm normal-case">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password Field & Strength */}
          <div className="flex flex-col gap-sm">
            <div className="flex justify-between items-end">
              <label className="font-label-caps font-semibold text-[12px] text-on-surface-variant/70 uppercase tracking-widest" htmlFor="password">
                Security Key
              </label>
              <span className="font-data-md font-medium text-[10px] uppercase" style={{ color: strengthColor }}>
                {strengthText}
              </span>
            </div>
            <div className="relative group">
              <input
                {...register('password')}
                className={`w-full bg-surface-container-highest/30 border-b ${errors.password ? 'border-destructive' : 'border-outline-variant/30'} py-md px-xs font-data-md font-medium text-[14px] leading-[1.2] tracking-[0.2em] text-on-surface placeholder:text-on-surface-variant/20 focus:outline-none focus:border-primary transition-all duration-300 pr-12`}
                id="password"
                placeholder="••••••••••••"
                type={showPassword ? 'text' : 'password'}
                disabled={isPending}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              
              {/* Brass Progress Bar Container */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-surface-container-highest overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_8px_rgba(232,192,134,0.4)]"
                  style={{ width: strengthWidth }}
                ></div>
              </div>
            </div>
            {errors.password && (
              <p className="text-destructive text-[11px] font-body-sm normal-case">{errors.password.message}</p>
            )}
            <p className="font-body-sm text-[11px] text-outline-variant italic leading-relaxed">
              Ensure your key includes at least 8 characters with varied archetypes.
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-caps font-semibold text-[12px] text-on-surface-variant/70 uppercase tracking-widest" htmlFor="confirmPassword">
              Confirm Security Key
            </label>
            <div className="relative group">
              <input
                {...register('confirmPassword')}
                className={`w-full bg-surface-container-highest/30 border-b ${errors.confirmPassword ? 'border-destructive' : 'border-outline-variant/30'} py-md px-xs font-data-md font-medium text-[14px] leading-[1.2] tracking-[0.2em] text-on-surface placeholder:text-on-surface-variant/20 focus:outline-none focus:border-primary transition-all duration-300 pr-12`}
                id="confirmPassword"
                placeholder="••••••••••••"
                type={showConfirmPassword ? 'text' : 'password'}
                disabled={isPending}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              
              {!errors.confirmPassword && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-surface-container-highest overflow-hidden">
                   <div className="h-full bg-primary w-0 transition-all duration-500 group-focus-within:w-full shadow-[0_0_8px_rgba(232,192,134,0.4)]"></div>
                </div>
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-[11px] font-body-sm normal-case">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-md pt-md">
            <button
              disabled={isPending}
              className="group relative w-full bg-primary py-lg flex items-center justify-center overflow-hidden hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
            >
              {!isPending && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              )}
              {isPending ? (
                <Loader2 className="animate-spin relative z-10 text-on-primary" size={18} />
              ) : (
                <span className="font-label-caps font-semibold text-[12px] text-on-primary tracking-widest uppercase">Create Account</span>
              )}
            </button>
            <Link className="group flex items-center justify-center gap-sm py-sm opacity-60 hover:opacity-100 transition-opacity" href="/login">
              <span className="font-body-sm text-[14px] leading-[1.5] text-on-surface">Already have an account?</span>
              <span className="font-label-caps font-semibold text-[12px] leading-[1.0] text-primary border-b border-primary/0 group-hover:border-primary/40 transition-all uppercase tracking-widest">Login</span>
            </Link>
          </div>
        </form>
        
        {/* Footer Metadata */}
        <div className="mt-lg pt-lg border-t border-outline-variant/10 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-label-caps font-semibold text-[10px] text-outline-variant uppercase tracking-widest">Vault Security</span>
            <span className="font-data-md font-medium text-[10px] text-outline tracking-widest">AES-256 ENCRYPTED</span>
          </div>
          <div className="h-8 w-[1px] bg-outline-variant/20"></div>
          <div className="flex flex-col text-right">
            <span className="font-label-caps font-semibold text-[10px] text-outline-variant uppercase tracking-widest">Protocol</span>
            <span className="font-data-md font-medium text-[10px] text-outline tracking-widest">v4.0.2-ALPHA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
