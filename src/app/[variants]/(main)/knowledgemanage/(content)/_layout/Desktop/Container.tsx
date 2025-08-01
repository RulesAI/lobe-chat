'use client';

import {
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  CloudSyncOutlined,
  ExportOutlined,
  EyeOutlined,
  FileOutlined,
  FolderOpenOutlined,
  InboxOutlined,
  PlusOutlined,
  ReadOutlined,
  SafetyOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Tag,
  Upload,
  message,
} from 'antd';
import type {
  GetProp,
  MenuProps,
  TableColumnsType,
  TableProps,
  TabsProps,
  UploadProps,
} from 'antd';
import dayjs from 'dayjs';
import { PropsWithChildren, SetStateAction, memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import { parseMarkdown } from '@/utils/parseMarkdown';

import S from './Container.module.css';
import RuleModal from './RuleModal';
import mdxStyle from './mdx.module.css';

const { Dragger } = Upload;

const { RangePicker } = DatePicker;

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
type MenuItem = GetProp<MenuProps, 'items'>[number];

interface DataType {
  action: any;
  file_name: any;
  status: any;
  upload_time: any;
}

const Container = memo<PropsWithChildren>(() => {
  const [showExport, setShowExport] = useState(false);
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
  const [tab, setTab] = useState('1');
  const [pagination, setPagination] = useState<any>({
    showTotal: (total: any) => `共${total}条`,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [ruleModalVisible, setRuleModalVisible] = useState(false);

  const [form] = Form.useForm();
  const { TextArea } = Input;

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
        console.log('上传成功，返回数据:', info.file.response, currentUploadObj);
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
  // const runWork = async () => {
  //   if (!currentUploadObj) return;
  //   // const postData = {
  //   //   inputs: {
  //   //     file: currentFile,
  //   //     file_id: currentUploadObj.id,
  //   //     id: currentUploadObj.id,
  //   //     name: currentUploadObj.name,
  //   //     project_name: '测试项目',
  //   //     transfer_method: 'local_file',
  //   //     type: 'document',
  //   //     upload_file_id: currentUploadObj.id,
  //   //   },
  //   //   project_name: '测试项目',
  //   //   response_mode: 'blocking',
  //   //   user,
  //   // };
  //   const postData = {
  //     files: [],
  //     inputs: {
  //       file: [
  //         {
  //           transfer_method: 'local_file',
  //           type: 'document',
  //           upload_file_id: currentUploadObj.id,
  //           url: '',
  //         },
  //       ],
  //       file_id: currentUploadObj.id,
  //       project_name: currentUploadObj.id,
  //     },
  //     response_mode: 'blocking',
  //     user,
  //   };
  //   try {
  //     message.success('文档开始审核');
  //     setOpen(false);
  //     getList();
  //     const res = await fetch(`${prefix}/workflows/run`, {
  //       body: JSON.stringify(postData),
  //       headers: {
  //         'Authorization': `Bearer ${appKeys.run}`,
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'POST',
  //     });
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }
  //   } catch (err) {
  //     console.log('Error', err);
  //   }
  // };

  // const add = async () => {
  //   if (!currentUploadObj) return;
  //   const postData = {
  //     inputs: {
  //       created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  //       id: currentUploadObj.id,
  //       name: currentUploadObj.name,
  //     },
  //     // id: currentUploadObj.id,
  //     // name: currentUploadObj.name,
  //     response_mode: 'blocking',
  //     user,
  //   };
  //   try {
  //     const res = await fetch(`${prefix}/workflows/run`, {
  //       body: JSON.stringify(postData),
  //       headers: {
  //         'Authorization': `Bearer ${appKeys.add}`,
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'POST',
  //     });
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }
  //     // 去审核
  //     runWork();
  //   } catch (err) {
  //     console.log('Error', err);
  //   }
  // };

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

  const menuItems: MenuItem[] = [
    {
      children: [
        {
          children: [
            {
              icon: <FileOutlined />,
              key: '111',
              label: '法律法规',
            },
            {
              icon: <FileOutlined />,
              key: '112',
              label: '安全标准',
            },
            {
              icon: <FileOutlined />,
              key: '113',
              label: '行业规范',
            },
          ],
          icon: <SafetyOutlined />,
          key: '11',
          label: '合规知识库',
        },
        {
          children: [
            {
              icon: <FileOutlined />,
              key: '211',
              label: '成本基准',
            },
            {
              icon: <FileOutlined />,
              key: '212',
              label: '技术成熟度',
            },
            {
              icon: <FileOutlined />,
              key: '213',
              label: '性能基准',
            },
          ],
          icon: <BarChartOutlined />,
          key: '12',
          label: '基准数据库',
        },
        {
          icon: <ReadOutlined />,
          key: '13',
          label: '专业实践库',
        },
      ],
      icon: <FolderOpenOutlined />,
      key: '1',
      label: '全部知识',
    },
  ];

  const tabPaneContent = (
    <div className={S.content_layout}>
      <div className={S.category_card}>
        <Menu
          defaultOpenKeys={['1', '11', '12']}
          defaultSelectedKeys={['1']}
          items={menuItems}
          mode="inline"
        />
      </div>
      <div className={S.right_content}>
        <div className={S.tool_bar}>
          <Input
            placeholder="搜索知识标题、内容..."
            style={{ marginBottom: 16, marginRight: 16, width: 400 }}
          />
          <Select
            className={S.filterSelect}
            defaultValue="jack"
            options={[
              { label: '全部状态', value: 'jack' },
              { label: '已发布', value: 'lucy' },
              { label: '草稿', value: 'Yiminghe' },
              { label: '已归档', value: 'Yiminghe2' },
            ]}
            style={{ marginRight: 16, width: 120 }}
          />
          <RangePicker style={{ marginBottom: 16, marginRight: 16, width: 400 }} />
          <Button icon={<ExportOutlined />} style={{ marginRight: 16 }}>
            批量导入
          </Button>
          <Button icon={<PlusOutlined />} onClick={() => setOpen(true)} type="primary">
            新建知识
          </Button>
        </div>
        <div className={S.table_wrapper}>
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
  );

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '知识列表',
    },
    {
      key: '2',
      label: '使用分析',
    },
    {
      key: '3',
      label: '知识配置',
    },
  ];

  const formTabsitems: TabsProps['items'] = [
    {
      key: '1',
      label: '基本信息',
    },
    {
      key: '2',
      label: '拓展信息',
    },
  ];

  const categorys: any[] = [
    {
      label: '高级',
      value: 'height',
    },
    {
      label: '中级',
      value: 'medium',
    },
    {
      label: '低级',
      value: 'low',
    },
  ];

  const types: any[] = [
    {
      label: '高级',
      value: 'height',
    },
    {
      label: '中级',
      value: 'medium',
    },
    {
      label: '低级',
      value: 'low',
    },
  ];

  const rules: any[] = [
    {
      label: '高级',
      value: 'height',
    },
    {
      label: '中级',
      value: 'medium',
    },
    {
      label: '低级',
      value: 'low',
    },
  ];

  const onChangeTabs = (v: SetStateAction<string>) => {
    setTab(v);
  };

  const handleOk = () => {
    form.validateFields().then((res) => {
      console.log('res', res);
    });
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
            <div className={S.layout}>
              <div className={S.tip}>管理审核所需的法规标准、行业基准和最佳实践知识</div>
              <div className={S.statistics_row}>
                <Card className={S.stat_card}>
                  <div className={S.stat_title}>知识总数</div>
                  <div className={S.stat_value}>
                    <FileOutlined className={S.stat_icon} style={{ color: '#1890ff' }} />
                    <span className={S.stat_number} style={{ color: '#1890ff' }}>
                      1,234
                    </span>
                  </div>
                </Card>
                <Card className={S.stat_card}>
                  <div className={S.stat_title}>本月新增</div>
                  <div className={S.stat_value}>
                    <PlusOutlined className={S.stat_icon} style={{ color: '#52c41a' }} />
                    <span className={S.stat_number} style={{ color: '#52c41a' }}>
                      89
                    </span>
                  </div>
                </Card>
                <Card className={S.stat_card}>
                  <div className={S.stat_title}>待更新</div>
                  <div className={S.stat_value}>
                    <SyncOutlined className={S.stat_icon} style={{ color: '#faad14' }} />
                    <span className={S.stat_number} style={{ color: '#faad14' }}>
                      23
                    </span>
                  </div>
                </Card>
                <Card className={S.stat_card}>
                  <div className={S.stat_title}>平均准确率</div>
                  <div className={S.stat_value}>
                    <SafetyOutlined className={S.stat_icon} style={{ color: '#13c2c2' }} />
                    <span className={S.stat_number} style={{ color: '#13c2c2' }}>
                      96.5<span style={{ fontSize: '16px' }}>%</span>
                    </span>
                  </div>
                </Card>
              </div>
              <div className={S.content_box}>
                <Card>
                  <Tabs activeKey={tab} items={items} onChange={onChangeTabs} />
                  {tabPaneContent}
                </Card>
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
            <Button onClick={handleOk} style={{ marginLeft: 16 }} type="primary">
              提交
            </Button>
            {/* <Button
              disabled={!currentUploadObj}
              onClick={() => add()}
              style={{ marginLeft: 16 }}
              type="primary"
            >
              开始审核
            </Button> */}
            {/* <Button
              onClick={() => setRuleModalVisible(true)}
              style={{ marginLeft: 16 }}
              type="default"
            >
              设置规则
            </Button> */}
          </div>
        }
        onCancel={handleCancel}
        open={open}
        title="新建知识"
      >
        <Tabs defaultActiveKey="1" items={formTabsitems} />
        <div className={S.export_btn_bar}>
          <Button onClick={() => setShowExport(!showExport)} size="small" type="primary">
            导入文件
          </Button>
        </div>
        {showExport && (
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
            <p className="ant-upload-hint">上传文件成功后自动回填表单内容</p>
          </Dragger>
        )}
        <Form form={form} layout="vertical" name="control-hooks">
          <Form.Item label="知识标题" name="knowledge_name" rules={[{ required: true }]}>
            <Input placeholder="请输入知识标题" />
          </Form.Item>
          <Row>
            <Col span={11}>
              <Form.Item label="知识分类" name="knowledge_category" rules={[{ required: true }]}>
                <Select options={categorys} />
              </Form.Item>
            </Col>
            <Col offset={2} span={11}>
              <Form.Item label="知识类型" name="knowledge_type" rules={[{ required: true }]}>
                <Select mode="multiple" options={types} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="关联规则" name="knowledge_rule" rules={[{ required: true }]}>
                <Select options={rules} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="知识内容" name="knowledge_content" rules={[{ required: true }]}>
            <TextArea placeholder="请输入知识内容..." rows={2} />
          </Form.Item>
        </Form>
      </Modal>
      <RuleModal setVisible={setRuleModalVisible} visible={ruleModalVisible} />
    </Flexbox>
  );
});

export default Container;
