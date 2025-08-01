'use client';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Modal, Select, Tag, message, theme } from 'antd';
import { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';

import S from './ruleModal.module.css';

// 定义 props 类型
interface ChildProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}
const RuleModal = memo(({ visible, setVisible }: ChildProps) => {
  const { token } = theme.useToken();
  const { colorPrimary } = token;
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [tab, setTab] = useState<number>(0);
  const [all, setAll] = useState<any[]>([]);
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSelectChange = (key: any) => {
    console.log('key', key);
    const hasExit = selectedRowKeys.find((i) => i === key);
    let newList = [];
    if (hasExit || hasExit === 0) {
      newList = selectedRowKeys.filter((i) => i !== key);
    } else {
      newList = selectedRowKeys.concat([key]);
    }
    setSelectedRowKeys(newList);
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setVisible(false);
  };

  const handleOk = () => {
    setSelectedRowKeys([]);
    setVisible(false);
    message.success('设置规则成功');
  };

  const ruleList: any[] = [
    {
      bgColor: 'rgb(239,246,255)',
      children: [
        {
          category: 1,
          key: 10,
          method: [1],
          name: '缺章少节核验',
          status: ['open'],
          steps: '1、提取模板规定的章节\r\n2、提取可研、实施方案的章节，与模板进行比对。',
          time: '2025-07-02',
          tip: '提取模板规定的章节与可研报告章节进行比对',
        },
        {
          auto: 2,
          category: 1,
          key: 11,
          method: [4],
          name: '附表齐全核验',
          status: ['open'],
          steps: '1、提取模板规定的附表列表A\r\n2、提取可研、实施方案的附表列表B，A与B进行比对',
          time: '2025-07-01',
          tip: '检查模板要求的附表是否齐全',
        },
        {
          category: 2,
          key: 12,
          method: [1],
          name: '附表规范性核验',
          status: ['open'],
          steps:
            '1、提取模板规定的各个表的结构\r\n2、提取可研、实施方案中附表各个表的结构，与模板进行比对',
          time: '2025-06-01',
          tip: '检查附表结构标准性',
        },
      ],
      color: 'rgb(37,99,235)',
      count: 3,
      // icon: <FileTextOutlined style={{ color: 'rgb(37,99,235)' }} />,
      key: 0,
      name: '结构完整性验证',
      otherName: '结构验证',
      status: 1,
      tip: '文档结构、章节、附表完整性检查',
    },
    {
      bgColor: 'rgb(240,253,244)',
      children: [
        {
          category: 1,
          key: 20,
          method: [5],
          name: '跨文件造价一致性核验',
          status: ['open'],
          steps:
            '1、提取模板规定的各个表的结构\r\n2、提取可研、实施方案中附表各个表的结构，与模板进行比对',
          time: '2025-07-02',
          tip: '对比系统填报、项目申请表、可研报告三处造价',
        },
      ],
      color: 'rgb(22,163,74)',
      count: 2,
      // icon: <BarChartOutlined style={{ color: 'rgb(22,163,74)' }} />,
      key: 1,
      name: '数据一致性验证',
      otherName: '数据验证',
      status: 1,
      tip: '跨文件数据一致性检查',
    },
    {
      bgColor: 'rgb(255,247,237)',
      children: [
        {
          category: 1,
          key: 30,
          method: [2, 3],
          name: '不予立项核验',
          status: ['open'],
          steps:
            '1、提取项目管理办法的通知中不予立项条款\r\n2、按照列表A，利用大模型+正则，识别可研中是否包含',
          time: '2025-07-02',
          tip: '检查是否违反不予立项条款',
        },
        {
          category: 1,
          key: 31,
          method: [3],
          name: '系统定级是否明确',
          status: ['open'],
          steps: '1、提取需建设的系统名称\r\n2、在文件中利用大模型技术提取定级信息',
          time: '2025-07-01',
          tip: '提取系统等级保护定级信息',
        },
      ],
      color: 'rgb(234,88,12)',
      count: 8,
      // icon: <ExclamationCircleOutlined style={{ color: 'rgb(234,88,12)' }} />,
      key: 2,
      name: '合规性验证',
      otherName: '合规验证',
      status: 1,
      tip: '合规要求和政策符合性检查',
    },
    {
      bgColor: 'rgb(250,245,255)',
      children: [
        {
          category: 2,
          key: 40,
          method: [3, 4],
          name: '总分造价是否一致',
          status: ['open'],
          steps:
            '1、利用表格检测技术+正则，提取总预算中的报价数据\r\n2、利用表格检测技术+正则，提取分项报价表中的报价数据',
          time: '2025-07-02',
          tip: '比对总预算与分项预算',
        },
      ],
      color: 'rgb(147,51,234)',
      count: 2,
      // icon: <PayCircleOutlined style={{ color: 'rgb(147,51,234)' }} />,
      key: 3,
      name: '财务合规性验证',
      otherName: '财务验证',
      status: 1,
      tip: '预算数据准确性和一致性检查',
    },
    {
      bgColor: 'rgb(238,242,255)',
      children: [
        {
          category: 2,
          key: 50,
          method: [2],
          name: '采集来源是否清楚',
          status: ['open'],
          steps:
            '1、通过大模型技术提取数据来源列表，在界面上输出\r\n2、需要人工进行复核，判断是否清楚',
          time: '2025-07-02',
          tip: '检查数据采集来源描述',
        },
      ],
      color: 'rgb(79,70,229)',
      count: 5,
      // icon: <ProfileOutlined style={{ color: 'rgb(79,70,229)' }} />,
      key: 4,
      name: '业务清晰度验证',
      otherName: '业务验证',
      status: 1,
      tip: '关键业务要素明确性检查',
    },
    // {
    //   bgColor: 'rgb(240,253,250)',
    //   children: [
    //     {
    //       category: 3,
    //       key: 60,
    //       method: [2],
    //       name: '采集来源是否清楚',
    //       status: [],
    //       steps:
    //         '1、获取本次建设项目的项目名称A\r\n2、提取A中的关键信息\r\n3、从申请表中获取关联的项目名称B',
    //       time: '2025-07-02',
    //       tip: '验证项目关联关系',
    //     },
    //   ],
    //   color: 'rgb(13,148,136)',
    //   count: 4,
    //   // icon: <LinkOutlined style={{ color: 'rgb(13,148,136)' }} />,
    //   key: 5,
    //   name: '关联性验证',
    //   status: 2,
    //   tip: '项目、系统、机房、专网关联检查',
    // },
  ];

  const methodsMap: any = {
    1: '模板对比',
    2: '大模型技术',
    3: '正则表达式',
    4: '表格检测',
    5: '交叉验证',
  };
  const levelsMap: any = {
    1: '高级',
    2: '中级',
    3: '低级',
  };
  const getListDom = (arr: any[]) => {
    return arr.map((i: any) => (
      <div className={S.list_item} key={i.key} onClick={() => onSelectChange(i.key)}>
        <div className={S.checkBox}>
          <Checkbox
            checked={selectedRowKeys.includes(i.key)}
            // onChange={() => onSelectChange(i.key)}
          />
        </div>
        <div className={S.list_item_bottom}>
          <div className={S.item_left}>
            <div className={S.item_name}>{i.name}</div>
            <div className={S.item_tip}>{i.tip}</div>
          </div>
          <div className={S.item_right}>
            <div className={S.item_right_text}>
              {i.method.map((i: any) => methodsMap[i]).join(' + ')}
            </div>
            <div className={S.item_right_text}>{levelsMap[i.category]}</div>
            <div className={S.item_right_text}>{i.time}</div>
            <Tag color={i.status.includes('open') ? 'green' : 'default'}>
              {i.status.includes('open') ? '启' : '禁'}
            </Tag>
          </div>
        </div>
      </div>
    ));
  };
  const getRenderList = () => {
    if (tab === -1) {
      return getListDom(all);
    }
    const currentTab = ruleList.find((i: any) => i.key === tab);
    return getListDom(currentTab.children);
  };
  {
    /* <div className={S.}></div> */
  }
  {
    /* <span className={S.}></span> */
  }
  useEffect(() => {
    if (visible) {
      let allList: any[] = [];
      ruleList.forEach((i) => {
        if (i.children) {
          allList = allList.concat(i.children);
        }
      });
      setAll(allList);
    }
  }, [visible]);
  return (
    <Modal
      closable={{ 'aria-label': 'Custom Close Button' }}
      footer={
        <div className={S.modal_footer}>
          <div className={S.modal_total}>已选择 {selectedRowKeys.length} 条规则</div>
          <div>
            <Button onClick={handleCancel}>取消</Button>
            <Button
              className={S.primaryColor}
              disabled={selectedRowKeys.length === 0}
              onClick={() => handleOk()}
              style={{ marginLeft: 16 }}
              type="primary"
            >
              确定
            </Button>
          </div>
        </div>
      }
      onCancel={handleCancel}
      open={visible}
      title="选择审核规则"
      width={900}
    >
      <div className={S.modal_content}>
        <div className={S.modal_header}>
          <Input
            placeholder="搜索规则..."
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <Select
            className={S.filterSelect}
            defaultValue="jack"
            options={[
              { label: '全部分类', value: 'jack' },
              { label: '机构完整性验证', value: 'lucy' },
              { label: '数据一致性验证', value: 'Yiminghe' },
              { label: '合规性验证', value: 'Yiminghe2' },
              { label: '财务合规性验证', value: 'lucy3' },
              { label: '业务消费度验证', value: 'Yiminghe3' },
              { label: '文档性验证', value: 'Yiminghe23' },
            ]}
            style={{ marginLeft: 16, width: 200 }}
          />
        </div>
        <div className={S.modal_filter}>
          <div className={S.filter_title}>快速选择</div>
          <div className={S.filter_tags}>
            <Button
              onClick={() => setTab(-1)}
              shape="round"
              style={{
                backgroundColor: tab === -1 ? colorPrimary : '#d5d5d5',
                color: tab === -1 ? '#fff' : '#535252',
                marginRight: 8,
              }}
            >
              全部
            </Button>
            {ruleList.map((i) => (
              <Button
                key={i.key}
                onClick={() => setTab(i.key)}
                shape="round"
                style={{
                  backgroundColor: tab === i.key ? colorPrimary : '#d5d5d5',
                  color: tab === i.key ? '#fff' : '#535252',
                  marginRight: 8,
                }}
              >
                {i.otherName}
              </Button>
            ))}
          </div>
        </div>
        <div className={S.modal_list}>{getRenderList()}</div>
      </div>
    </Modal>
  );
});

export default RuleModal;
