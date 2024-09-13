import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { CircularView } from 'src/sections/circular/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Circular - ${CONFIG.appName}`}</title>
      </Helmet>

      <CircularView />
    </>
  );
}
