// import { ActionIcon, ActionIconProps } from '@lobehub/ui';
// import { Compass, FolderClosed, MessageSquare } from 'lucide-react';
// import Link from 'next/link';
import { FileTextOutlined } from '@ant-design/icons';
import { memo } from 'react';

import { SidebarTabKey } from '@/store/global/initialState';

// import { Flexbox } from 'react-layout-kit';
import S from './TopActions.module.css';

export interface TopActionProps {
  tab?: SidebarTabKey;
}

const TopActions = memo<TopActionProps>(() => {
  return (
    <div className={S.header}>
      <div className={S.iconBox} style={{ background: '#0072f5' }}>
        <FileTextOutlined style={{ color: '#fff' }} />
      </div>
      <div className={S.headerTitle}>智能文档审核</div>
    </div>
  );
});

export default TopActions;
