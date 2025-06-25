import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { serverFeatureFlags } from '@/config/featureFlags';

export default ({ children }: PropsWithChildren) => {
  console.log('进来filemanage的页面')
  const enableKnowledgeBase = serverFeatureFlags().enableKnowledgeBase;

  if (!enableKnowledgeBase) return notFound();

  return <div>首页</div>;
};
