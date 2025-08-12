'use client';

import {
  // CheckCircleOutlined,
  // ClockCircleOutlined,
  CloseOutlined,
  // CloudSyncOutlined,
  // ExportOutlined,
  FileOutlined,
  PlusOutlined,
  SafetyOutlined,
  SearchOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  Tag,
  TreeSelect,
  // Upload,
  message,
} from 'antd';
import type { TableColumnsType, TableProps, TabsProps } from 'antd';
import dayjs from 'dayjs';
import { PropsWithChildren, SetStateAction, memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';
import { getSupabase } from '@/libs/supabase';

import S from './Container.module.css';
import RuleModal from './RuleModal';

// const { Dragger } = Upload;

const { RangePicker } = DatePicker;

const owner_id = '00000000-0000-0000-0000-000000000005';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  action: any;
  file_name: any;
  status: any;
  upload_time: any;
}

const supabase = getSupabase();

const Container = memo<PropsWithChildren>(() => {
  const [actionType, setActionType] = useState<any>('add');
  const [rules, setRules] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<any[]>([]);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  // const [showExport, setShowExport] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  // const [width, setWidth] = useState(0);
  const [detailVisible, setDetailVisible] = useState(false);
  // const [reportWidth, setReportWidth] = useState<string | number>(0);
  const [leftVisible, setLeftVisible] = useState(true);
  // const [currentUploadObj, setCurrentUploadObj] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  // const [fileList, setFileList] = useState([]);
  // const [current, setCurrent] = useState<any>(null);
  const [detail, setDetail] = useState<any>({});
  const [tab, setTab] = useState('1');
  const [category, setCategory] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    showTotal: (total: any) => `共${total}条`,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [ruleModalVisible, setRuleModalVisible] = useState(false);

  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const { TextArea } = Input;

  const handleCancel = () => {
    setOpen(false);
  };

  const openLeft = async (record: any) => {
    if (record) {
      setDetail(record);
    } else {
      setDetail({});
    }
    // setWidth(400);
    setDetailVisible(true);
    setLeftVisible(false);
  };

  const getTypeDom = (row: any) => {
    return <Tag>{row.knowledge_categories.name}</Tag>;
  };

  // 根据规则ID获取对应中文
  const getArrByIds = (ids: any[]) => {
    const arr: any[] = [];
    rules.forEach((i) => {
      if (ids.includes(i.id)) {
        arr.push(i.group_name);
      }
    });
    return arr;
  };

  const statusMap: any = {
    archived: '归档',
    draft: '草稿',
    published: '已发布',
    review: '审核中',
  };
  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    onChange: onSelectChange,
    selectedRowKeys,
  };

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

  const detailTabs: TabsProps['items'] = [
    {
      key: '1',
      label: '基本信息',
    },
    {
      key: '2',
      label: '版本历史',
    },
    {
      key: '3',
      label: '使用统计',
    },
    {
      key: '4',
      label: '用户反馈',
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

  const types: any[] = [
    {
      label: '法律法规',
      value: 'regulation',
    },
    {
      label: '⾏业标准',
      value: 'standard',
    },
    {
      label: '最佳实践',
      value: 'practice',
    },
    {
      label: '⽂档模板',
      value: 'template',
    },
    {
      label: '基准数据',
      value: 'benchmark',
    },
  ];

  const onChangeTabs = (v: SetStateAction<string>) => {
    setTab(v);
  };

  const getList = async (categoryId: any, options: any = {}, searchParams: any = {}) => {
    const cid = categoryId || activeCategory[0];
    // 根据查询条件构建 Supabase 查询
    setLoading(true);
    const newCurrent = options.current || pagination.current;
    const newPageSize = options.pageSize || pagination.pageSize;
    const from = (newCurrent - 1) * newPageSize;
    const to = from + newPageSize - 1;
    try {
      let func = supabase
        .from('knowledge_items')
        .select('*, knowledge_categories(name)', { count: 'exact' })
        .eq('category_id', cid)
        .order('created_at', { ascending: false })
        .range(from, to);
      if (searchParams.search) {
        if (searchParams.title) {
          func = func.ilike('title', `%${searchParams.title}%`);
        }
        if (searchParams.status && searchParams.status !== 'all') {
          func = func.eq('status', searchParams.status);
        }
        if (searchParams.timeRange && searchParams.timeRange.length > 0) {
          func = func
            .gte('created_at', dayjs(searchParams.timeRange[0]).format('YYYY-MM-DD HH:mm:ss')) // 大于等于 startDate
            .lte('created_at', dayjs(searchParams.timeRange[1]).format('YYYY-MM-DD HH:mm:ss')); // 小于等于 endDate
        }
      }
      let { data, count, error } = await func;
      console.log('knowledge_feedback', data, error);
      if (error) {
        return;
      }
      setList(data);
      setPagination({
        ...pagination,
        current: newCurrent,
        pageSize: newPageSize,
        total: count || 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const delRecord = async (record: any) => {
    const { data, error } = await supabase.from('knowledge_items').delete().eq('id', record.id); // 删除

    if (error) {
      message.success('操作失败:' + error);
      console.error('插入错误:', error);
      return null;
    }
    message.success('操作成功', data);
    getList(activeCategory[0]);
  };

  const onSearch = () => {
    form2.validateFields().then((res) => {
      console.log('res', res);
      const searchParams = {
        ...res,
        search: true,
      };
      getList(activeCategory[0], {}, searchParams);
    });
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const add = async (params: any) => {
    const { data, error } = await supabase.from('knowledge_items').insert([params]).select(); // 返回插入的数据

    if (error) {
      message.success('操作失败:' + error);
      console.error('插入错误:', error);
      return null;
    }
    message.success('操作成功');
    form.resetFields();
    setOpen(false);
    getList(activeCategory[0]);
    console.log('插入成功:', data);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const update = async (params: any) => {
    const { data, error } = await supabase
      .from('knowledge_items')
      .update(params)
      .eq('id', detail.id); // 返回插入的数据

    if (error) {
      message.success('操作失败:' + error);
      console.error('插入错误:', error);
      return null;
    }
    message.success('操作成功');
    form.resetFields();
    setOpen(false);
    getList(activeCategory[0]);
    console.log('更新成功', data);
  };
  const handleOk = () => {
    form.validateFields().then((res) => {
      console.log('res', res);
      const data = {
        ...res,
        owner_id,
        // rule_ids: res.rule_ids,
      };
      if (actionType === 'add') {
        console.log('add参数', data);
        add(data);
      } else {
        console.log('edit参数', data);
        update(data);
      }
    });
  };
  const setInitCategory = (data: any) => {
    if (data[0].children && data[0].children.length > 0) {
      setInitCategory(data.children[0]);
    } else {
      console.log('data[0].id', data[0].id);
      setActiveCategory([data[0].id]);
      getList(data[0].id);
    }
  };

  const getTreeData = async () => {
    // 构建树
    let tree: any[] = [];
    try {
      const { data, error } = await supabase.from('knowledge_categories').select('*');

      if (error) throw error;

      // 创建映射表
      const map: any = {};
      data.forEach((item: any) => {
        map[item.id] = {
          ...item,
          children: [],
          key: item.id,
          label: <div className={S.tree_label}>{item.name}</div>,
          selectable: true,
        };
      });

      data.forEach((item: any) => {
        if (item.parent_id) {
          const obj = map[item.id];

          map[item.parent_id].children.push({
            ...obj,
            children: obj.children.length > 0 ? obj.children : null,
          });
          map[item.parent_id].selectable = false;
        } else {
          tree.push(map[item.id]);
        }
      });
      tree = tree.map((i: any) => ({ ...i, children: i.children.length > 0 ? i.children : null }));
    } catch (err) {
      console.log('err', err);
    }
    return tree;
  };

  const getCategories = async () => {
    setCategoryLoading(true);
    try {
      const data = await getTreeData();
      console.log('data', data);
      setCategory(data);
      if (data.length > 0) {
        setInitCategory(data);
      }
    } finally {
      setCategoryLoading(false);
    }
  };

  // 获取规则
  const getRules = async () => {
    // 构建树
    try {
      const { data, error } = await supabase.from('audit_rule_groups').select('*');

      if (error) throw error;
      setRules(data);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleClickMenu = ({ key }: any) => {
    console.log('key', key);
    setActiveCategory([key]);
    getList(key);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getCurrentUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log('user', user);
    return user?.id;
  };

  const openModal = (type: any, record: any = {}) => {
    if (type === 'edit') {
      setDetail(record);
    }
    setOpen(true);
    setActionType(type);
  };

  const onTableChange = (options: any) => {
    console.log('options', options);
    const newPage = {
      ...pagination,
      current: options.current,
      pageSize: options.pageSize,
    };
    setPagination(newPage);
    getList(activeCategory[0], options);
  };
  const columns: TableColumnsType<DataType> = [
    { dataIndex: 'title', title: '知识标题' },
    {
      dataIndex: 'category',
      render: (_value, record) => {
        return getTypeDom(record);
      },
      title: '分类',
    },
    {
      dataIndex: 'rules',
      render: (_value, record: any) => {
        return (
          <div>
            {getArrByIds(record.rule_ids).map((i: any, index: any) => (
              <Tag color="processing" key={index} style={{ marginBottom: 8 }}>
                {i}
              </Tag>
            ))}
          </div>
        );
      },
      title: '关联规则',
    },
    {
      dataIndex: 'status',
      render: (value: any) => {
        return statusMap[value];
      },
      title: '状态',
    },
    { dataIndex: 'version', title: '版本' },
    { dataIndex: 'usage_count', title: '使用次数' },
    { dataIndex: 'accuracy_score', title: '准确率' },
    {
      dataIndex: 'updated_at',
      render: (value) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
      title: '更新时间',
    },
    {
      dataIndex: 'action',
      render: (_value, record) => {
        return (
          <div>
            <Button onClick={() => openLeft(record)} type="link">
              查看
            </Button>
            <Button onClick={() => openModal('edit', record)} type="link">
              编辑
            </Button>
            <Button onClick={() => delRecord(record)} style={{ color: 'red' }} type="link">
              删除
            </Button>
            <Button type="link">更多</Button>
          </div>
        );
      },
      title: '操作',
    },
  ];
  useEffect(() => {
    getCurrentUserId();
    getCategories();
    getRules();
  }, []);

  useEffect(() => {
    if (open) {
      if (actionType === 'add') {
        form.setFieldsValue({ category_id: activeCategory[0] });
      } else {
        const initObj = {
          category_id: detail.category_id,
          content: detail.content,
          rule_ids: detail.rule_ids,
          title: detail.title,
          type: detail.type,
        };
        form.setFieldsValue(initObj);
      }
    }
  }, [open]);
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
                  <div className={S.content_layout}>
                    <div className={S.category_card}>
                      <Spin spinning={categoryLoading}>
                        <Menu
                          items={category}
                          mode="inline"
                          onClick={handleClickMenu}
                          selectedKeys={activeCategory}
                        />
                      </Spin>
                    </div>
                    <div className={S.right_content}>
                      <div className={S.tool_bar}>
                        <Form form={form2} layout="inline" name="horizontal_login">
                          <Form.Item name="title">
                            <Input
                              placeholder="搜索知识标题、内容..."
                              style={{ marginBottom: 16, marginRight: 16, width: 400 }}
                            />
                          </Form.Item>
                          <Form.Item name="status">
                            <Select
                              className={S.filterSelect}
                              defaultValue="all"
                              options={[
                                { label: '全部状态', value: 'all' },
                                { label: '已发布', value: 'published' },
                                { label: '草稿', value: 'draft' },
                                { label: '已归档', value: 'archived' },
                              ]}
                              style={{ marginRight: 16, width: 120 }}
                            />
                          </Form.Item>
                          <Form.Item name="timeRange">
                            <RangePicker
                              style={{ marginBottom: 16, marginRight: 16, width: 400 }}
                            />
                          </Form.Item>
                        </Form>
                        <Button
                          icon={<SearchOutlined />}
                          onClick={onSearch}
                          style={{ marginRight: 16 }}
                          type="primary"
                        >
                          搜索
                        </Button>
                        {/* <Button icon={<ExportOutlined />} style={{ marginRight: 16 }}>
                          批量导入
                        </Button> */}
                        <Button
                          icon={<PlusOutlined />}
                          onClick={() => openModal('add')}
                          type="primary"
                        >
                          新建知识
                        </Button>
                      </div>
                      <div className={S.table_wrapper}>
                        <Table<DataType>
                          columns={columns}
                          dataSource={list}
                          loading={loading}
                          onChange={onTableChange}
                          pagination={pagination}
                          rowKey={(record: any) => record.id}
                          rowSelection={rowSelection}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
        {detailVisible && (
          <div className={S.detail_drawer}>
            <div className={S.detail_drawer_header}>
              <div>审核报告</div>
              <div>
                {/* <Button
                  className={S.drawerClose}
                  icon={<EditOutlined />}
                  onClick={() => {
                    setDetailVisible(false);
                    setLeftVisible(true);
                  }}
                  shape="circle"
                  style={{ marginRight: 20 }}
                /> */}
                <Button
                  className={S.drawerClose}
                  icon={<CloseOutlined />}
                  onClick={() => {
                    setDetailVisible(false);
                    setLeftVisible(true);
                  }}
                  shape="circle"
                />
              </div>
            </div>
            <div className={S.detail_drawer_tabs}>
              <Tabs defaultActiveKey={'1'} items={detailTabs} />
            </div>
            <div className={S.detail_drawer_title}>{detail.title}</div>
            <div className={S.detail_drawer_content}>
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>知识ID</div>
                <div className={S.detail_drawer_content_item_value}>{detail.id}</div>
              </div>
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>版本</div>
                <div className={S.detail_drawer_content_item_value}>{detail.version}</div>
              </div>
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>状态</div>
                <div className={S.detail_drawer_content_item_value}>{statusMap[detail.status]}</div>
              </div>
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>分类</div>
                <div className={S.detail_drawer_content_item_value}>
                  {detail.knowledge_categories.name}
                </div>
              </div>
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>关联规则</div>
                <div className={S.detail_drawer_content_item_value}>
                  {getArrByIds(detail.rule_ids).map((i: any, index: any) => (
                    <Tag color="processing" key={index} style={{ marginBottom: 8 }}>
                      {i}
                    </Tag>
                  ))}
                </div>
              </div>
              {/* <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>发布机构</div>
                <div className={S.detail_drawer_content_item_value}>2</div>
              </div>
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>生效日期</div>
                <div className={S.detail_drawer_content_item_value}>{detail.id}</div>
              </div>
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>失效日期</div>
                <div className={S.detail_drawer_content_item_value}>{detail.id}</div>
              </div> */}
              {/* <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>标签</div>
                <div className={S.detail_drawer_content_item_value}>{detail.id}</div>
              </div> */}
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>创建时间</div>
                <div className={S.detail_drawer_content_item_value}>
                  {dayjs(detail.created_at).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
              <div className={S.detail_drawer_content_item}>
                <div className={S.detail_drawer_content_item_label}>更新时间</div>
                <div className={S.detail_drawer_content_item_value}>
                  {dayjs(detail.updated_at).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </div>
            </div>
            <div className={S.detail_drawer_title2}>知识内容</div>
            <div className={S.detail_drawer_content_text}>{detail.content}</div>
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
          </div>
        }
        onCancel={handleCancel}
        open={open}
        title={actionType === 'edit' ? '编辑知识' : '新增知识'}
      >
        <Tabs defaultActiveKey="1" items={formTabsitems} />
        {/* <div className={S.export_btn_bar}>
          <Button onClick={() => setShowExport(!showExport)} size="small" type="primary">
            导入文件
          </Button>
        </div> */}
        {/* {showExport && (
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
            <p className="ant-upload-hint">上传文件成功后自动回填表单内容</p>
          </Dragger>
        )} */}
        <Form form={form} layout="vertical" name="control-hooks">
          <Form.Item label="知识标题" name="title" rules={[{ required: true }]}>
            <Input placeholder="请输入知识标题" />
          </Form.Item>
          <Row>
            <Col span={11}>
              <Form.Item label="知识分类" name="category_id" rules={[{ required: true }]}>
                <TreeSelect
                  allowClear
                  defaultValue={activeCategory[0]}
                  fieldNames={{ label: 'name', value: 'id' }}
                  placeholder="请选择"
                  showSearch
                  style={{ width: '100%' }}
                  styles={{
                    popup: { root: { maxHeight: 400, overflow: 'auto' } },
                  }}
                  treeData={category}
                  treeDefaultExpandAll
                />
              </Form.Item>
            </Col>
            <Col offset={2} span={11}>
              <Form.Item label="知识类型" name="type" rules={[{ required: true }]}>
                <Select options={types} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label="关联规则" name="rule_ids" rules={[{ required: true }]}>
                <Select
                  fieldNames={{ label: 'group_name', value: 'id' }}
                  mode="multiple"
                  options={rules}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="知识内容" name="content" rules={[{ required: true }]}>
            <TextArea placeholder="请输入知识内容..." rows={2} />
          </Form.Item>
        </Form>
      </Modal>
      <RuleModal setVisible={setRuleModalVisible} visible={ruleModalVisible} />
    </Flexbox>
  );
});

export default Container;
