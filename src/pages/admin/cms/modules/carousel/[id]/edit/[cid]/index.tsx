import React, { FC, useEffect } from 'react';
import NewCarousel from '../../new';
import { useRouter } from 'next/router';

const EditIdCarousel: FC = () => {
  const router: any = useRouter();

  return <NewCarousel edit={true} />;
};

export default EditIdCarousel;
