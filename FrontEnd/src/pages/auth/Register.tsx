import React from 'react';
import { Helmet } from 'src/components/base/helmet';
import { AuthLayout } from './AuthLayout';
import { RegisterForm } from './RegisterForm';

function PageContent(): React.JSX.Element {
  return (
    <>
      <Helmet heading="Registrarse" />
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </>
  );
}

export default function Page(): React.JSX.Element {
  return <PageContent />;
}
