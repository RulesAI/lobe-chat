import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

// import S from './layout.module.css'
// import { Button, Table } from 'antd'
// import { PlusOutlined } from '@ant-design/icons';
// import type { TableColumnsType, TableProps } from 'antd';

import { serverFeatureFlags } from '@/config/featureFlags';

// type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const columns: TableColumnsType<DataType> = [
//   { title: 'Name', dataIndex: 'name' },
//   { title: 'Age', dataIndex: 'age' },
//   { title: 'Address', dataIndex: 'address' },
// ];

// const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
//   key: i,
//   name: `Edward King ${i}`,
//   age: 32,
//   address: `London, Park Lane no. ${i}`,
// }));

// const selectedRowKeys = []

export default ({ children }: PropsWithChildren) => {
  console.log('进来filemanage的页面');
  const enableKnowledgeBase = serverFeatureFlags().enableKnowledgeBase;
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [loading, setLoading] = useState(false);
  if (!enableKnowledgeBase) return notFound();

  return children;

  //   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   // setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection: TableRowSelection<DataType> = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  // const hasSelected = selectedRowKeys.length > 0;

  // return <div className={S.content}>
  //   <div className={S.tip}>参考数据模板及数据格式要求，准备并上传您的方案文档，文档质量直接影响审核效果。<span style={{color: '#0072f5' }}>查看示例文档</span></div>
  //   <div className={S.btns}>
  //     <div className={S.left}>
  //     <Button>开始审核</Button>
  //     <Button type="text">批量导出</Button>
  //     </div>
  //     <Button icon={<PlusOutlined  />}>上传方案文档</Button>
  //   </div>
  //   <div>
  //     <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
  //   </div>
  // </div>;
};
