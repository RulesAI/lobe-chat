import { Metadata } from 'next';

import { getCanonicalUrl } from '@/server/utils/url';

export const metadata: Metadata = {
  alternates: { canonical: getCanonicalUrl('/') },
};

console.log('执行page')
export { default } from './loading';
