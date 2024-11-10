import React from 'react';
import { Helmet } from 'src/components/base/helmet';
import { AuthLayout } from './AuthLayout';
import { LoginForm } from './LoginForm';

function PageContent(): React.JSX.Element {
  return (
    <>
      <Helmet heading="Inicio de sesión" />
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
}

export default function Page(): React.JSX.Element {
  return <PageContent />;
}
