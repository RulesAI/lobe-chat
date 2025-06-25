'use client';

import { useTheme } from 'antd-style';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, Suspense, memo, useState, useEffect } from 'react';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { Flexbox } from 'react-layout-kit';

import { isDesktop } from '@/const/version';
import { BANNER_HEIGHT } from '@/features/AlertBanner/CloudBanner';
import TitleBar, { TITLE_BAR_HEIGHT } from '@/features/ElectronTitlebar';
import HotkeyHelperPanel from '@/features/HotkeyHelperPanel';
import { usePlatform } from '@/hooks/usePlatform';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { HotkeyScopeEnum } from '@/types/hotkey';
import { SettingOutlined, BellOutlined } from '@ant-design/icons';

import RegisterHotkeys from './RegisterHotkeys';
import SideBar from './SideBar';
import S from './index.module.css'

const pathnameMap = {
  '/home': '首页',
  '/projectmanage': '项目管理',
  '/filemanage': '方案文档管理',
  '/rulesmanage': '审核规则管理',
  '/reportmanage': '审核报告管理',
  '/overmanage': '方案归档',
  '/settingmanage': '系统设置',
}
const CloudBanner = dynamic(() => import('@/features/AlertBanner/CloudBanner'));

const Layout = memo<PropsWithChildren>(({ children }) => {
  const { isPWA } = usePlatform();
  const theme = useTheme();

  const pathname = usePathname();
  const [pageName, setPageName] = useState('')
  const { showCloudPromotion } = useServerConfigStore(featureFlagsSelectors);

  // setting page not show sidebar
  const hideSideBar = isDesktop && pathname.startsWith('/settings');
  console.log('isDesktop', isDesktop)
  useEffect(() => {
         console.log('当前路径:', pathname);
     const currentName =  pathnameMap[pathname] || ''
     setPageName(currentName)
  }, [pathname])
  return (
    <HotkeysProvider initiallyActiveScopes={[HotkeyScopeEnum.Global]}>
      {isDesktop && <TitleBar />}
      {showCloudPromotion && <CloudBanner />}
      <Flexbox
        height={
          isDesktop
            ? `calc(100% - ${TITLE_BAR_HEIGHT}px)`
            : showCloudPromotion
              ? `calc(100% - ${BANNER_HEIGHT}px)`
              : '100%'
        }
        horizontal
        style={{
          borderTop: isPWA ? `1px solid ${theme.colorBorder}` : undefined,
          position: 'relative',
        }}
        width={'100%'}
      >
        {!hideSideBar && <SideBar />}
        {isDesktop ? (
          <Flexbox
            style={{
              background: theme.colorBgLayout,
              borderInlineStart: `1px solid ${theme.colorBorderSecondary}`,
              borderStartStartRadius: !hideSideBar ? 12 : undefined,
              borderTop: `1px solid ${theme.colorBorderSecondary}`,
              overflow: 'hidden',
            }}
            width={'100%'}
          >
            {children}
          </Flexbox>
        ) : (
          <div>
          <div className={S.rightHeader}>
            <div className={S.headerTitle}>{pageName}</div>
            <div className={S.btns}>
              <BellOutlined />
              <SettingOutlined />
            </div>
          </div>
          <div>{children}</div>
          </div>
        )}
      </Flexbox>
      <HotkeyHelperPanel />
      <Suspense>
        <RegisterHotkeys />
      </Suspense>
    </HotkeysProvider>
  );
});

Layout.displayName = 'DesktopMainLayout';

export default Layout;
