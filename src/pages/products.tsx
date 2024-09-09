import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>
      {/* Now this section is not need! But for next time it's may be need */}
      {/* <ProductsView /> */}
    </>
  );
}
