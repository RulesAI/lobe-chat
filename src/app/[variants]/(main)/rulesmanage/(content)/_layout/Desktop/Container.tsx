'use client';

import {
  BarChartOutlined,
  CloseOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  FilterOutlined,
  ImportOutlined,
  LinkOutlined,
  PlusOutlined,
  ProfileOutlined,
  ProjectOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, Select, Spin, Tag, theme } from 'antd';
import dayjs from 'dayjs';
import { PropsWithChildren, memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';

import S from './Container.module.css';

const prefix = process.env.NODE_ENV === 'development' ? '/v1' : 'http://47.97.196.187/v1';
const appKeys = {
  list: 'app-Kn6eNQBOkx6RJY1LBVhR4Xcu',
};
const user = 'lixiumin';

const Container = memo<PropsWithChildren>(() => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const { token } = theme.useToken();
  const { colorPrimary } = token;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const levels: any[] = [
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
  // const levelsMap: any = {
  //   1: '高级',
  //   2: '中级',
  //   3: '低级',
  // };

  const methods: any[] = [
    {
      label: '模板对比',
      value: '模板对比',
    },
    {
      label: '大模型技术',
      value: '大模型技术',
    },
    {
      label: '正则表达式',
      value: '正则表达式',
    },
    {
      label: '表格检测',
      value: '表格检测',
    },
    {
      label: '交叉验证',
      value: '交叉验证',
    },
    {
      label: '结构分析',
      value: '结构分析',
    },
    {
      label: '规则引擎',
      value: '规则引擎',
    },
    {
      label: '历史数据查询',
      value: '历史数据查询',
    },
    {
      label: '模糊匹配',
      value: '模糊匹配',
    },
    {
      label: '集合匹配',
      value: '集合匹配',
    },
    {
      label: '精确匹配',
      value: '精确匹配',
    },
    {
      label: '关键词',
      value: '关键词',
    },
    {
      label: '图像识别',
      value: '图像识别',
    },
  ];
  // const methodsMap: any = {
  //   1: '模板对比',
  //   2: '大模型技术',
  //   3: '正则表达式',
  //   4: '表格检测',
  //   5: '交叉验证',
  // };
  // const ruleList: any[] = [
  //   {
  //     bgColor: 'rgb(239,246,255)',
  //     children: [
  //       {
  //         category: 1,
  //         key: 10,
  //         method: [1],
  //         name: '缺章少节核验',
  //         status: ['open'],
  //         steps: '1、提取模板规定的章节\r\n2、提取可研、实施方案的章节，与模板进行比对。',
  //         time: '2025-07-02',
  //         tip: '提取模板规定的章节与可研报告章节进行比对',
  //       },
  //       {
  //         auto: 2,
  //         category: 1,
  //         key: 11,
  //         method: [4],
  //         name: '附表齐全核验',
  //         status: ['open'],
  //         steps: '1、提取模板规定的附表列表A\r\n2、提取可研、实施方案的附表列表B，A与B进行比对',
  //         time: '2025-07-01',
  //         tip: '检查模板要求的附表是否齐全',
  //       },
  //       {
  //         category: 2,
  //         key: 12,
  //         method: [1],
  //         name: '附表规范性核验',
  //         status: ['open'],
  //         steps:
  //           '1、提取模板规定的各个表的结构\r\n2、提取可研、实施方案中附表各个表的结构，与模板进行比对',
  //         time: '2025-06-01',
  //         tip: '检查附表结构标准性',
  //       },
  //     ],
  //     color: 'rgb(37,99,235)',
  //     count: 3,
  //     icon: <FileTextOutlined style={{ color: 'rgb(37,99,235)' }} />,
  //     key: 0,
  //     name: '结构完整性验证',
  //     status: 1,
  //     tip: '文档结构、章节、附表完整性检查',
  //   },
  //   {
  //     bgColor: 'rgb(240,253,244)',
  //     children: [
  //       {
  //         category: 1,
  //         key: 20,
  //         method: [5],
  //         name: '跨文件造价一致性核验',
  //         status: ['open'],
  //         steps:
  //           '1、提取模板规定的各个表的结构\r\n2、提取可研、实施方案中附表各个表的结构，与模板进行比对',
  //         time: '2025-07-02',
  //         tip: '对比系统填报、项目申请表、可研报告三处造价',
  //       },
  //     ],
  //     color: 'rgb(22,163,74)',
  //     count: 2,
  //     icon: <BarChartOutlined style={{ color: 'rgb(22,163,74)' }} />,
  //     key: 1,
  //     name: '数据一致性验证',
  //     status: 1,
  //     tip: '跨文件数据一致性检查',
  //   },
  //   {
  //     bgColor: 'rgb(255,247,237)',
  //     children: [
  //       {
  //         category: 1,
  //         key: 30,
  //         method: [2, 3],
  //         name: '不予立项核验',
  //         status: ['open'],
  //         steps:
  //           '1、提取项目管理办法的通知中不予立项条款\r\n2、按照列表A，利用大模型+正则，识别可研中是否包含',
  //         time: '2025-07-02',
  //         tip: '检查是否违反不予立项条款',
  //       },
  //       {
  //         category: 1,
  //         key: 31,
  //         method: [3],
  //         name: '系统定级是否明确',
  //         status: ['open'],
  //         steps: '1、提取需建设的系统名称\r\n2、在文件中利用大模型技术提取定级信息',
  //         time: '2025-07-01',
  //         tip: '提取系统等级保护定级信息',
  //       },
  //     ],
  //     color: 'rgb(234,88,12)',
  //     count: 8,
  //     icon: <ExclamationCircleOutlined style={{ color: 'rgb(234,88,12)' }} />,
  //     key: 2,
  //     name: '合规性验证',
  //     status: 1,
  //     tip: '合规要求和政策符合性检查',
  //   },
  //   {
  //     bgColor: 'rgb(250,245,255)',
  //     children: [
  //       {
  //         category: 2,
  //         key: 40,
  //         method: [3, 4],
  //         name: '总分造价是否一致',
  //         status: ['open'],
  //         steps:
  //           '1、利用表格检测技术+正则，提取总预算中的报价数据\r\n2、利用表格检测技术+正则，提取分项报价表中的报价数据',
  //         time: '2025-07-02',
  //         tip: '比对总预算与分项预算',
  //       },
  //     ],
  //     color: 'rgb(147,51,234)',
  //     count: 2,
  //     icon: <PayCircleOutlined style={{ color: 'rgb(147,51,234)' }} />,
  //     key: 3,
  //     name: '财务合规性验证',
  //     status: 1,
  //     tip: '预算数据准确性和一致性检查',
  //   },
  //   {
  //     bgColor: 'rgb(238,242,255)',
  //     children: [
  //       {
  //         category: 2,
  //         key: 50,
  //         method: [2],
  //         name: '采集来源是否清楚',
  //         status: ['open'],
  //         steps:
  //           '1、通过大模型技术提取数据来源列表，在界面上输出\r\n2、需要人工进行复核，判断是否清楚',
  //         time: '2025-07-02',
  //         tip: '检查数据采集来源描述',
  //       },
  //     ],
  //     color: 'rgb(79,70,229)',
  //     count: 5,
  //     icon: <ProfileOutlined style={{ color: 'rgb(79,70,229)' }} />,
  //     key: 4,
  //     name: '业务清晰度验证',
  //     status: 1,
  //     tip: '关键业务要素明确性检查',
  //   },
  //   {
  //     bgColor: 'rgb(240,253,250)',
  //     children: [
  //       {
  //         category: 3,
  //         key: 60,
  //         method: [2],
  //         name: '采集来源是否清楚',
  //         status: [],
  //         steps:
  //           '1、获取本次建设项目的项目名称A\r\n2、提取A中的关键信息\r\n3、从申请表中获取关联的项目名称B',
  //         time: '2025-07-02',
  //         tip: '验证项目关联关系',
  //       },
  //     ],
  //     color: 'rgb(13,148,136)',
  //     count: 4,
  //     icon: <LinkOutlined style={{ color: 'rgb(13,148,136)' }} />,
  //     key: 5,
  //     name: '关联性验证',
  //     status: 2,
  //     tip: '项目、系统、机房、专网关联检查',
  //   },
  // ];
  const optionsMap: any = {
    0: {
      bgColor: 'rgb(239,246,255)',
      color: 'rgb(37,99,235)',
      icon: <FileTextOutlined style={{ color: 'rgb(37,99,235)' }} />,
    },
    1: {
      bgColor: 'rgb(240,253,244)',
      color: 'rgb(22,163,74)',
      icon: <BarChartOutlined style={{ color: 'rgb(22,163,74)' }} />,
    },
    2: {
      bgColor: 'rgb(255,247,237)',
      color: 'rgb(234,88,12)',
      icon: <ExclamationCircleOutlined style={{ color: 'rgb(234,88,12)' }} />,
    },
    3: {
      bgColor: 'rgb(250,245,255)',
      color: 'rgb(147,51,234)',
      icon: <ProjectOutlined style={{ color: 'rgb(147,51,234)' }} />,
    },
    4: {
      bgColor: 'rgb(238,242,255)',
      color: 'rgb(79,70,229)',
      icon: <ProfileOutlined style={{ color: 'rgb(79,70,229)' }} />,
    },
    5: {
      bgColor: 'rgb(240,253,250)',
      color: 'rgb(13,148,136)',
      icon: <LinkOutlined style={{ color: 'rgb(13,148,136)' }} />,
    },
  };
  const [current, setCurrent] = useState<any>(null);
  // const [currentChildren, setCurrentChildren] = useState<any>({});
  const [visible, setVisible] = useState<any>(false);

  const openDrawer = (item: any) => {
    // setCurrentChildren(item);
    setVisible(true);
    const initData = {
      ...item,
      method: [],
      status: [],
    };
    if (item.is_enabled === 1) {
      initData.status.push('open');
    }
    initData.method = item.method_type.split('+');
    form.setFieldsValue(initData);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const formatData = (arr1: any, arr2: any, arr3: any[], arr4: { group_id: any }[]) => {
    if (arr4.length > 0) {
      const arr = arr4.map((i: { group_id: any }) => {
        const children: any[] = [];
        arr3.forEach((k, kIndex) => {
          if (k.group_id === i.group_id) {
            const obj = { ...k, ...arr2[kIndex] };
            children.push(obj);
          }
        });
        return {
          ...i,
          children,
        };
      });
      console.log('arr', arr);
      setList(arr);
      setCurrent(arr[0]);
    }
  };

  const getList = async () => {
    setLoading(true);
    const postData = {
      inputs: {
        query: '',
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
      console.log('result', result);
      const listData = result?.data?.outputs;
      const arr1 = listData?.result1?.[0]?.result || [];
      const arr2 = listData?.result2?.[0]?.result || [];
      const arr3 = listData?.result3?.[0]?.result || [];
      const arr4 = listData?.result4?.[0]?.result || [];
      console.log('listData', listData);
      formatData(arr1, arr2, arr3, arr4);
      // console.log('listData', listData);
      // setList(listData);
    } catch (err) {
      console.log('Error', err);
    } finally {
      setLoading(false);
    }
  };

  const getStyle = (dataIndex: number, type: string | number) => {
    const key = dataIndex % 6;
    return optionsMap[key][type];
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
          <div className={S.mainContent}>
            <div className={S.btns}>
              <div className={S.left}>
                <div className={S.tip}>管理和配置文档审核规则，支持规则分组和自定义配置</div>
              </div>
              <div>
                <Button icon={<ImportOutlined />} style={{ marginRight: 16 }}>
                  导入规则
                </Button>
                <Button icon={<PlusOutlined />} type="primary">
                  新建规则
                </Button>
              </div>
            </div>
            <div className={S.contentBox}>
              <div className={S.contentBoxLeft}>
                <div className={S.leftHeader}>
                  <div className={S.header}>
                    <div>规则分组</div>
                    <PlusOutlined style={{ color: colorPrimary }} />
                  </div>
                  <Input
                    placeholder="搜索规则分组"
                    prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </div>
                <Spin spinning={loading}>
                  {' '}
                  <div className={S.list}>
                    {list.map((i, index) => (
                      <div
                        className={`${S.item} ${i.group_id === current.group_id ? S.active : ''}`}
                        key={i.group_id}
                        onClick={() => {
                          setCurrent(i);
                          setVisible(false);
                        }}
                      >
                        <Tag
                          className={S.itemIcon}
                          color={getStyle(index, 'bgColor')}
                          icon={getStyle(index, 'icon')}
                          style={{
                            fontSize: 20,
                            height: 40,
                            lineHeight: '40px',
                            textAlign: 'center',
                            width: 40,
                          }}
                        />
                        <div className={S.mid}>
                          <div className={S.itemName}>{i.group_name}</div>
                          <div className={S.itemTip}>{i.group_description}</div>
                        </div>
                        <div className={S.more}>
                          <div
                            className={S.dot}
                            style={{
                              // backgroundColor:
                              //   i.is_enabled === 1 ? 'rgb(22,163,74)' : 'rgba(0,0,0,.25)',
                              backgroundColor: i.icon_color,
                            }}
                          />
                          <div className={S.moreList}>
                            <div className={S.dotItem} />
                            <div className={S.dotItem} />
                            <div className={S.dotItem} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Spin>
              </div>
              {current && (
                <div className={S.contentBoxRight}>
                  <div className={S.contentBoxRightMain}>
                    <div className={S.rightHeader}>
                      <div className={S.header}>
                        <div className={S.headerName}>
                          <div className={S.currentName}>{current.group_name}</div>
                          <div>{current.group_description}</div>
                        </div>
                        <Button>批量操作</Button>
                      </div>
                      <div className={S.filter}>
                        <Input
                          placeholder="搜索规则"
                          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                        <Select
                          defaultValue="0"
                          options={[
                            { label: '全部状态', value: '0' },
                            { label: '高级', value: '1' },
                            { label: '中级', value: '2' },
                            { label: '低级', value: '3' },
                          ]}
                          style={{ margin: '0 20px' }}
                        />
                        <Button icon={<FilterOutlined />} />
                      </div>
                    </div>
                    <div className={S.childrenList}>
                      {current &&
                        current.children.map((i: any) => (
                          <div className={S.childrenItem} key={i.rule_id}>
                            <div className={S.childrenItemHeader}>
                              <div>
                                <div className={S.childrenItemName}>
                                  {i.rule_name}
                                  <Tag
                                    color={
                                      i.category === '初级'
                                        ? 'processing'
                                        : i.category === '中级'
                                          ? 'warning'
                                          : 'error'
                                    }
                                    style={{ marginLeft: 10 }}
                                  >
                                    {/* {levelsMap[i.category]} */}
                                    {i.category}
                                  </Tag>
                                  <Tag color={i.is_enabled === 1 ? 'success' : 'default'}>
                                    {i.is_enabled === 1 ? '启用' : '禁用'}
                                  </Tag>
                                </div>
                              </div>
                              <div>
                                <Button
                                  icon={<EditOutlined style={{ color: '#8d8b8b', fontSize: 16 }} />}
                                  onClick={() => {
                                    openDrawer(i);
                                  }}
                                  type="text"
                                />
                                <Button
                                  icon={
                                    <CopyOutlined
                                      style={{ color: '#8d8b8b', fontSize: 16, margin: '0 20px' }}
                                    />
                                  }
                                  style={{ margin: '0 20px' }}
                                  type="text"
                                />
                                <Button
                                  icon={
                                    <DeleteOutlined style={{ color: '#8d8b8b', fontSize: 16 }} />
                                  }
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className={S.childrenItemTip}>{i.description}</div>
                            <div className={S.childrenItemBottom}>
                              <span>方法：{i.method_type}</span>
                              <span>更新：{dayjs(i.updated_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {visible && (
                    <div className={S.drawer}>
                      <div className={S.drawerHeader}>
                        <div>
                          <div>规则详情</div>
                          <div className={S.drawerHeaderTip}>编辑和配置审核规则参数</div>
                        </div>
                        <Button
                          className={S.drawerClose}
                          icon={<CloseOutlined />}
                          onClick={() => {
                            setVisible(false);
                          }}
                          shape="circle"
                        />
                      </div>
                      <div className={S.drawerContent}>
                        <Form form={form} layout="vertical" name="control-hooks">
                          <div className={S.formTitle}>基本信息</div>
                          <Form.Item label="规则名称" name="rule_name">
                            <Input />
                          </Form.Item>
                          <Form.Item label="规则描述" name="description">
                            <TextArea rows={2} />
                          </Form.Item>
                          <Row>
                            <Col span={11}>
                              <Form.Item label="严重程度" name="category">
                                <Select options={levels} />
                              </Form.Item>
                            </Col>
                            <Col offset={2} span={11}>
                              <Form.Item label="检测方法" name="method">
                                <Select mode="multiple" options={methods} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <div className={S.formTitle}>实现方法</div>
                          <Form.Item label="检查步骤" name="implementation_steps">
                            <TextArea rows={3} />
                          </Form.Item>
                          <div className={S.formTitle}>配置选项</div>
                          <Form.Item label="配置选项" name="status">
                            <Checkbox.Group style={{ width: '100%' }}>
                              <Row>
                                <Col span={24} style={{ marginBottom: 8 }}>
                                  <Checkbox value="open">启用此规则</Checkbox>
                                </Col>
                                <Col span={24} style={{ marginBottom: 8 }}>
                                  <Checkbox value="check">强制检查</Checkbox>
                                </Col>
                                <Col span={24}>
                                  <Checkbox value="auto">自动修复</Checkbox>
                                </Col>
                              </Row>
                            </Checkbox.Group>
                          </Form.Item>
                          <Form.Item>
                            <Row>
                              <Col span={16}>
                                <Button block type="primary">
                                  保存规则
                                </Button>
                              </Col>
                              <Col offset={1} span={7}>
                                <Button block>测试</Button>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Flexbox>
  );
});

export default Container;
