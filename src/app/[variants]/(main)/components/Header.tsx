import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import S from './header.module.css';

const pathnameMap = {
  '/filemanage': '方案文档管理',
  '/home': '首页',
  '/overmanage': '方案归档',
  '/projectmanage': '项目管理',
  '/reportmanage': '审核报告管理',
  '/rulesmanage': '审核规则管理',
  '/settingmanage': '系统设置',
};
const Header = () => {
  const pathname = usePathname();
  const [pageName, setPageName] = useState('');
  useEffect(() => {
    console.log('当前路径:', pathname);
    // @ts-ignore
    const currentName = pathnameMap[pathname] || '';
    setPageName(currentName);
  }, [pathname]);
  return (
    <div className={S.rightHeader}>
      <div className={S.headerTitle}>{pageName}</div>
      <div className={S.btns}>
        <BellOutlined />
        <SettingOutlined />
      </div>
    </div>
  );
};

export default Header;
