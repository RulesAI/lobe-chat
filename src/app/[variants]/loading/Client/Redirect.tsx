'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';

import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';
import { useUserStore } from '@/store/user';

import { AppLoadingStage } from '../stage';

interface RedirectProps {
  setActiveStage: (value: AppLoadingStage) => void;
}

const Redirect = memo<RedirectProps>(({ setActiveStage }) => {
  const router = useRouter();
  const isUserStateInit = useUserStore((s) => s.isUserStateInit);
  console.log('isUserStateInit', isUserStateInit)

  const isPgliteNotEnabled = useGlobalStore(systemStatusSelectors.isPgliteNotEnabled);
  console.log('isPgliteNotEnabled', isPgliteNotEnabled)

  const navToChat = () => {
    setActiveStage(AppLoadingStage.GoToChat);
    router.replace('/chat');
  };

  useEffect(() => {
    // if pglite is not enabled, redirect to chat
    if (isPgliteNotEnabled) {
      console.log('去聊天页面001')
      navToChat();
      return;
    }

    // if user state not init, wait for loading
    if (!isUserStateInit) {
      setActiveStage(AppLoadingStage.InitUser);
      return;
    }
console.log('去聊天页面002')
    // finally check the conversation status
    navToChat();
  }, [isUserStateInit, isPgliteNotEnabled]);

  return null;
});

export default Redirect;
