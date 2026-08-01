import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata = {
  title: 'Register - Catalog Music Insights',
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-md bg-background">
      <div className="w-full max-w-lg">
        <RegisterForm />
      </div>
    </main>
  );
}
