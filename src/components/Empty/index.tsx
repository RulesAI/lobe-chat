import { Empty } from 'antd';

import S from './index.module.css';

const EmptyComp = () => {
  return (
    <div className={S.empty}>
      <Empty description="开发中，敬请期待！" />
    </div>
  );
};

export default EmptyComp;
