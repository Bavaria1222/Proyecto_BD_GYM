import React from 'react';
import { Helmet } from 'src/components/base/helmet';
import { AuthLayout } from './AuthLayout';
import { LoginForm } from './RegisterForm';

function PageContent(): React.JSX.Element {
  return (
    <>
      <Helmet heading="Registrarse" />
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
}

export default function Page(): React.JSX.Element {
  return <PageContent />;
}
