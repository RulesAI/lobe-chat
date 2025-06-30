// import { ActionIcon, ActionIconProps } from '@lobehub/ui';
// import { Compass, FolderClosed, MessageSquare } from 'lucide-react';
// import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';
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
    icon: <HomeOutlined />,
    key: '1',
    label: '首页',
    path: '/home',
  },
  {
    key: '2',
    label: '项目管理',
    path: '/projectmanage',
  },
  {
    key: '3',
    label: '方案文档管理',
    path: '/filemanage',
  },
  {
    key: '4',
    label: '审核规则管理',
    path: '/rulesmanage',
  },
  {
    key: '5',
    label: '审核报告管理',
    path: '/reportmanage',
  },
  {
    key: '6',
    label: '方案归档',
    path: '/overmanage',
  },
  {
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
    console.log('当前路径:', pathname);
    const current = items.find((i) => i.path === pathname);
    setCurrentKey(current.key);
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
