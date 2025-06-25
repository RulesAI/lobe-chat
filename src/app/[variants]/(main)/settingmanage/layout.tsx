import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { serverFeatureFlags } from '@/config/featureFlags';

export default ({ children }: PropsWithChildren) => {
  const enableKnowledgeBase = serverFeatureFlags().enableKnowledgeBase;

  if (!enableKnowledgeBase) return notFound();

  return <div>系统设置</div>;
};
