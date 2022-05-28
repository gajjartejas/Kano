import React from 'react';
const svgIconForName = (name: string) => {
  switch (name) {
    case 'ic_intro.svg':
      return () => React.lazy(() => import(`app/assets/svgs/ic_intro.svg`));

    case 'ic_consonants.svg':
      return () => React.lazy(() => import(`app/assets/svgs/ic_consonants.svg`));

    case 'ic_barakhadi.svg':
      return () => React.lazy(() => import(`app/assets/svgs/ic_barakhadi.svg`));

    default:
      return () => React.lazy(() => import(`app/assets/svgs/ic_intro.svg`));
  }
};
export default svgIconForName;
