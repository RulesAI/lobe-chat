'use client';

import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tooltip, theme } from 'antd';
import { PropsWithChildren, memo } from 'react';

import Header from '@/components/Header';

import S from './Container.module.css';

const Container = memo<PropsWithChildren>(() => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const { colorPrimary } = token;
  return (
    <div className={S.content}>
      <div className={S.leftContent}>
        <Header />
        <div className={S.mainContent}>
          {/* <Empty /> */}
          <div className={S.title} style={{ color: colorPrimary }}>
            智能检索审核报告，一键获取历史记录
          </div>
          <Form className={S.form} form={form} name="control-hooks">
            <Form.Item name="note">
              <Input
                placeholder="请描述您要查询的审核报告，如：项目名称、时间范围、审核类型等"
                style={{ fontSize: 20, height: 70, marginTop: 70 }}
                suffix={
                  <Tooltip title="搜索">
                    <Button
                      icon={
                        <div style={{ transform: 'rotate(-90deg)' }}>
                          <SendOutlined />
                        </div>
                      }
                      shape="circle"
                      style={{ fontSize: 20, height: 40, width: 40 }}
                      type="primary"
                    />
                  </Tooltip>
                }
              />
            </Form.Item>
          </Form>
          <div className={S.tip}>按 Ctrl + Enter 快速发送</div>
        </div>
      </div>
    </div>
  );
});

export default Container;
