'use client';

import {
  CloseOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Alert, Button, Empty, Input, Modal, Select, Table, Tag, Upload, message } from 'antd';
import type { TableColumnsType, TableProps, UploadProps } from 'antd';
import dayjs from 'dayjs';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { PropsWithChildren, memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';

import S from './Container.module.css';

const { Dragger } = Upload;

const prefix = process.env.NODE_ENV === 'development' ? '/v1' : 'http://47.97.196.187/v1';
const appKeys = {
  add: 'app-Oivgs57jN99aN5gom2En6zEv', // 新增数据
  list: 'app-bpadaLHXns2gkndULnYQRQc1', // 列表
  // run: 'app-i8KtVm3QpZDPyLERlNc9ujB5', // 上传和审核
  run: 'app-t5X8Caxj9Zw20CW4fuPEPG4f',
};
// const prefix = 'http://aitest.yrules.com/v1';
// const headers = {
//   Authorization: 'Bearer app-t5X8Caxj9Zw20CW4fuPEPG4f',
// };
const user = 'lixiumin';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  address: any;
  age: any;
  key: any;
  name: any;
}

// const dataSource = Array.from<DataType>({ length: 4 }).map<DataType>((_, i) => ({
//   address: i,
//   age: '2025-06-24',
//   key: i,
//   name: `大数据中心项目可行性方案 ${i}`,
// }));
const Container = memo<PropsWithChildren>(() => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [reportWidth, setReportWidth] = useState(0);
  const [currentUploadObj, setCurrentUploadObj] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [fileList, setFileList] = useState([]);
  const [current, setCurrent] = useState<any>(null);
  const [detail, setDetail] = useState<any>({});
  const [md, setMd] = useState<any>('');
  console.log('current', current);

  const props: UploadProps = {
    action: prefix + '/files/upload',
    data: {
      user,
    },
    fileList,
    headers: {
      Authorization: `Bearer ${appKeys.run}`,
    },
    maxCount: 1,
    multiple: false,
    name: 'file',
    onChange(info) {
      console.log('info', info);
      setFileList(info.fileList as any);
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.log('上传成功，返回数据:', info.file.response);
        const obj = info.file.response;
        setCurrentUploadObj(obj);
        message.success(`${info.file.name} 文件上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const columns: TableColumnsType<DataType> = [
    { dataIndex: 'file_name', title: '方案名称' },
    {
      dataIndex: 'upload_time',
      render: (value) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
      title: '文件上传时间',
    },
    {
      dataIndex: 'status',
      render: (value) => {
        return <Tag color="orange">{value}</Tag>;
      },
      title: '文档审核状态',
    },
    {
      dataIndex: 'address2',
      render: (value, record) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return <EyeOutlined onClick={() => openLeft(record)} />;
      },
      title: '审核报告',
    },
    //   { title: '操作', dataIndex: 'address3', render: (value, record, index) => {
    //   return <Button type='link'>开始审核</Button>
    // } },
  ];
  const onSelectChange = (newSelectedRowKeys: any[]) => {
    console.log('selectedRowKeys changed:', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    onChange: onSelectChange,
    selectedRowKeys,
  };

  const handleCancel = () => {
    setFileList([]);
    setCurrentUploadObj(null);
    setOpen(false);
  };
  const getList = async () => {
    // const list = Array.from<DataType>({ length: 4 }).map<DataType>((_, i) => ({
    //   address: i,
    //   age: '2025-06-24',
    //   key: i,
    //   name: `大数据中心项目可行性方案 ${i}`,
    // }));
    // setList(list);
    // return;
    const postData = {
      inputs: {
        query: 'select * from mysql1.file',
      },
      response_mode: 'blocking',
      user,
    };
    try {
      const res = await fetch(`${prefix}/workflows/run`, {
        body: JSON.stringify(postData),
        headers: {
          'Authorization': `Bearer ${appKeys.list}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      console.log('执行结果', res);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      console.log('获取列表', result);
      const listData = result?.data?.outputs?.text?.[0].result;
      setList(listData);
    } catch (err) {
      console.log('Error', err);
    }
  };
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const runWork = async () => {
    if (!currentUploadObj) return;
    // const fileId = '05d00a0e-4324-49f9-8d7d-8616b8016eb3';
    console.log('执行工作流');
    const postData = {
      inputs: {
        file: [],
        file_id: currentUploadObj.id,
        id: currentUploadObj.id,
        name: currentUploadObj.name,
        project_name: '测试项目',
        transfer_method: 'local_file',
        type: 'document',
        upload_file_id: currentUploadObj.id,
      },
      project_name: '测试项目',
      response_mode: 'blocking',
      user,
    };
    try {
      message.success('文档开始审核');
      setOpen(false);
      // getList();
      const res = await fetch(`${prefix}/workflows/run`, {
        body: JSON.stringify(postData),
        headers: {
          'Authorization': `Bearer ${appKeys.run}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      console.log('执行结果', res);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // const result = await res.json();
      // console.log('Success:', result);
    } catch (err) {
      console.log('Error', err);
    }
  };

  const add = async () => {
    if (!currentUploadObj) return;
    // const list = Array.from<DataType>({ length: 4 }).map<DataType>((_, i) => ({
    //   address: i,
    //   age: '2025-06-24',
    //   key: i,
    //   name: `大数据中心项目可行性方案 ${i}`,
    // }));
    // setList(list);
    // return;
    const postData = {
      inputs: {
        created_at: '2025-06-29',
        id: currentUploadObj.id,
        name: currentUploadObj.name,
      },
      // id: currentUploadObj.id,
      // name: currentUploadObj.name,
      response_mode: 'blocking',
      user,
    };
    try {
      const res = await fetch(`${prefix}/workflows/run`, {
        body: JSON.stringify(postData),
        headers: {
          'Authorization': `Bearer ${appKeys.add}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      console.log('添加数据执行结果', res);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // 去审核
      runWork();
    } catch (err) {
      console.log('Error', err);
    }
  };

  const openLeft = async (record: any) => {
    setCurrent(record);
    console.log('record', record);
    if (record.review_summary) {
      const detailData = JSON.parse(record.review_summary);
      console.log('detailData', detailData);
      setDetail(detailData);
    } else {
      setDetail({});
    }
    if (record.review_report) {
      //       const str = `![mahua](mahua-logo.jpg)
      // ##MaHua是什么?
      // 一个在线编辑markdown文档的编辑器

      // ##MaHua有哪些功能？
      // * 方便的导入导出功能
      //     *  直接把一个markdown的文本文件拖放到当前这个页面就可以了
      //     *  导出为一个html格式的文件，样式一点也不会丢失
      // * 所有选项自动记忆
      // ##有问题反馈
      // 在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流
      // * 邮件(dev.hubo#gmail.com, 把#换成@)
      // * 微信:jserme
      // * weibo: [@草依山](http://weibo.com/ihubo)
      // * twitter: [@ihubo](http://twitter.com/ihubo)
      // ##捐助开发者
      // ##感激
      // 感谢以下的项目,排名不分先后
      // * [ace](http://ace.ajax.org/)
      // * [jquery](http://jquery.com)
      // ##关于作者
      // `;
      //       const mdxSource = await serialize(str);
      //       console.log('mdxSource', mdxSource);
      //       const str = `## Table of Contents

      // - [Fork the Repository](#fork-the-repository)
      // - [Clone Your Fork](#clone-your-fork)
      // - [Create a New Branch](#create-a-new-branch)
      // - [Code Like a Wizard](#code-like-a-wizard)
      // - [Committing Your Work](#committing-your-work)
      // - [Sync with Upstream](#sync-with-upstream)
      // - [Open a Pull Request](#open-a-pull-request)
      // - [Review and Collaboration](#review-and-collaboration)
      // - [Celebrate 🎉](#celebrate-)`;
      const str = record.review_report;
      const mdxSource = await serialize(str);
      setMd(mdxSource);
    } else {
      setMd('');
    }
    setWidth(400);
  };

  useEffect(() => {
    getList();
  }, []);
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
                <Button className={S.primaryColor} onClick={() => getList()} type="primary">
                  刷新
                </Button>
                <Button type="text">批量导出</Button>
              </div>
              <Button
                className={S.primaryColor}
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
                type="primary"
              >
                上传方案文档
              </Button>
            </div>
            <div className={S.tableBox}>
              <div className={S.filter}>
                <Input
                  placeholder="请输入方案名称"
                  prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
                <Select
                  className={S.filterSelect}
                  defaultValue="jack"
                  options={[
                    { label: '全部状态', value: 'jack' },
                    { label: '未审核', value: 'lucy' },
                    { label: '已校验', value: 'Yiminghe' },
                    { label: '有告警', value: 'Yiminghe2' },
                  ]}
                  style={{ width: 120 }}
                />
                <Button type="text">重置</Button>
                <Button type="text">删除</Button>
              </div>
              <Table<DataType>
                columns={columns}
                dataSource={list}
                rowKey={(record: any) => record.id}
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
              className={S.drawerClose}
              icon={<CloseOutlined />}
              onClick={() => {
                setWidth(0);
                setReportWidth(0);
              }}
              shape="circle"
            />
            {/* <CloseCircleOutlined className={S.drawerClose} onClick={() => setWidth(0)} /> */}
          </div>
          <div className={S.drawerContent}>
            {detail['基本信息'] ? (
              <div className={S.baseInfo}>
                <div className={S.infoTitle}>基本信息</div>

                {Object.keys(detail['基本信息']).map((key, index) => (
                  <div className={S.infoItem} key={index}>
                    <div className={S.label}>{key}</div>
                    <div className={S.value}>{detail['基本信息'][key]}</div>
                  </div>
                ))}
                {/* <div className={S.infoItem}>
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
              </div> */}
              </div>
            ) : (
              <Empty style={{ marginTop: 100 }} />
            )}
            {detail['审核概览'] && (
              <>
                <div className={S.title}>审核概览</div>
                <div className={S.overview}>
                  <div className={S.percent}>{detail['审核概览']['整体通过率'] || '--'}</div>
                  <div>整体通过率</div>
                </div>
                <div className={S.alert}>
                  <Alert
                    action={
                      <Button size="small" type="text">
                        {detail['问题统计']['严重问题'] || 0}
                      </Button>
                    }
                    className={S.dangerColor}
                    message="严重问题"
                    type="error"
                  />
                </div>
                <div className={S.alert}>
                  <Alert
                    action={
                      <Button size="small" type="text">
                        {detail['问题统计']['警告问题'] || 0}
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
                        {detail['问题统计']['建议优化'] || 0}
                      </Button>
                    }
                    className={S.infoColor}
                    message="建议优化"
                    type="info"
                  />
                </div>
              </>
            )}
            {detail['问题详情'] && (
              <>
                <div className={S.title}>问题详情</div>
                {detail['问题详情'].map((i: any, index: any) => (
                  <div className={S.alert} key={index}>
                    <Alert
                      className={S.dangerColor}
                      message={
                        <div className={S.alertContent}>
                          {/* <div className={S.alertItem1}>不予立项核验</div> */}
                          <div className={S.alertItem1}>{i['描述']}</div>
                          <div className={S.alertItem1}>位置：{i['位置']}</div>
                        </div>
                      }
                      type={
                        i['类型'] === '严重问题'
                          ? 'error'
                          : i['类型'] === '警告问题'
                            ? 'warning'
                            : 'info'
                      }
                    />
                  </div>
                ))}
              </>
            )}
            {/* <div className={S.alert}>
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
            </div> */}
            {detail['基本信息'] && (
              <>
                <div className={S.bigBtn}>
                  <Button
                    block
                    className={S.primaryColor}
                    onClick={() => setReportWidth(400)}
                    type="primary"
                  >
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
              </>
            )}
          </div>
        </div>
        <div
          className={S.drawer}
          style={{
            width: reportWidth,
          }}
        >
          <div className={S.drawerHeader}>
            <div>审核报告</div>
            <Button
              className={S.drawerClose}
              icon={<CloseOutlined />}
              onClick={() => setReportWidth(0)}
              shape="circle"
            />
            {/* <CloseCircleOutlined className={S.drawerClose} onClick={() => setWidth(0)} /> */}
          </div>
          <div className={S.drawerContent}>
            {current && current.review_report && md ? (
              <MDXRemote {...md} />
            ) : (
              <Empty style={{ marginTop: 100 }} />
            )}
          </div>
        </div>
      </div>
      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        footer={
          <div className={S.modalFooter}>
            <Button onClick={handleCancel}>取消</Button>
            <Button
              className={S.primaryColor}
              disabled={!currentUploadObj}
              onClick={() => add()}
              style={{ marginLeft: 16 }}
              type="primary"
            >
              开始审核
            </Button>
          </div>
        }
        open={open}
        title="文档上传"
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
