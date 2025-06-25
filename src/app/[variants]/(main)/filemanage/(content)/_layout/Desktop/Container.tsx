'use client';

import { useTheme } from 'antd-style';
import { PropsWithChildren, memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Button, Table, Tag, Drawer, Alert  } from 'antd'
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import S from './Container.module.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}


const dataSource = Array.from<DataType>({ length: 4 }).map<DataType>((_, i) => ({
  key: i,
  name: `大数据中心项目可行性方案 ${i}`,
  age: '2025-06-24',
  address: i,
}));
const Container = memo<PropsWithChildren>(({ children }) => {
  const theme = useTheme();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
 const [open, setOpen] = useState(false);

 const columns: TableColumnsType<DataType> = [
  { title: '方案名称', dataIndex: 'name' },
  { title: '文件上传时间', dataIndex: 'age' },
  { title: '文档审核状态', dataIndex: 'address', render: (value, record, index) => {
    return <Tag color='orange'>有警告</Tag>
  }},
   { title: '审核报告', dataIndex: 'address2', render: (value, record, index) => {
    return <EyeOutlined onClick={() => setOpen(true) } />
  } },
    { title: '操作', dataIndex: 'address3', render: (value, record, index) => {
    return <Button type='link'>开始审核</Button>
  } },
];
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onClose = () => {
    setOpen(false)
  }
  return (
    <Flexbox
      flex={1}
      style={{
        background: '#fff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div className={S.content}>
     <div className={S.tip}>参考数据模板及数据格式要求，准备并上传您的方案文档，文档质量直接影响审核效果。<span style={{color: '#0072f5' }}>查看示例文档</span></div>
     <div className={S.btns}>
      <div className={S.left}>
       <Button>开始审核</Button>
       <Button type="text">批量导出</Button>
      </div>
      <Button icon={<PlusOutlined  />}>上传方案文档</Button>
     </div>
    <div className={S.tableBox}>
       <Table<DataType> columns={columns} dataSource={dataSource} rowSelection={rowSelection} />
     </div>
  </div>
        <Drawer
        title="数据集详情"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
        className={S.drawer}
      >
        <div className={S.baseInfo}>
          <div className={S.infoTitle}>基本信息</div>
          <div className={S.infoItem}>
            <div className={S.label}>数据集名称：</div>
            <div className={S.value}>xxx.docx</div>
          </div>
                    <div className={S.infoItem}>
            <div className={S.label}>关联项目：</div>
            <div className={S.value}>智慧城市项目</div>
          </div>
                    <div className={S.infoItem}>
            <div className={S.label}>文件大小：</div>
            <div className={S.value}>4.1MB</div>
          </div>
                    <div className={S.infoItem}>
            <div className={S.label}>创建时间</div>
            <div className={S.value}>2025-06-24 19:04</div>
          </div>
                    <div className={S.infoItem}>
            <div className={S.label}>使用空间</div>
            <div className={S.value}>1%</div>
          </div>
        </div>
        <div className={S.title}>审核概览</div>
        <div className={S.overview}>
          <div className={S.percent}>92%</div>
          <div>整体通过率</div>
        </div>
        <div className={S.alert}>        <Alert
      message="严重问题"
      type="error"
      action={
        <Button size="small" type="text">
          0
        </Button>
      }
    /></div>
    <div className={S.alert}>            <Alert
      message="警告问题"
      type="warning"
      action={
        <Button size="small" type="text">
          2
        </Button>
      }
    /></div>
    <div className={S.alert}>            <Alert
      message="建议优化"
      type="info"
      action={
        <Button size="small" type="text">
          3
        </Button>
      }
    /></div>
            <div className={S.title}>问题详情</div>
                    <div className={S.alert}>        <Alert
      message={<div className={S.alertContent}>
        <div className={S.alertItem1}>不予立项核验</div>
         <div className={S.alertItem1}>文档中提及新建机房，违法不予立项条款</div>
          <div className={S.alertItem1}>位置：第36页</div>
      </div>}
      type="error"
    /></div>
    <div className={S.alert}>            <Alert
      message={<div className={S.alertContent}>
        <div className={S.alertItem1}>附表齐全核验</div>
         <div className={S.alertItem1}>缺少附表3：系统运行维护估算表</div>
          <div className={S.alertItem1}>位置：第23页</div>
      </div>}
      type="warning"
    /></div>
    <div className={S.alert}>            <Alert
      message={<div className={S.alertContent}>
        <div className={S.alertItem1}>信创描述优化</div>
         <div className={S.alertItem1}>建议补充具体的信创技术方案</div>
          <div className={S.alertItem1}>位置：第22页</div>
      </div>}
      type="info"
    /></div>
                  <div className={S.bigBtn}>
        <Button type="primary" block>
          导出审核报告
        </Button></div>
      <div className={S.bigBtn}>
        <Button block>
          新增版本
        </Button></div>
              <div className={S.bigBtn}>
        <Button type="primary" danger block>
          删除数据集
        </Button></div>
      </Drawer>
    </Flexbox>
  );
});

export default Container;
