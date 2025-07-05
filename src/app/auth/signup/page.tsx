import { redirect } from 'next/navigation';
import SignUpForm from './form';
import { isSignupEnabled } from '@/lib/utils/settings';

export default async function SignUpPage() {
  const allowed = await isSignupEnabled();

  if (!allowed) {
    redirect('/auth/login');
  }

  return <SignUpForm />;
}
