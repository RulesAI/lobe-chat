'use client';

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  CloudSyncOutlined,
  EyeOutlined,
  InboxOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Alert, Button, Empty, Input, Modal, Select, Table, Tag, Upload, message } from 'antd';
import type { TableColumnsType, TableProps, UploadProps } from 'antd';
import dayjs from 'dayjs';
import { PropsWithChildren, memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import { parseMarkdown } from '@/utils/parseMarkdown';

import S from './Container.module.css';
import RuleModal from './RuleModal';
import mdxStyle from './mdx.module.css';

const { Dragger } = Upload;

const prefix = process.env.NODE_ENV === 'development' ? '/v1' : 'http://47.97.196.187/v1';
const appKeys = {
  add: 'app-Oivgs57jN99aN5gom2En6zEv', // 新增数据
  list: 'app-bpadaLHXns2gkndULnYQRQc1', // 列表
  // run: 'app-i8KtVm3QpZDPyLERlNc9ujB5', // 上传和审核
  // run: 'app-t5X8Caxj9Zw20CW4fuPEPG4f',
  run: 'app-b59h1ONl0eKIWxAC944w7EUM',
};
const user = 'lixiumin';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  action: any;
  file_name: any;
  status: any;
  upload_time: any;
}

const Container = memo<PropsWithChildren>(() => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  // const [width, setWidth] = useState(0);
  const [detailVisible, setDetailVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  // const [reportWidth, setReportWidth] = useState<string | number>(0);
  const [leftVisible, setLeftVisible] = useState(true);
  const [currentUploadObj, setCurrentUploadObj] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [fileList, setFileList] = useState([]);
  const [current, setCurrent] = useState<any>(null);
  const [detail, setDetail] = useState<any>({});
  const [md, setMd] = useState<any>('');
  const [pagination, setPagination] = useState<any>({
    showTotal: (total: any) => `共${total}条`,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [ruleModalVisible, setRuleModalVisible] = useState(false);

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

  const handleCancel = () => {
    setFileList([]);
    setCurrentUploadObj(null);
    setOpen(false);
  };
  const getList = async () => {
    setLoading(true);
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
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      const listData = result?.data?.outputs?.text?.[0].result;
      setList(listData);
      setPagination({
        ...pagination,
        total: listData.length,
      });
    } catch (err) {
      console.log('Error', err);
    } finally {
      setLoading(false);
    }
  };
  const runWork = async () => {
    if (!currentUploadObj) return;
    // const postData = {
    //   inputs: {
    //     file: currentFile,
    //     file_id: currentUploadObj.id,
    //     id: currentUploadObj.id,
    //     name: currentUploadObj.name,
    //     project_name: '测试项目',
    //     transfer_method: 'local_file',
    //     type: 'document',
    //     upload_file_id: currentUploadObj.id,
    //   },
    //   project_name: '测试项目',
    //   response_mode: 'blocking',
    //   user,
    // };
    const postData = {
      files: [],
      inputs: {
        file: [
          {
            transfer_method: 'local_file',
            type: 'document',
            upload_file_id: currentUploadObj.id,
            url: '',
          },
        ],
        file_id: currentUploadObj.id,
        project_name: currentUploadObj.id,
      },
      response_mode: 'blocking',
      user,
    };
    try {
      message.success('文档开始审核');
      setOpen(false);
      getList();
      const res = await fetch(`${prefix}/workflows/run`, {
        body: JSON.stringify(postData),
        headers: {
          'Authorization': `Bearer ${appKeys.run}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (err) {
      console.log('Error', err);
    }
  };

  const add = async () => {
    if (!currentUploadObj) return;
    const postData = {
      inputs: {
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
    if (record.review_summary) {
      const detailData = JSON.parse(record.review_summary);
      setDetail(detailData);
    } else {
      setDetail({});
    }
    if (record.review_report) {
      const str = record.review_report;
      console.log('str', str);
      try {
        // const mdStr = await convertMarkdownToMdast(str);
        // const mdxSource = await serialize(str, {
        //   mdxOptions: {
        //     remarkPlugins: [remarkGfm], // 支持表格、删除线等GitHub风格Markdown
        //   },
        //   parseFrontmatter: true,
        // });
        const mdxDom = await parseMarkdown(str);
        // // console.log('mdxStr', mdxStr);
        // const mdxSource = await serialize(mdxDom, {
        //   mdxOptions: {
        //     remarkPlugins: [remarkGfm], // 支持表格、删除线等GitHub风格Markdown
        //   },
        //   parseFrontmatter: true,
        // });
        setMd(mdxDom);
      } catch (err) {
        console.log('格式化失败', err);
        setMd('');
      }
    } else {
      setMd('');
    }
    // setWidth(400);
    setDetailVisible(true);
  };

  const getStatusDom = (status: string) => {
    let com;
    switch (status) {
      case '待审核': {
        com = (
          <Tag color="#F59E0B" icon={<ClockCircleOutlined />}>
            {status}
          </Tag>
        );
        break;
      }
      case '审核中': {
        com = (
          <Tag color="#3B82F6" icon={<CloudSyncOutlined />}>
            {status}
          </Tag>
        );
        break;
      }
      case '审核完成': {
        com = (
          <Tag color="#10B981" icon={<CheckCircleOutlined />}>
            {status}
          </Tag>
        );
        break;
      }
      default: {
        com = (
          <Tag color="#F59E0B" icon={<ClockCircleOutlined />}>
            {status}
          </Tag>
        );
        break;
      }
    }
    return com;
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
        return getStatusDom(value);
      },
      title: '文档审核状态',
    },
    {
      dataIndex: 'action',
      render: (_value, record) => {
        return <EyeOutlined onClick={() => openLeft(record)} />;
      },
      title: '审核报告',
    },
  ];
  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    onChange: onSelectChange,
    selectedRowKeys,
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
        {leftVisible && (
          <div className={S.leftContent}>
            <Header />
            <div className={S.tableContent}>
              <div className={S.tip}>
                参考数据模板及数据格式要求，准备并上传您的方案文档，文档质量直接影响审核效果。
                <span style={{ color: '#0072f5' }}>查看示例文档</span>
              </div>
              <div className={S.btns}>
                <div className={S.left}>
                  <Button onClick={() => getList()} type="primary">
                    刷新
                  </Button>
                  <Button type="text">批量导出</Button>
                </div>
                <Button icon={<PlusOutlined />} onClick={() => setOpen(true)} type="primary">
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
                  loading={loading}
                  pagination={pagination}
                  rowKey={(record: any) => record.file_id}
                  rowSelection={rowSelection}
                />
              </div>
            </div>
          </div>
        )}
        {detailVisible && (
          <div className={S.drawer}>
            <div className={S.drawerHeader}>
              <div>审核报告详情</div>
              <Button
                className={S.drawerClose}
                icon={<CloseOutlined />}
                onClick={() => {
                  setDetailVisible(false);
                }}
                shape="circle"
              />
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
              {detail['基本信息'] && (
                <>
                  <div className={S.bigBtn}>
                    <Button
                      block
                      onClick={() => {
                        setLeftVisible(false);
                        setDetailVisible(false);
                        setReportVisible(true);
                      }}
                      type="primary"
                    >
                      查看审核报告
                    </Button>
                  </div>
                  {/* <div className={S.bigBtn}>
                    <Button block>新增版本</Button>
                  </div>
                  <div className={S.bigBtn}>
                    <Button block danger type="primary">
                      删除数据集
                    </Button>
                  </div> */}
                </>
              )}
            </div>
          </div>
        )}
        {reportVisible && (
          <div className={S.reportDrawer}>
            <div className={S.drawerHeader}>
              <div>审核报告</div>
              <Button
                className={S.drawerClose}
                icon={<CloseOutlined />}
                onClick={() => {
                  setReportVisible(false);
                  setLeftVisible(true);
                }}
                shape="circle"
              />
            </div>
            <div className={S.drawerContent}>
              {current && current.review_report && md ? (
                <div className={mdxStyle['markdown-body']}>
                  <div dangerouslySetInnerHTML={{ __html: md }} />
                </div>
              ) : (
                <Empty style={{ marginTop: 100 }} />
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        footer={
          <div className={S.modalFooter}>
            <Button onClick={handleCancel}>取消</Button>
            <Button
              disabled={!currentUploadObj}
              onClick={() => add()}
              style={{ marginLeft: 16 }}
              type="primary"
            >
              开始审核
            </Button>
            <Button
              onClick={() => setRuleModalVisible(true)}
              style={{ marginLeft: 16 }}
              type="default"
            >
              设置规则
            </Button>
          </div>
        }
        onCancel={handleCancel}
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
      <RuleModal setVisible={setRuleModalVisible} visible={ruleModalVisible} />
    </Flexbox>
  );
});

export default Container;
