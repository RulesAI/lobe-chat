'use client';

import { PropsWithChildren, memo } from 'react';

import Empty from '@/components/Empty';
import Header from '@/components/Header';

import S from './Container.module.css';

const Container = memo<PropsWithChildren>(() => {
  return (
    <div className={S.content}>
      <div className={S.leftContent}>
        <Header />
        <div className={S.mainContent} style={{ marginTop: 100 }}>
          <Empty />
        </div>
      </div>
    </div>
  );
});

export default Container;
