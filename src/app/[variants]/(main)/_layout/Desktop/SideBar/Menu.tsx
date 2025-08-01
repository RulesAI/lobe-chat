// import { ActionIcon, ActionIconProps } from '@lobehub/ui';
// import { Compass, FolderClosed, MessageSquare } from 'lucide-react';
// import Link from 'next/link';
import {
  DeploymentUnitOutlined,
  FileDoneOutlined,
  FolderOutlined,
  HomeOutlined,
  ProfileOutlined,
  ProjectOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import { SetStateAction, memo, useEffect, useState } from 'react';

import { useQueryRoute } from '@/hooks/useQueryRoute';
// import { Flexbox } from 'react-layout-kit';

import { SidebarTabKey } from '@/store/global/initialState';

import S from './Menu.module.css';

export interface TopActionProps {
  tab?: SidebarTabKey;
}

const items: any[] = [
  {
    children: ['/chat'],
    icon: <HomeOutlined />,
    key: '1',
    label: '首页',
    path: '/home',
  },
  {
    icon: <ProjectOutlined />,
    key: '2',
    label: '项目管理',
    path: '/projectmanage',
  },
  {
    icon: <ProfileOutlined />,
    key: '3',
    label: '方案文档管理',
    path: '/filemanage',
  },
  {
    icon: <DeploymentUnitOutlined />,
    key: '4',
    label: '审核规则管理',
    path: '/rulesmanage',
  },
  {
    icon: <FileDoneOutlined />,
    key: '5',
    label: '审核报告管理',
    path: '/reportmanage',
  },
  {
    icon: <FolderOutlined />,
    key: '6',
    label: '知识库管理',
    path: '/knowledgemanage',
  },
  {
    icon: <SettingOutlined />,
    key: '7',
    label: '系统设置',
    path: '/settingmanage',
  },
];

const TopActions = memo<TopActionProps>(() => {
  const pathname = usePathname();
  const router = useQueryRoute();
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onClick: any = (e: { key: SetStateAction<string>; path: string }) => {
    console.log('click', e);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setCurrentKey(e.key);
    router.push(e.path);
  };

  const [currentKey, setCurrentKey] = useState('3');

  useEffect(() => {
    const current = items.find(
      (i) => i.path === pathname || (i.children && i.children.includes(pathname)),
    );
    if (current) {
      setCurrentKey(current.key);
    }
  }, [pathname]);

  return (
    <div>
      {/* <Menu
      defaultSelectedKeys={['3']}
      items={items}
      mode="inline"
      onClick={onClick}
      style={{ backgroundColor: '#F8F8F8' }}
      theme="light"
    />
            </ConfigProvider> */}
      {items.map((i) => (
        <div
          className={`${S.menuItem} ${currentKey === i.key ? S.selected : ''}`}
          key={i.key}
          onClick={() => onClick(i)}
        >
          {i.icon && <div className={S.menuIcon}>{i.icon}</div>}
          <div className={S.menuName}>{i.label}</div>
        </div>
      ))}
    </div>
  );
});

export default TopActions;
