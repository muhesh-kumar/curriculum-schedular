import dynamic from 'next/dynamic';
import React from 'react';

// https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr
const withNoSSR = (Component: React.FunctionComponent) => dynamic(
  () => Promise.resolve(Component),
  { ssr: false },
);

export default withNoSSR;