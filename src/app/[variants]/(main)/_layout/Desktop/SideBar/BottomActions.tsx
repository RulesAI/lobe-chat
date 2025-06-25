// import { ActionIcon, ActionIconProps } from '@lobehub/ui';
// import { Compass, FolderClosed, MessageSquare } from 'lucide-react';
// import Link from 'next/link';
import { memo } from 'react';
// import { Flexbox } from 'react-layout-kit';

import { SidebarTabKey } from '@/store/global/initialState';
import { UserOutlined } from '@ant-design/icons';
import S from './BottomActions.module.css'


export interface TopActionProps {
  isPinned?: boolean | null;
  tab?: SidebarTabKey;
}

const BottomActions = memo<TopActionProps>(() => {

  return (
      <div className={S.bottom}>
        <div className={S.iconBox} style={{ background: '#0072f5' }}><UserOutlined style={{ color: '#fff' }} /></div>
        <div className={S.userInfo}>
          <div className={S.username}>管理员</div>
          <div className={S.useracount}>admin@demo.com</div>
        </div>
      </div>
  );
});

export default BottomActions;
