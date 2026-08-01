import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata = {
  title: 'Login - Catalog Music Insights',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-md bg-background">
      <div className="w-full max-w-lg">
        <LoginForm />
      </div>
    </main>
  );
}
