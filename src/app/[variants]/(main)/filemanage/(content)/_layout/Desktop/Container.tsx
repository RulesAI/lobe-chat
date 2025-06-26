'use client';

import {
  CloseOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Alert, Button, Input, Modal, Select, Table, Tag, Upload, message } from 'antd';
import type { TableColumnsType, TableProps, UploadProps } from 'antd';
import { useTheme } from 'antd-style';
import { PropsWithChildren, memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Header from '../../../../components/Header';
import S from './Container.module.css';

const { Dragger } = Upload;

const props: UploadProps = {
  action:
    process.env.NODE_ENV === 'development'
      ? '/api/files/upload'
      : 'http://ai.yrules.com/v1/files/upload',
  headers: {
    Authorization: 'Bearer app-i8KtVm3QpZDPyLERlNc9ujB5',
  },
  data: {
    user: 'lixiumin',
  },
  multiple: false,
  name: 'file',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

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
  const [width, setWidth] = useState(0);

  const columns: TableColumnsType<DataType> = [
    { title: '方案名称', dataIndex: 'name' },
    { title: '文件上传时间', dataIndex: 'age' },
    {
      title: '文档审核状态',
      dataIndex: 'address',
      render: (value, record, index) => {
        return <Tag color="orange">有警告</Tag>;
      },
    },
    {
      title: '审核报告',
      dataIndex: 'address2',
      render: (value, record, index) => {
        return <EyeOutlined onClick={() => setWidth(400)} />;
      },
    },
    //   { title: '操作', dataIndex: 'address3', render: (value, record, index) => {
    //   return <Button type='link'>开始审核</Button>
    // } },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    console.log('开始审核');
  };
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
        <div className={S.leftContent}>
          <Header />
          <div className={S.tableContent}>
            <div className={S.tip}>
              参考数据模板及数据格式要求，准备并上传您的方案文档，文档质量直接影响审核效果。
              <span style={{ color: '#0072f5' }}>查看示例文档</span>
            </div>
            <div className={S.btns}>
              <div className={S.left}>
                <Button className={S.primaryColor} type="primary">
                  开始审核
                </Button>
                <Button type="text">批量导出</Button>
              </div>
              <Button
                className={S.primaryColor}
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
              >
                上传方案文档
              </Button>
            </div>
            <div className={S.tableBox}>
              <div className={S.filter}>
                <Input
                  prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入方案名称"
                />
                <Select
                  defaultValue="jack"
                  style={{ width: 120 }}
                  className={S.filterSelect}
                  options={[
                    { value: 'jack', label: '全部状态' },
                    { value: 'lucy', label: '未审核' },
                    { value: 'Yiminghe', label: '已校验' },
                    { value: 'Yiminghe2', label: '有告警' },
                  ]}
                />
                <Button type="text">重置</Button>
                <Button type="text">删除</Button>
              </div>
              <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                rowSelection={rowSelection}
              />
            </div>
          </div>
        </div>
        <div
          className={S.drawer}
          style={{
            width,
          }}
        >
          <div className={S.drawerHeader}>
            <div>数据集详情</div>
            <Button
              shape="circle"
              icon={<CloseOutlined />}
              className={S.drawerClose}
              onClick={() => setWidth(0)}
            />
            {/* <CloseCircleOutlined className={S.drawerClose} onClick={() => setWidth(0)} /> */}
          </div>
          <div className={S.drawerContent}>
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
            <div className={S.alert}>
              <Alert
                className={S.dangerColor}
                action={
                  <Button size="small" type="text">
                    0
                  </Button>
                }
                message="严重问题"
                type="error"
              />
            </div>
            <div className={S.alert}>
              <Alert
                action={
                  <Button size="small" type="text">
                    2
                  </Button>
                }
                className={S.warningColor}
                message="警告问题"
                type="warning"
              />
            </div>
            <div className={S.alert}>
              <Alert
                action={
                  <Button size="small" type="text">
                    3
                  </Button>
                }
                className={S.infoColor}
                message="建议优化"
                type="info"
              />
            </div>
            <div className={S.title}>问题详情</div>
            <div className={S.alert}>
              <Alert
                className={S.dangerColor}
                message={
                  <div className={S.alertContent}>
                    <div className={S.alertItem1}>不予立项核验</div>
                    <div className={S.alertItem1}>文档中提及新建机房，违法不予立项条款</div>
                    <div className={S.alertItem1}>位置：第36页</div>
                  </div>
                }
                type="error"
              />
            </div>
            <div className={S.alert}>
              <Alert
                className={S.warningColor}
                message={
                  <div className={S.alertContent}>
                    <div className={S.alertItem1}>附表齐全核验</div>
                    <div className={S.alertItem1}>缺少附表3：系统运行维护估算表</div>
                    <div className={S.alertItem1}>位置：第23页</div>
                  </div>
                }
                type="warning"
              />
            </div>
            <div className={S.alert}>
              <Alert
                className={S.infoColor}
                message={
                  <div className={S.alertContent}>
                    <div className={S.alertItem1}>信创描述优化</div>
                    <div className={S.alertItem1}>建议补充具体的信创技术方案</div>
                    <div className={S.alertItem1}>位置：第22页</div>
                  </div>
                }
                type="info"
              />
            </div>
            <div className={S.bigBtn}>
              <Button block className={S.primaryColor} type="primary">
                查看审核报告
              </Button>
            </div>
            <div className={S.bigBtn}>
              <Button block>新增版本</Button>
            </div>
            <div className={S.bigBtn}>
              <Button block danger type="primary">
                删除数据集
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="文档上传"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className={S.modalFooter}>
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" className={S.primaryColor} style={{ marginLeft: 16 }}>
              开始审核
            </Button>
          </div>
        }
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
          <p className="ant-upload-hint">上传文件成功后，点击开始审核，即可开启文档审核</p>
        </Dragger>
      </Modal>
      {/* <Drawer
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
      </Drawer> */}
    </Flexbox>
  );
});

export default Container;
