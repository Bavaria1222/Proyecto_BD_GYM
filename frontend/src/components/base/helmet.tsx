import PropTypes from 'prop-types';
import type { FC } from 'react';
import { Helmet as Head } from 'react-helmet-async';

interface HelmetProps {
  heading?: string;
}

export const Helmet: FC<HelmetProps> = (props) => {
  const { heading } = props;

  const pageTitle = heading ? heading + ' - UIGYM' : ' UI GYM ';

  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
};

Helmet.propTypes = {
  heading: PropTypes.string,
};
