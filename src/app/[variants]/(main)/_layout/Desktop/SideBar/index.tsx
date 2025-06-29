'use client';

// import { SideNav } from '@lobehub/ui';
// import { useTheme } from 'antd-style';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { memo } from 'react';

// import { isDesktop } from '@/const/version';
import { useActiveTabKey } from '@/hooks/useActiveTabKey';
import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';

// import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';

// import Avatar from './Avatar';
import BottomActions from './BottomActions';
import MenuCom from './Menu';
// import PinList from './PinList';
import TopActions from './TopActions';
// import { electronStylish } from '@/styles/electron';
// import { Layout, Menu, Button } from 'antd';
import S from './index.module.css';

const Top = () => {
  const [isPinned] = useQueryState('pinned', parseAsBoolean);
  const sidebarKey = useActiveTabKey();

  return <TopActions isPinned={isPinned} tab={sidebarKey} />;
};

const Mid = () => {
  const [isPinned] = useQueryState('pinned', parseAsBoolean);
  const sidebarKey = useActiveTabKey();

  return <MenuCom isPinned={isPinned} tab={sidebarKey} />;
};

const Bottom = () => {
  const [isPinned] = useQueryState('pinned', parseAsBoolean);
  const sidebarKey = useActiveTabKey();

  return <BottomActions isPinned={isPinned} tab={sidebarKey} />;
};

const Nav = memo(() => {
  // const theme = useTheme();
  const inZenMode = useGlobalStore(systemStatusSelectors.inZenMode);
  // const { showPinList } = useServerConfigStore(featureFlagsSelectors);

  return (
    !inZenMode && (
      <div className={S.sideBar}>
        <Top />
        <Mid />
        <Bottom />
      </div>
    )
  );
});

Nav.displayName = 'DesktopNav';

export default Nav;
