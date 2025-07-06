'use client';

import {
  BankOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DownOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  PayCircleOutlined,
  ProfileOutlined,
  RightOutlined,
  ScheduleOutlined,
  SearchOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button, Input, Select, Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
// import dayjs from 'dayjs';
import { PropsWithChildren, memo, useEffect, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import Header from '@/components/Header';

import S from './Container.module.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  action: any;
  file_name: any;
  status: any;
  upload_time: any;
}

const Container = memo<PropsWithChildren>(() => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [leftVisible, setLeftVisible] = useState(true);
  const [detailVisible, setDetailVisible] = useState(true);
  const [list, setList] = useState<any>([]);
  const [keys, setKeys] = useState([0, 1, 2, 3, 4]);
  // const [current, setCurrent] = useState<any>(list[0]);
  const [pagination, setPagination] = useState<any>({
    showTotal: (total: any) => `共${total}条`,
    total: 0,
  });

  const listData: any[] = [
    {
      company: '智慧城市建设中心',
      downloadCount: 12,
      errorList: [
        {
          area: '第36页',
          checkRes: '文档中提及新建机房，违反不予立项条款',
          checkStatus: 3,
          id: 111,
          name: '不予立项核验',
        },
        {
          area: '第56页，申请表第2页',
          checkRes: '基础平台建设费用在可研报告与申请表中不一致',
          checkStatus: 3,
          id: 112,
          name: '跨文件造价一致性核验',
        },
        {
          area: '第23页',
          checkRes: '缺少附表3：系统运行维护费估算表',
          checkStatus: 2,
          id: 113,
          name: '附表齐全核验',
        },
        {
          area: '第22页',
          checkRes: '信创技术描述不够详细，缺少具体技术方案',
          checkStatus: 2,
          id: 114,
          name: '信创描述',
        },
        {
          area: '第2页、第56页',
          checkRes: '建议统一文档中的投资金额描述',
          checkStatus: 4,
          id: 115,
          name: '上下文造价一致性',
        },
      ],
      fraction: 73,
      groupName: '大数据中心项目',
      id: 1,
      money: '441万元',
      name: '大数据中心项目可行性研究报告.pdf',
      passNum: 28,
      range: '2025年3月 - 2026年3月',
      rejectNum: 3,
      ruleList: [
        {
          alertObj: {
            passNum: 2,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(239,246,255)',
          children: [
            {
              area: '全文档',
              checkRes: '✓ 文档包含所有必需章节',
              checkStatus: 1,
              desc: '已检查7个主要章节：总论、需求分析、设计方案、运营保障、预算经费、风险分析、效益分析，全部符合模板要求',
              key: 10,
              name: '缺章少节核验',
              tip: '提取模板规定的章节与可研报告章节进行比对',
            },
            {
              area: '第23页',
              checkRes: '⚠ 缺少附表3：系统运行维护费估算表',
              checkStatus: 2,
              desc: '模板要求5个附表，实际提供4个。缺少：系统运行维护费估算表',
              key: 11,
              name: '附表齐全核验',
              tip: '检查模板要求的附表是否齐全',
            },
            {
              area: '附表1-4',
              checkRes: '✓ 附表结构符合规范要求',
              checkStatus: 1,
              desc: '表格一级标题、二级标题格式正确，包含：系统开发实施工作量测算表、软硬件配置清单、系统运行维护费估算表、项目投资估算表',
              key: 12,
              name: '附表规范性核验',
              tip: '检查附表结构标准性',
            },
          ],
          color: 'rgb(37,99,235)',
          count: 3,
          icon: <FileTextOutlined style={{ color: 'rgb(37,99,235)' }} />,
          key: 0,
          name: '结构完整性验证',
          status: 1,
          tip: '文档结构、章节、附表完整性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 0,
            warnNum: 1,
          },
          bgColor: 'rgb(240,253,244)',
          children: [
            {
              area: '第56页，申请表第2页',
              checkRes: '✗ 发现造价不一致',
              checkStatus: 3,
              desc: '系统填报：441万元，项目申请表：441万元，可研报告总计：441万元，但分项明细存在差异：基础平台建设75万元与申请表中的80万元不符',
              key: 20,
              name: '跨文件造价一致性核验',
              tip: '对比系统填报、项目申请表、可研报告三处造价',
            },
            {
              area: '第2章、第3章',
              checkRes: '✓ 服务内容完全覆盖需求分析',
              checkStatus: 1,
              desc: '需求分析中的11项功能需求在建设方案中均有对应实现',
              key: 21,
              name: '需求内容是否在服务内容中全部体现',
              tip: '验证需求分析与建设内容的对应关系',
            },
          ],
          color: 'rgb(22,163,74)',
          count: 2,
          icon: <BarChartOutlined style={{ color: 'rgb(22,163,74)' }} />,
          key: 1,
          name: '数据一致性验证',
          status: 1,
          tip: '跨文件数据一致性检查',
        },
        {
          alertObj: {
            passNum: 5,
            rejectNum: 2,
            warnNum: 1,
          },
          bgColor: 'rgb(255,247,237)',
          children: [
            {
              area: '第36页',
              checkRes: '✗ 文档中提及新建机房，违反不予立项条款',
              checkStatus: 3,
              desc: '在第36页中提到"新建数据中心机房"，违反了"原则上不允许建设机房"的政策要求',
              key: 30,
              name: '不予立项核验',
              tip: '检查是否违反不予立项条款',
            },
            {
              area: '第46页',
              checkRes: '✓ 系统定级为等级保护三级',
              checkStatus: 1,
              desc: '在第46页明确提出系统按照等级保护三级标准建设',
              key: 31,
              name: '系统定级是否明确',
              tip: '提取系统等级保护定级信息',
            },
            {
              area: '第44-48页',
              checkRes: '✓ 详细描述了安全防护措施',
              checkStatus: 1,
              desc: '第44-48页详细描述了物理安全、网络安全、系统安全、应用安全、数据安全五个层面的防护措施',
              key: 32,
              name: '对应的安全防护是否描述',
              tip: '检查等级保护措施描述',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创描述不够详细',
              checkStatus: 2,
              desc: '仅在第22页简单提及信创要求，缺少具体的信创技术方案和产品选型',
              key: 33,
              name: '信创是否描述',
              tip: '检查信创技术描述',
            },
            {
              area: '第22页',
              checkRes: '✓ 明确了政务云部署方案',
              checkStatus: 1,
              desc: '第40页详细说明了基于政务云的部署架构',
              key: 34,
              name: '上云是否描述',
              tip: '检查上云方案描述',
            },
          ],
          color: 'rgb(234,88,12)',
          count: 8,
          icon: <ExclamationCircleOutlined style={{ color: 'rgb(234,88,12)' }} />,
          key: 2,
          name: '合规性验证',
          status: 1,
          tip: '合规要求和政策符合性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(250,245,255)',
          children: [
            {
              area: '第56页',
              checkRes: '✓ 总价与分项汇总一致',
              checkStatus: 1,
              desc: '总投资441万元与各分项汇总金额一致：基础平台75万+交换平台120万+信息库50万+专项建设160万+监理实施36万=441万',
              key: 40,
              name: '总分造价是否一致',
              tip: '比对总预算与分项预算',
            },
            {
              area: '第2页、第56页',
              checkRes: '⚠ 发现造价描述不一致',
              checkStatus: 2,
              desc: '第2页概述中提到"投资约450万元"，与第56页详细预算441万元存在差异',
              key: 41,
              name: '上下文造价是否一致',
              tip: '检查文档内造价数据一致性',
            },
          ],
          color: 'rgb(147,51,234)',
          count: 2,
          icon: <PayCircleOutlined style={{ color: 'rgb(147,51,234)' }} />,
          key: 3,
          name: '财务合规性验证',
          status: 1,
          tip: '预算数据准确性和一致性检查',
        },
        {
          alertObj: {
            passNum: 3,
            rejectNum: 2,
            warnNum: 0,
          },
          bgColor: 'rgb(238,242,255)',
          children: [
            {
              area: '第7-8页',
              checkRes: '✓ 数据来源清晰明确',
              checkStatus: 1,
              desc: '明确列出了12个业务部门作为数据来源：公安、工商、税务、质监、民政、劳动、计生等',
              key: 50,
              name: '采集来源是否清楚',
              tip: '检查数据采集来源描述',
            },
            {
              area: '第25-28页',
              checkRes: '✓ 数据归集方案明确',
              checkStatus: 1,
              desc: '详细描述了星型交换结构的数据归集模式',
              key: 50,
              name: '数据归集是否清楚',
              tip: '检查数据归集方案',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创技术说明不充分',
              checkStatus: 2,
              desc: '未详细说明信创产品的具体选型和技术路线',
              key: 50,
              name: '信创技术是否说明',
              tip: '检查信创技术说明',
            },
          ],
          color: 'rgb(79,70,229)',
          count: 5,
          icon: <ProfileOutlined style={{ color: 'rgb(79,70,229)' }} />,
          key: 4,
          name: '业务清晰度验证',
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
        //   icon: <LinkOutlined style={{ color: 'rgb(13,148,136)' }} />,
        //   key: 5,
        //   name: '关联性验证',
        //   status: 2,
        //   tip: '项目、系统、机房、专网关联检查',
        // },
      ],
      size: 2.3,
      status: 2,
      system: '智能审核系统v2.0',
      updateTime: '2025-07-03 14:56',
      user: '张三',
      warnNum: 7,
    },
    {
      company: '智慧城市建设中心',
      downloadCount: 8,
      errorList: [
        {
          area: '第36页',
          checkRes: '文档中提及新建机房，违反不予立项条款',
          checkStatus: 3,
          id: 111,
          name: '不予立项核验',
        },
        {
          area: '第56页，申请表第2页',
          checkRes: '基础平台建设费用在可研报告与申请表中不一致',
          checkStatus: 3,
          id: 112,
          name: '跨文件造价一致性核验',
        },
        {
          area: '第23页',
          checkRes: '缺少附表3：系统运行维护费估算表',
          checkStatus: 2,
          id: 113,
          name: '附表齐全核验',
        },
        {
          area: '第22页',
          checkRes: '信创技术描述不够详细，缺少具体技术方案',
          checkStatus: 2,
          id: 114,
          name: '信创描述',
        },
        {
          area: '第2页、第56页',
          checkRes: '建议统一文档中的投资金额描述',
          checkStatus: 4,
          id: 115,
          name: '上下文造价一致性',
        },
      ],
      fraction: 92,
      groupName: '智慧城市项目',
      id: 2,
      money: '850万元',
      name: '智慧城市管理平台实施方案.docx',
      passNum: 35,
      range: '2025年3月 - 2026年3月',
      rejectNum: 1,
      ruleList: [
        {
          alertObj: {
            passNum: 2,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(239,246,255)',
          children: [
            {
              area: '全文档',
              checkRes: '✓ 文档包含所有必需章节',
              checkStatus: 1,
              desc: '已检查7个主要章节：总论、需求分析、设计方案、运营保障、预算经费、风险分析、效益分析，全部符合模板要求',
              key: 10,
              name: '缺章少节核验',
              tip: '提取模板规定的章节与可研报告章节进行比对',
            },
            {
              area: '第23页',
              checkRes: '⚠ 缺少附表3：系统运行维护费估算表',
              checkStatus: 2,
              desc: '模板要求5个附表，实际提供4个。缺少：系统运行维护费估算表',
              key: 11,
              name: '附表齐全核验',
              tip: '检查模板要求的附表是否齐全',
            },
            {
              area: '附表1-4',
              checkRes: '✓ 附表结构符合规范要求',
              checkStatus: 1,
              desc: '表格一级标题、二级标题格式正确，包含：系统开发实施工作量测算表、软硬件配置清单、系统运行维护费估算表、项目投资估算表',
              key: 12,
              name: '附表规范性核验',
              tip: '检查附表结构标准性',
            },
          ],
          color: 'rgb(37,99,235)',
          count: 3,
          icon: <FileTextOutlined style={{ color: 'rgb(37,99,235)' }} />,
          key: 0,
          name: '结构完整性验证',
          status: 1,
          tip: '文档结构、章节、附表完整性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 0,
            warnNum: 1,
          },
          bgColor: 'rgb(240,253,244)',
          children: [
            {
              area: '第56页，申请表第2页',
              checkRes: '✗ 发现造价不一致',
              checkStatus: 3,
              desc: '系统填报：441万元，项目申请表：441万元，可研报告总计：441万元，但分项明细存在差异：基础平台建设75万元与申请表中的80万元不符',
              key: 20,
              name: '跨文件造价一致性核验',
              tip: '对比系统填报、项目申请表、可研报告三处造价',
            },
            {
              area: '第2章、第3章',
              checkRes: '✓ 服务内容完全覆盖需求分析',
              checkStatus: 1,
              desc: '需求分析中的11项功能需求在建设方案中均有对应实现',
              key: 21,
              name: '需求内容是否在服务内容中全部体现',
              tip: '验证需求分析与建设内容的对应关系',
            },
          ],
          color: 'rgb(22,163,74)',
          count: 2,
          icon: <BarChartOutlined style={{ color: 'rgb(22,163,74)' }} />,
          key: 1,
          name: '数据一致性验证',
          status: 1,
          tip: '跨文件数据一致性检查',
        },
        {
          alertObj: {
            passNum: 5,
            rejectNum: 2,
            warnNum: 1,
          },
          bgColor: 'rgb(255,247,237)',
          children: [
            {
              area: '第36页',
              checkRes: '✗ 文档中提及新建机房，违反不予立项条款',
              checkStatus: 3,
              desc: '在第36页中提到"新建数据中心机房"，违反了"原则上不允许建设机房"的政策要求',
              key: 30,
              name: '不予立项核验',
              tip: '检查是否违反不予立项条款',
            },
            {
              area: '第46页',
              checkRes: '✓ 系统定级为等级保护三级',
              checkStatus: 1,
              desc: '在第46页明确提出系统按照等级保护三级标准建设',
              key: 31,
              name: '系统定级是否明确',
              tip: '提取系统等级保护定级信息',
            },
            {
              area: '第44-48页',
              checkRes: '✓ 详细描述了安全防护措施',
              checkStatus: 1,
              desc: '第44-48页详细描述了物理安全、网络安全、系统安全、应用安全、数据安全五个层面的防护措施',
              key: 32,
              name: '对应的安全防护是否描述',
              tip: '检查等级保护措施描述',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创描述不够详细',
              checkStatus: 2,
              desc: '仅在第22页简单提及信创要求，缺少具体的信创技术方案和产品选型',
              key: 33,
              name: '信创是否描述',
              tip: '检查信创技术描述',
            },
            {
              area: '第22页',
              checkRes: '✓ 明确了政务云部署方案',
              checkStatus: 1,
              desc: '第40页详细说明了基于政务云的部署架构',
              key: 34,
              name: '上云是否描述',
              tip: '检查上云方案描述',
            },
          ],
          color: 'rgb(234,88,12)',
          count: 8,
          icon: <ExclamationCircleOutlined style={{ color: 'rgb(234,88,12)' }} />,
          key: 2,
          name: '合规性验证',
          status: 1,
          tip: '合规要求和政策符合性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(250,245,255)',
          children: [
            {
              area: '第56页',
              checkRes: '✓ 总价与分项汇总一致',
              checkStatus: 1,
              desc: '总投资441万元与各分项汇总金额一致：基础平台75万+交换平台120万+信息库50万+专项建设160万+监理实施36万=441万',
              key: 40,
              name: '总分造价是否一致',
              tip: '比对总预算与分项预算',
            },
            {
              area: '第2页、第56页',
              checkRes: '⚠ 发现造价描述不一致',
              checkStatus: 2,
              desc: '第2页概述中提到"投资约450万元"，与第56页详细预算441万元存在差异',
              key: 41,
              name: '上下文造价是否一致',
              tip: '检查文档内造价数据一致性',
            },
          ],
          color: 'rgb(147,51,234)',
          count: 2,
          icon: <PayCircleOutlined style={{ color: 'rgb(147,51,234)' }} />,
          key: 3,
          name: '财务合规性验证',
          status: 1,
          tip: '预算数据准确性和一致性检查',
        },
        {
          alertObj: {
            passNum: 3,
            rejectNum: 2,
            warnNum: 0,
          },
          bgColor: 'rgb(238,242,255)',
          children: [
            {
              area: '第7-8页',
              checkRes: '✓ 数据来源清晰明确',
              checkStatus: 1,
              desc: '明确列出了12个业务部门作为数据来源：公安、工商、税务、质监、民政、劳动、计生等',
              key: 50,
              name: '采集来源是否清楚',
              tip: '检查数据采集来源描述',
            },
            {
              area: '第25-28页',
              checkRes: '✓ 数据归集方案明确',
              checkStatus: 1,
              desc: '详细描述了星型交换结构的数据归集模式',
              key: 50,
              name: '数据归集是否清楚',
              tip: '检查数据归集方案',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创技术说明不充分',
              checkStatus: 2,
              desc: '未详细说明信创产品的具体选型和技术路线',
              key: 50,
              name: '信创技术是否说明',
              tip: '检查信创技术说明',
            },
          ],
          color: 'rgb(79,70,229)',
          count: 5,
          icon: <ProfileOutlined style={{ color: 'rgb(79,70,229)' }} />,
          key: 4,
          name: '业务清晰度验证',
          status: 1,
          tip: '关键业务要素明确性检查',
        },
      ],
      size: 1.8,
      status: 1,
      system: '智能审核系统v2.0',
      updateTime: '2025-07-02 18:02',
      user: '李四',
      warnNum: 2,
    },
    {
      company: '政务服务中心',
      downloadCount: 12,
      errorList: [
        {
          area: '第36页',
          checkRes: '文档中提及新建机房，违反不予立项条款',
          checkStatus: 3,
          id: 111,
          name: '不予立项核验',
        },
        {
          area: '第56页，申请表第2页',
          checkRes: '基础平台建设费用在可研报告与申请表中不一致',
          checkStatus: 3,
          id: 112,
          name: '跨文件造价一致性核验',
        },
        {
          area: '第23页',
          checkRes: '缺少附表3：系统运行维护费估算表',
          checkStatus: 2,
          id: 113,
          name: '附表齐全核验',
        },
        {
          area: '第22页',
          checkRes: '信创技术描述不够详细，缺少具体技术方案',
          checkStatus: 2,
          id: 114,
          name: '信创描述',
        },
        {
          area: '第2页、第56页',
          checkRes: '建议统一文档中的投资金额描述',
          checkStatus: 4,
          id: 115,
          name: '上下文造价一致性',
        },
      ],
      fraction: 45,
      groupName: '电子政务升级项目',
      id: 3,
      money: '320万元',
      name: '电子政务系统升级改造方案.pdf',
      passNum: 17,
      range: '2025年3月 - 2026年3月',
      rejectNum: 13,
      ruleList: [
        {
          alertObj: {
            passNum: 2,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(239,246,255)',
          children: [
            {
              area: '全文档',
              checkRes: '✓ 文档包含所有必需章节',
              checkStatus: 1,
              desc: '已检查7个主要章节：总论、需求分析、设计方案、运营保障、预算经费、风险分析、效益分析，全部符合模板要求',
              key: 10,
              name: '缺章少节核验',
              tip: '提取模板规定的章节与可研报告章节进行比对',
            },
            {
              area: '第23页',
              checkRes: '⚠ 缺少附表3：系统运行维护费估算表',
              checkStatus: 2,
              desc: '模板要求5个附表，实际提供4个。缺少：系统运行维护费估算表',
              key: 11,
              name: '附表齐全核验',
              tip: '检查模板要求的附表是否齐全',
            },
            {
              area: '附表1-4',
              checkRes: '✓ 附表结构符合规范要求',
              checkStatus: 1,
              desc: '表格一级标题、二级标题格式正确，包含：系统开发实施工作量测算表、软硬件配置清单、系统运行维护费估算表、项目投资估算表',
              key: 12,
              name: '附表规范性核验',
              tip: '检查附表结构标准性',
            },
          ],
          color: 'rgb(37,99,235)',
          count: 3,
          icon: <FileTextOutlined style={{ color: 'rgb(37,99,235)' }} />,
          key: 0,
          name: '结构完整性验证',
          status: 1,
          tip: '文档结构、章节、附表完整性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 0,
            warnNum: 1,
          },
          bgColor: 'rgb(240,253,244)',
          children: [
            {
              area: '第56页，申请表第2页',
              checkRes: '✗ 发现造价不一致',
              checkStatus: 3,
              desc: '系统填报：441万元，项目申请表：441万元，可研报告总计：441万元，但分项明细存在差异：基础平台建设75万元与申请表中的80万元不符',
              key: 20,
              name: '跨文件造价一致性核验',
              tip: '对比系统填报、项目申请表、可研报告三处造价',
            },
            {
              area: '第2章、第3章',
              checkRes: '✓ 服务内容完全覆盖需求分析',
              checkStatus: 1,
              desc: '需求分析中的11项功能需求在建设方案中均有对应实现',
              key: 21,
              name: '需求内容是否在服务内容中全部体现',
              tip: '验证需求分析与建设内容的对应关系',
            },
          ],
          color: 'rgb(22,163,74)',
          count: 2,
          icon: <BarChartOutlined style={{ color: 'rgb(22,163,74)' }} />,
          key: 1,
          name: '数据一致性验证',
          status: 1,
          tip: '跨文件数据一致性检查',
        },
        {
          alertObj: {
            passNum: 5,
            rejectNum: 2,
            warnNum: 1,
          },
          bgColor: 'rgb(255,247,237)',
          children: [
            {
              area: '第36页',
              checkRes: '✗ 文档中提及新建机房，违反不予立项条款',
              checkStatus: 3,
              desc: '在第36页中提到"新建数据中心机房"，违反了"原则上不允许建设机房"的政策要求',
              key: 30,
              name: '不予立项核验',
              tip: '检查是否违反不予立项条款',
            },
            {
              area: '第46页',
              checkRes: '✓ 系统定级为等级保护三级',
              checkStatus: 1,
              desc: '在第46页明确提出系统按照等级保护三级标准建设',
              key: 31,
              name: '系统定级是否明确',
              tip: '提取系统等级保护定级信息',
            },
            {
              area: '第44-48页',
              checkRes: '✓ 详细描述了安全防护措施',
              checkStatus: 1,
              desc: '第44-48页详细描述了物理安全、网络安全、系统安全、应用安全、数据安全五个层面的防护措施',
              key: 32,
              name: '对应的安全防护是否描述',
              tip: '检查等级保护措施描述',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创描述不够详细',
              checkStatus: 2,
              desc: '仅在第22页简单提及信创要求，缺少具体的信创技术方案和产品选型',
              key: 33,
              name: '信创是否描述',
              tip: '检查信创技术描述',
            },
            {
              area: '第22页',
              checkRes: '✓ 明确了政务云部署方案',
              checkStatus: 1,
              desc: '第40页详细说明了基于政务云的部署架构',
              key: 34,
              name: '上云是否描述',
              tip: '检查上云方案描述',
            },
          ],
          color: 'rgb(234,88,12)',
          count: 8,
          icon: <ExclamationCircleOutlined style={{ color: 'rgb(234,88,12)' }} />,
          key: 2,
          name: '合规性验证',
          status: 1,
          tip: '合规要求和政策符合性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(250,245,255)',
          children: [
            {
              area: '第56页',
              checkRes: '✓ 总价与分项汇总一致',
              checkStatus: 1,
              desc: '总投资441万元与各分项汇总金额一致：基础平台75万+交换平台120万+信息库50万+专项建设160万+监理实施36万=441万',
              key: 40,
              name: '总分造价是否一致',
              tip: '比对总预算与分项预算',
            },
            {
              area: '第2页、第56页',
              checkRes: '⚠ 发现造价描述不一致',
              checkStatus: 2,
              desc: '第2页概述中提到"投资约450万元"，与第56页详细预算441万元存在差异',
              key: 41,
              name: '上下文造价是否一致',
              tip: '检查文档内造价数据一致性',
            },
          ],
          color: 'rgb(147,51,234)',
          count: 2,
          icon: <PayCircleOutlined style={{ color: 'rgb(147,51,234)' }} />,
          key: 3,
          name: '财务合规性验证',
          status: 1,
          tip: '预算数据准确性和一致性检查',
        },
        {
          alertObj: {
            passNum: 3,
            rejectNum: 2,
            warnNum: 0,
          },
          bgColor: 'rgb(238,242,255)',
          children: [
            {
              area: '第7-8页',
              checkRes: '✓ 数据来源清晰明确',
              checkStatus: 1,
              desc: '明确列出了12个业务部门作为数据来源：公安、工商、税务、质监、民政、劳动、计生等',
              key: 50,
              name: '采集来源是否清楚',
              tip: '检查数据采集来源描述',
            },
            {
              area: '第25-28页',
              checkRes: '✓ 数据归集方案明确',
              checkStatus: 1,
              desc: '详细描述了星型交换结构的数据归集模式',
              key: 50,
              name: '数据归集是否清楚',
              tip: '检查数据归集方案',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创技术说明不充分',
              checkStatus: 2,
              desc: '未详细说明信创产品的具体选型和技术路线',
              key: 50,
              name: '信创技术是否说明',
              tip: '检查信创技术说明',
            },
          ],
          color: 'rgb(79,70,229)',
          count: 5,
          icon: <ProfileOutlined style={{ color: 'rgb(79,70,229)' }} />,
          key: 4,
          name: '业务清晰度验证',
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
        //   icon: <LinkOutlined style={{ color: 'rgb(13,148,136)' }} />,
        //   key: 5,
        //   name: '关联性验证',
        //   status: 2,
        //   tip: '项目、系统、机房、专网关联检查',
        // },
      ],
      size: 3.1,
      status: 3,
      system: '智能审核系统v2.0',
      updateTime: '2025-07-01 11:12',
      user: '王五',
      warnNum: 8,
    },
    {
      company: '信息化管理中心',
      downloadCount: 6,
      errorList: [
        {
          area: '第36页',
          checkRes: '文档中提及新建机房，违反不予立项条款',
          checkStatus: 3,
          id: 111,
          name: '不予立项核验',
        },
        {
          area: '第56页，申请表第2页',
          checkRes: '基础平台建设费用在可研报告与申请表中不一致',
          checkStatus: 3,
          id: 112,
          name: '跨文件造价一致性核验',
        },
        {
          area: '第23页',
          checkRes: '缺少附表3：系统运行维护费估算表',
          checkStatus: 2,
          id: 113,
          name: '附表齐全核验',
        },
        {
          area: '第22页',
          checkRes: '信创技术描述不够详细，缺少具体技术方案',
          checkStatus: 2,
          id: 114,
          name: '信创描述',
        },
        {
          area: '第2页、第56页',
          checkRes: '建议统一文档中的投资金额描述',
          checkStatus: 4,
          id: 115,
          name: '上下文造价一致性',
        },
      ],
      fraction: 88,
      groupName: '数字化办公项目',
      id: 4,
      money: '180万元',
      name: '数字化办公平台建设方案.pdf',
      passNum: 33,
      range: '2025年3月 - 2026年3月',
      rejectNum: 1,
      ruleList: [
        {
          alertObj: {
            passNum: 2,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(239,246,255)',
          children: [
            {
              area: '全文档',
              checkRes: '✓ 文档包含所有必需章节',
              checkStatus: 1,
              desc: '已检查7个主要章节：总论、需求分析、设计方案、运营保障、预算经费、风险分析、效益分析，全部符合模板要求',
              key: 10,
              name: '缺章少节核验',
              tip: '提取模板规定的章节与可研报告章节进行比对',
            },
            {
              area: '第23页',
              checkRes: '⚠ 缺少附表3：系统运行维护费估算表',
              checkStatus: 2,
              desc: '模板要求5个附表，实际提供4个。缺少：系统运行维护费估算表',
              key: 11,
              name: '附表齐全核验',
              tip: '检查模板要求的附表是否齐全',
            },
            {
              area: '附表1-4',
              checkRes: '✓ 附表结构符合规范要求',
              checkStatus: 1,
              desc: '表格一级标题、二级标题格式正确，包含：系统开发实施工作量测算表、软硬件配置清单、系统运行维护费估算表、项目投资估算表',
              key: 12,
              name: '附表规范性核验',
              tip: '检查附表结构标准性',
            },
          ],
          color: 'rgb(37,99,235)',
          count: 3,
          icon: (
            <FileTextOutlined style={{ color: 'rgb(37,99,235)', fontSize: 26, marginRight: 20 }} />
          ),
          key: 0,
          name: '结构完整性验证',
          status: 1,
          tip: '文档结构、章节、附表完整性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 0,
            warnNum: 1,
          },
          bgColor: 'rgb(240,253,244)',
          children: [
            {
              area: '第56页，申请表第2页',
              checkRes: '✗ 发现造价不一致',
              checkStatus: 3,
              desc: '系统填报：441万元，项目申请表：441万元，可研报告总计：441万元，但分项明细存在差异：基础平台建设75万元与申请表中的80万元不符',
              key: 20,
              name: '跨文件造价一致性核验',
              tip: '对比系统填报、项目申请表、可研报告三处造价',
            },
            {
              area: '第2章、第3章',
              checkRes: '✓ 服务内容完全覆盖需求分析',
              checkStatus: 1,
              desc: '需求分析中的11项功能需求在建设方案中均有对应实现',
              key: 21,
              name: '需求内容是否在服务内容中全部体现',
              tip: '验证需求分析与建设内容的对应关系',
            },
          ],
          color: 'rgb(22,163,74)',
          count: 2,
          icon: (
            <BarChartOutlined style={{ color: 'rgb(22,163,74)', fontSize: 26, marginRight: 20 }} />
          ),
          key: 1,
          name: '数据一致性验证',
          status: 1,
          tip: '跨文件数据一致性检查',
        },
        {
          alertObj: {
            passNum: 5,
            rejectNum: 2,
            warnNum: 1,
          },
          bgColor: 'rgb(255,247,237)',
          children: [
            {
              area: '第36页',
              checkRes: '✗ 文档中提及新建机房，违反不予立项条款',
              checkStatus: 3,
              desc: '在第36页中提到"新建数据中心机房"，违反了"原则上不允许建设机房"的政策要求',
              key: 30,
              name: '不予立项核验',
              tip: '检查是否违反不予立项条款',
            },
            {
              area: '第46页',
              checkRes: '✓ 系统定级为等级保护三级',
              checkStatus: 1,
              desc: '在第46页明确提出系统按照等级保护三级标准建设',
              key: 31,
              name: '系统定级是否明确',
              tip: '提取系统等级保护定级信息',
            },
            {
              area: '第44-48页',
              checkRes: '✓ 详细描述了安全防护措施',
              checkStatus: 1,
              desc: '第44-48页详细描述了物理安全、网络安全、系统安全、应用安全、数据安全五个层面的防护措施',
              key: 32,
              name: '对应的安全防护是否描述',
              tip: '检查等级保护措施描述',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创描述不够详细',
              checkStatus: 2,
              desc: '仅在第22页简单提及信创要求，缺少具体的信创技术方案和产品选型',
              key: 33,
              name: '信创是否描述',
              tip: '检查信创技术描述',
            },
            {
              area: '第22页',
              checkRes: '✓ 明确了政务云部署方案',
              checkStatus: 1,
              desc: '第40页详细说明了基于政务云的部署架构',
              key: 34,
              name: '上云是否描述',
              tip: '检查上云方案描述',
            },
          ],
          color: 'rgb(234,88,12)',
          count: 8,
          icon: (
            <ExclamationCircleOutlined
              style={{ color: 'rgb(234,88,12)', fontSize: 26, marginRight: 20 }}
            />
          ),
          key: 2,
          name: '合规性验证',
          status: 1,
          tip: '合规要求和政策符合性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(250,245,255)',
          children: [
            {
              area: '第56页',
              checkRes: '✓ 总价与分项汇总一致',
              checkStatus: 1,
              desc: '总投资441万元与各分项汇总金额一致：基础平台75万+交换平台120万+信息库50万+专项建设160万+监理实施36万=441万',
              key: 40,
              name: '总分造价是否一致',
              tip: '比对总预算与分项预算',
            },
            {
              area: '第2页、第56页',
              checkRes: '⚠ 发现造价描述不一致',
              checkStatus: 2,
              desc: '第2页概述中提到"投资约450万元"，与第56页详细预算441万元存在差异',
              key: 41,
              name: '上下文造价是否一致',
              tip: '检查文档内造价数据一致性',
            },
          ],
          color: 'rgb(147,51,234)',
          count: 2,
          icon: (
            <PayCircleOutlined
              style={{ color: 'rgb(147,51,234)', fontSize: 26, marginRight: 20 }}
            />
          ),
          key: 3,
          name: '财务合规性验证',
          status: 1,
          tip: '预算数据准确性和一致性检查',
        },
        {
          alertObj: {
            passNum: 3,
            rejectNum: 2,
            warnNum: 0,
          },
          bgColor: 'rgb(238,242,255)',
          children: [
            {
              area: '第7-8页',
              checkRes: '✓ 数据来源清晰明确',
              checkStatus: 1,
              desc: '明确列出了12个业务部门作为数据来源：公安、工商、税务、质监、民政、劳动、计生等',
              key: 50,
              name: '采集来源是否清楚',
              tip: '检查数据采集来源描述',
            },
            {
              area: '第25-28页',
              checkRes: '✓ 数据归集方案明确',
              checkStatus: 1,
              desc: '详细描述了星型交换结构的数据归集模式',
              key: 50,
              name: '数据归集是否清楚',
              tip: '检查数据归集方案',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创技术说明不充分',
              checkStatus: 2,
              desc: '未详细说明信创产品的具体选型和技术路线',
              key: 50,
              name: '信创技术是否说明',
              tip: '检查信创技术说明',
            },
          ],
          color: 'rgb(79,70,229)',
          count: 5,
          icon: (
            <ProfileOutlined style={{ color: 'rgb(79,70,229)', fontSize: 26, marginRight: 20 }} />
          ),
          key: 4,
          name: '业务清晰度验证',
          status: 1,
          tip: '关键业务要素明确性检查',
        },
      ],
      size: 1.5,
      status: 1,
      system: '智能审核系统v2.0',
      updateTime: '2025-06-28 08:00',
      user: '赵六',
      warnNum: 4,
    },
    {
      company: '区块链技术中心',
      downloadCount: 15,
      errorList: [
        {
          area: '第36页',
          checkRes: '文档中提及新建机房，违反不予立项条款',
          checkStatus: 3,
          id: 111,
          name: '不予立项核验',
        },
        {
          area: '第56页，申请表第2页',
          checkRes: '基础平台建设费用在可研报告与申请表中不一致',
          checkStatus: 3,
          id: 112,
          name: '跨文件造价一致性核验',
        },
        {
          area: '第23页',
          checkRes: '缺少附表3：系统运行维护费估算表',
          checkStatus: 2,
          id: 113,
          name: '附表齐全核验',
        },
        {
          area: '第22页',
          checkRes: '信创技术描述不够详细，缺少具体技术方案',
          checkStatus: 2,
          id: 114,
          name: '信创描述',
        },
        {
          area: '第2页、第56页',
          checkRes: '建议统一文档中的投资金额描述',
          checkStatus: 4,
          id: 115,
          name: '上下文造价一致性',
        },
      ],
      fraction: 78,
      groupName: '区块链政务服务项目',
      id: 5,
      money: '650万元',
      name: '区块链政务服务平台可研报告.pdf',
      passNum: 29,
      range: '2025年3月 - 2026年3月',
      rejectNum: 3,
      ruleList: [
        {
          alertObj: {
            passNum: 2,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(239,246,255)',
          children: [
            {
              area: '全文档',
              checkRes: '✓ 文档包含所有必需章节',
              checkStatus: 1,
              desc: '已检查7个主要章节：总论、需求分析、设计方案、运营保障、预算经费、风险分析、效益分析，全部符合模板要求',
              key: 10,
              name: '缺章少节核验',
              tip: '提取模板规定的章节与可研报告章节进行比对',
            },
            {
              area: '第23页',
              checkRes: '⚠ 缺少附表3：系统运行维护费估算表',
              checkStatus: 2,
              desc: '模板要求5个附表，实际提供4个。缺少：系统运行维护费估算表',
              key: 11,
              name: '附表齐全核验',
              tip: '检查模板要求的附表是否齐全',
            },
            {
              area: '附表1-4',
              checkRes: '✓ 附表结构符合规范要求',
              checkStatus: 1,
              desc: '表格一级标题、二级标题格式正确，包含：系统开发实施工作量测算表、软硬件配置清单、系统运行维护费估算表、项目投资估算表',
              key: 12,
              name: '附表规范性核验',
              tip: '检查附表结构标准性',
            },
          ],
          color: 'rgb(37,99,235)',
          count: 3,
          icon: <FileTextOutlined style={{ color: 'rgb(37,99,235)' }} />,
          key: 0,
          name: '结构完整性验证',
          status: 1,
          tip: '文档结构、章节、附表完整性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 0,
            warnNum: 1,
          },
          bgColor: 'rgb(240,253,244)',
          children: [
            {
              area: '第56页，申请表第2页',
              checkRes: '✗ 发现造价不一致',
              checkStatus: 3,
              desc: '系统填报：441万元，项目申请表：441万元，可研报告总计：441万元，但分项明细存在差异：基础平台建设75万元与申请表中的80万元不符',
              key: 20,
              name: '跨文件造价一致性核验',
              tip: '对比系统填报、项目申请表、可研报告三处造价',
            },
            {
              area: '第2章、第3章',
              checkRes: '✓ 服务内容完全覆盖需求分析',
              checkStatus: 1,
              desc: '需求分析中的11项功能需求在建设方案中均有对应实现',
              key: 21,
              name: '需求内容是否在服务内容中全部体现',
              tip: '验证需求分析与建设内容的对应关系',
            },
          ],
          color: 'rgb(22,163,74)',
          count: 2,
          icon: <BarChartOutlined style={{ color: 'rgb(22,163,74)' }} />,
          key: 1,
          name: '数据一致性验证',
          status: 1,
          tip: '跨文件数据一致性检查',
        },
        {
          alertObj: {
            passNum: 5,
            rejectNum: 2,
            warnNum: 1,
          },
          bgColor: 'rgb(255,247,237)',
          children: [
            {
              area: '第36页',
              checkRes: '✗ 文档中提及新建机房，违反不予立项条款',
              checkStatus: 3,
              desc: '在第36页中提到"新建数据中心机房"，违反了"原则上不允许建设机房"的政策要求',
              key: 30,
              name: '不予立项核验',
              tip: '检查是否违反不予立项条款',
            },
            {
              area: '第46页',
              checkRes: '✓ 系统定级为等级保护三级',
              checkStatus: 1,
              desc: '在第46页明确提出系统按照等级保护三级标准建设',
              key: 31,
              name: '系统定级是否明确',
              tip: '提取系统等级保护定级信息',
            },
            {
              area: '第44-48页',
              checkRes: '✓ 详细描述了安全防护措施',
              checkStatus: 1,
              desc: '第44-48页详细描述了物理安全、网络安全、系统安全、应用安全、数据安全五个层面的防护措施',
              key: 32,
              name: '对应的安全防护是否描述',
              tip: '检查等级保护措施描述',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创描述不够详细',
              checkStatus: 2,
              desc: '仅在第22页简单提及信创要求，缺少具体的信创技术方案和产品选型',
              key: 33,
              name: '信创是否描述',
              tip: '检查信创技术描述',
            },
            {
              area: '第22页',
              checkRes: '✓ 明确了政务云部署方案',
              checkStatus: 1,
              desc: '第40页详细说明了基于政务云的部署架构',
              key: 34,
              name: '上云是否描述',
              tip: '检查上云方案描述',
            },
          ],
          color: 'rgb(234,88,12)',
          count: 8,
          icon: <ExclamationCircleOutlined style={{ color: 'rgb(234,88,12)' }} />,
          key: 2,
          name: '合规性验证',
          status: 1,
          tip: '合规要求和政策符合性检查',
        },
        {
          alertObj: {
            passNum: 1,
            rejectNum: 1,
            warnNum: 0,
          },
          bgColor: 'rgb(250,245,255)',
          children: [
            {
              area: '第56页',
              checkRes: '✓ 总价与分项汇总一致',
              checkStatus: 1,
              desc: '总投资441万元与各分项汇总金额一致：基础平台75万+交换平台120万+信息库50万+专项建设160万+监理实施36万=441万',
              key: 40,
              name: '总分造价是否一致',
              tip: '比对总预算与分项预算',
            },
            {
              area: '第2页、第56页',
              checkRes: '⚠ 发现造价描述不一致',
              checkStatus: 2,
              desc: '第2页概述中提到"投资约450万元"，与第56页详细预算441万元存在差异',
              key: 41,
              name: '上下文造价是否一致',
              tip: '检查文档内造价数据一致性',
            },
          ],
          color: 'rgb(147,51,234)',
          count: 2,
          icon: <PayCircleOutlined style={{ color: 'rgb(147,51,234)' }} />,
          key: 3,
          name: '财务合规性验证',
          status: 1,
          tip: '预算数据准确性和一致性检查',
        },
        {
          alertObj: {
            passNum: 3,
            rejectNum: 2,
            warnNum: 0,
          },
          bgColor: 'rgb(238,242,255)',
          children: [
            {
              area: '第7-8页',
              checkRes: '✓ 数据来源清晰明确',
              checkStatus: 1,
              desc: '明确列出了12个业务部门作为数据来源：公安、工商、税务、质监、民政、劳动、计生等',
              key: 50,
              name: '采集来源是否清楚',
              tip: '检查数据采集来源描述',
            },
            {
              area: '第25-28页',
              checkRes: '✓ 数据归集方案明确',
              checkStatus: 1,
              desc: '详细描述了星型交换结构的数据归集模式',
              key: 50,
              name: '数据归集是否清楚',
              tip: '检查数据归集方案',
            },
            {
              area: '第22页',
              checkRes: '⚠ 信创技术说明不充分',
              checkStatus: 2,
              desc: '未详细说明信创产品的具体选型和技术路线',
              key: 50,
              name: '信创技术是否说明',
              tip: '检查信创技术说明',
            },
          ],
          color: 'rgb(79,70,229)',
          count: 5,
          icon: <ProfileOutlined style={{ color: 'rgb(79,70,229)' }} />,
          key: 4,
          name: '业务清晰度验证',
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
        //   icon: <LinkOutlined style={{ color: 'rgb(13,148,136)' }} />,
        //   key: 5,
        //   name: '关联性验证',
        //   status: 2,
        //   tip: '项目、系统、机房、专网关联检查',
        // },
      ],
      size: 2.7,
      status: 2,
      system: '智能审核系统v2.0',
      updateTime: '2025-06-06 14:52',
      user: '孙七',
      warnNum: 6,
    },
  ];

  const getList = () => {
    setList(listData);
    setPagination({
      ...pagination,
      total: listData.length,
    });
  };

  const [current, setCurrent] = useState<any>(list[0]);
  const openLeft = async (record: any) => {
    setCurrent(record);
    setLeftVisible(false);
    setDetailVisible(true);
  };

  const getStatusIcon = (status: any, fontSize = 26, marginRight = 10) => {
    let comp: any;
    switch (status) {
      case 1: {
        comp = <CheckCircleOutlined style={{ color: 'rgb(22,163,74)', fontSize, marginRight }} />;
        break;
      }

      case 2: {
        comp = <WarningOutlined style={{ color: 'rgb(234,88,12)', fontSize, marginRight }} />;
        break;
      }

      case 3: {
        comp = <CloseCircleOutlined style={{ color: 'rgb(220,38,38)', fontSize, marginRight }} />;

        break;
      }

      default: {
        comp = (
          <ExclamationCircleOutlined style={{ color: 'rgb(59,130,246)', fontSize, marginRight }} />
        );
      }
    }
    return comp;
  };
  const getStatusTag = (status: any, fontSize = 16, padding = '4px 6px') => {
    let comp: any;
    switch (status) {
      case 1: {
        comp = (
          <Tag color="green" style={{ fontSize, padding }}>
            审核通过
          </Tag>
        );
        break;
      }

      case 2: {
        comp = (
          <Tag color="orange" style={{ fontSize, padding }}>
            有警告
          </Tag>
        );
        break;
      }

      case 3: {
        comp = (
          <Tag color="red" style={{ fontSize, padding }}>
            审核不通过
          </Tag>
        );

        break;
      }

      default: {
        comp = (
          <Tag color="blue" style={{ fontSize, padding }}>
            有建议
          </Tag>
        );
      }
    }
    return comp;
  };

  const getStatusSmTag = (status: any, fontSize = 14, padding = '2px 4px') => {
    let comp: any;
    switch (status) {
      case 1: {
        comp = (
          <Tag color="green" style={{ fontSize, padding }}>
            通过
          </Tag>
        );
        break;
      }

      case 2: {
        comp = (
          <Tag color="orange" style={{ fontSize, padding }}>
            警告
          </Tag>
        );
        break;
      }

      case 3: {
        comp = (
          <Tag color="red" style={{ fontSize, padding }}>
            不通过
          </Tag>
        );

        break;
      }

      default: {
        comp = (
          <Tag color="blue" style={{ fontSize, padding }}>
            建议
          </Tag>
        );
      }
    }
    return comp;
  };
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const getStatusText = (status: any) => {
    let str: any;
    switch (status) {
      case 1: {
        str = '通过';
        break;
      }

      case 2: {
        str = '警告';
        break;
      }

      case 3: {
        str = '严重问题';
        break;
      }

      default: {
        str = '建议';
      }
    }
    return str;
  };

  const colorMap: any = {
    1: 'rgb(22,163,74)',
    2: 'rgb(234,88,12)',
    3: 'rgb(220,38,38)',
    4: 'rgb(59,130,246)',
  };

  const colorBgMap: any = {
    1: 'rgb(239,246,255)',
    2: 'rgb(255,247,237)',
    3: 'rgb(254,242,242)',
    4: 'rgb(239,246,255)',
  };

  const columns: TableColumnsType<DataType> = [
    {
      dataIndex: 'info_name',
      render: (_value, record: any) => {
        return (
          <div className={S.infoItem}>
            <Tag
              className={S.infoIcon}
              color="rgb(239,246,255)"
              icon={<FileDoneOutlined style={{ color: 'rgb(37,99,235)' }} />}
              style={{
                fontSize: 30,
                height: 60,
                lineHeight: '60px',
                marginRight: 20,
                textAlign: 'center',
                width: 60,
              }}
            />
            <div className={S.infoRight}>
              <div style={{ marginBottom: 10 }}>{record.name}</div>
              <div className={S.infoTip}>
                <span style={{ color: '#535252' }}>
                  大小：{record.size}MB • 下载：{record.downloadCount}次
                </span>
              </div>
            </div>
          </div>
        );
      },
      title: '文档信息',
    },
    {
      dataIndex: 'info_project',
      render: (_value, record: any) => {
        return (
          <div className={S.infoProject}>
            <div className={S.infoProjectName}>{record.groupName}</div>
            <div className={S.infoProjectItem}>
              <UserOutlined style={{ marginRight: 8 }} />
              {record.user}
            </div>
            <div className={S.infoProjectItem}>
              <BankOutlined style={{ marginRight: 8 }} />
              {record.company}
            </div>
            <div className={S.infoProjectItem}>
              <PayCircleOutlined style={{ marginRight: 8 }} />
              {record.money}
            </div>
          </div>
        );
      },
      title: '项目信息',
    },
    {
      dataIndex: 'info_result',
      render: (_value, record: any) => {
        return (
          <div className={S.infoResult}>
            <div className={S.infoResultItem}>
              {getStatusIcon(record.status)}
              {getStatusTag(record.status)}
            </div>
            <div className={S.infoResultFraction} style={{ color: colorMap[record.status] }}>
              {record.fraction}分
            </div>
          </div>
        );
      },
      title: '审核结果',
    },
    {
      dataIndex: 'info_status',
      render: (_value, record: any) => {
        return (
          <div className={S.infoStatus}>
            <div className={S.infoStatusItem}>
              <div style={{ marginRight: 120 }}>通过：</div>
              <div style={{ color: colorMap[1] }}>{record.passNum}</div>
            </div>
            <div className={S.infoStatusItem}>
              <div style={{ marginRight: 120 }}>警告：</div>
              <div style={{ color: colorMap[2] }}>{record.warnNum}</div>
            </div>
            <div className={S.infoStatusItem}>
              <div style={{ marginRight: 120 }}>不通过：</div>
              <div style={{ color: colorMap[3] }}>{record.rejectNum}</div>
            </div>
            <div className={S.infoStatusTime}>
              <FieldTimeOutlined style={{ marginRight: 8 }} />
              {record.updateTime}
            </div>
          </div>
        );
      },
      title: '审核详情',
    },
    {
      dataIndex: 'action',
      render: (_value, record) => {
        return (
          <div className={S.action}>
            <Button
              onClick={() => {
                openLeft(record);
              }}
              style={{ fontSize: 18 }}
              type="link"
            >
              查看详情
            </Button>
            <DownloadOutlined style={{ color: '#535252' }} />
            <Button style={{ color: '#535252' }} type="text">
              •••
            </Button>
          </div>
        );
      },
      title: '操作',
    },
  ];
  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    onChange: onSelectChange,
    selectedRowKeys,
  };

  const overviewList: any[] = [
    {
      bgColor: 'rgb(239,246,255)',
      color: 'rgb(37,99,235)',
      count: 5,
      icon: <FileDoneOutlined style={{ color: 'rgb(37,99,235)' }} />,
      key: 0,
      name: '总报告数',
    },
    {
      bgColor: 'rgb(240,253,244)',
      color: 'rgb(22,163,74)',
      count: 2,
      icon: <CheckCircleOutlined style={{ color: 'rgb(22,163,74)' }} />,
      key: 1,
      name: '审核通过',
    },
    {
      bgColor: 'rgb(255,247,237)',
      color: 'rgb(234,88,12)',
      count: 8,
      icon: <WarningOutlined style={{ color: 'rgb(234,88,12)' }} />,
      key: 2,
      name: '有警告',
    },
    {
      bgColor: 'rgb(254,226,226)',
      color: 'rgb(220,38,38)',
      count: 2,
      icon: <CloseCircleOutlined style={{ color: 'rgb(220,38,38)' }} />,
      key: 3,
      name: '不通过',
    },
  ];

  const handleClickItem = (key: any) => {
    const hasExit = keys.find((i) => i === key);
    let newList = [];
    if (hasExit || hasExit === 0) {
      newList = keys.filter((i) => i !== key);
    } else {
      newList = keys.concat([key]);
    }
    setKeys(newList);
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
              <div className={S.btns}>
                <div className={S.tip}>查看和管理所有已完成的文档审核报告</div>
                <Button icon={<DownloadOutlined />} type="primary">
                  批量导出
                </Button>
              </div>
              <div className={S.overview}>
                {overviewList.map((i) => (
                  <div className={S.item} key={i.key}>
                    <Tag
                      className={S.itemIcon}
                      color={i.bgColor}
                      icon={i.icon}
                      style={{
                        fontSize: 30,
                        height: 60,
                        lineHeight: '60px',
                        textAlign: 'center',
                        width: 60,
                      }}
                    />
                    <div className={S.mid}>
                      <div className={S.itemName}>{i.name}</div>
                      <div className={S.itemCount} style={{ color: i.color }}>
                        {i.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={S.tableBox}>
                <div className={S.filter}>
                  <Input
                    placeholder="搜索报告名称、项目名称、提交人..."
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
                  <Select
                    className={S.filterSelect}
                    defaultValue="jack2"
                    options={[
                      { label: '全部时间', value: 'jack2' },
                      { label: '今天', value: 'lucy2' },
                      { label: '本周', value: 'Yiminghe2' },
                      { label: '本月', value: 'Yiminghe22' },
                    ]}
                    style={{ width: 120 }}
                  />
                  <Button type="text">重置</Button>
                </div>
                <Table<DataType>
                  columns={columns}
                  dataSource={list}
                  pagination={pagination}
                  rowKey={(record: any) => record.id}
                  rowSelection={rowSelection}
                />
              </div>
            </div>
          </div>
        )}
        {detailVisible && current && (
          <div className={S.drawer}>
            <div className={S.drawerHeader}>
              <div>方案审核报告</div>
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
            <div className={S.drawerContent}>
              <div className={S.drawerBtns}>
                <Button icon={<EyeOutlined />} style={{ marginRight: 10 }}>
                  查看原文档
                </Button>
                <Button icon={<DownloadOutlined />} type="primary">
                  导出报告
                </Button>
              </div>
              <div className={S.overviewCard}>
                <div className={S.overviewCardHeader}>
                  <div className={S.infoItem}>
                    <Tag
                      className={S.infoIcon}
                      color="rgb(239,246,255)"
                      icon={<FileDoneOutlined style={{ color: 'rgb(37,99,235)' }} />}
                      style={{
                        fontSize: 30,
                        height: 60,
                        lineHeight: '60px',
                        marginRight: 20,
                        textAlign: 'center',
                        width: 60,
                      }}
                    />
                    <div className={S.infoRight}>
                      <div className={S.infoName}>{current.name}</div>
                      <div className={S.infoTip}>
                        <span style={{ color: '#535252' }}>{current.groupName}</span>
                      </div>
                    </div>
                  </div>
                  <div className={S.overviewCardHeaderRight}>
                    <div
                      className={S.overview_fraction}
                      style={{ color: colorMap[current.status] }}
                    >
                      {current.fraction}%
                    </div>
                    <div className={S.overview_text}>综合得分</div>
                  </div>
                </div>
                <div className={S.overview_list}>
                  <div
                    className={S.overview_item}
                    style={{ backgroundColor: 'rgb(242, 245, 242)' }}
                  >
                    <div className={S.overview_item_count}>
                      {current.passNum + current.warnNum + current.rejectNum}
                    </div>
                    <div>总规则数</div>
                  </div>
                  <div
                    className={S.overview_item}
                    style={{ backgroundColor: 'rgb(240,253,244)', color: colorMap[1] }}
                  >
                    <div className={S.overview_item_count}>{current.passNum}</div>
                    <div>通过</div>
                  </div>
                  <div
                    className={S.overview_item}
                    style={{ backgroundColor: 'rgb(255,247,237)', color: colorMap[2] }}
                  >
                    <div className={S.overview_item_count}>{current.warnNum}</div>
                    <div>警告</div>
                  </div>
                  <div
                    className={S.overview_item}
                    style={{ backgroundColor: 'rgb(254,226,226)', color: colorMap[3] }}
                  >
                    <div className={S.overview_item_count}>{current.rejectNum}</div>
                    <div>不通过</div>
                  </div>
                </div>
                <div className={S.overview_info}>
                  <div className={S.overview_info_item}>
                    <BankOutlined style={{ fontSize: 20 }} />
                    <div className={S.overview_info_name}>实施单位：</div>
                    <div>{current.company}</div>
                  </div>
                  <div className={S.overview_info_item}>
                    <UserOutlined />
                    <div className={S.overview_info_name}>联系人：</div>
                    <div>{current.user}</div>
                  </div>
                  <div className={S.overview_info_item}>
                    <PayCircleOutlined />
                    <div className={S.overview_info_name}>总预算：</div>
                    <div>{current.money}</div>
                  </div>
                  <div className={S.overview_info_item}>
                    <ScheduleOutlined />
                    <div className={S.overview_info_name}>计划周期：</div>
                    <div>{current.range}</div>
                  </div>
                  <div className={S.overview_info_item}>
                    <ClockCircleOutlined />
                    <div className={S.overview_info_name}>审核时间：</div>
                    <div>{current.updateTime}</div>
                  </div>
                  <div className={S.overview_info_item}>
                    <FileDoneOutlined />
                    <div className={S.overview_info_name}>审核系统：</div>
                    <div>{current.system}</div>
                  </div>
                </div>
              </div>
              <div className={S.ruleCard}>
                <div className={S.filter}>
                  <Input
                    placeholder="搜索审核规则..."
                    prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                  <Select
                    className={S.filterSelect}
                    defaultValue="jack"
                    options={[
                      { label: '全部分类', value: 'jack' },
                      { label: '结构完整性', value: 'lucy' },
                      { label: '数据一致性', value: 'Yiminghe' },
                      { label: '合规性验证', value: 'Yiminghe2' },
                      { label: '财务合规性', value: 'lucy3' },
                      { label: '业务清晰度', value: 'Yiminghe3' },
                      { label: '关联性验证', value: 'Yiminghe23' },
                    ]}
                    style={{ width: 200 }}
                  />
                </div>
                <div className={S.rule_list}>
                  {current.ruleList.map((i: any) => (
                    <div className={S.rule_item} key={i.key} onClick={() => handleClickItem(i.key)}>
                      <div className={S.rule_item_header}>
                        <div className={S.infoItem}>
                          <div style={{ fontSize: 30, marginRight: 20 }}>{i.icon}</div>
                          <div className={S.infoRight}>
                            <div className={S.infoName}>{i.name}</div>
                            <div className={S.infoTip}>
                              <span style={{ color: '#535252' }}>{i.tip}</span>
                            </div>
                          </div>
                        </div>
                        <div className={S.status_right}>
                          <span style={{ color: colorMap[1] }}>{i.alertObj.passNum} 通过</span>
                          <span style={{ color: colorMap[2] }}>{i.alertObj.warnNum} 警告</span>
                          <span style={{ color: colorMap[3] }}>{i.alertObj.rejectNum} 不通过</span>
                          {keys.includes(i.key) ? <DownOutlined /> : <RightOutlined />}
                        </div>
                      </div>
                      {keys.includes(i.key) && (
                        <div className={S.rule_item_content}>
                          {i.children.map((k: any) => (
                            <div className={S.content_item} key={k.key}>
                              <div className={S.content_item_header}>
                                <div className={S.infoItem}>
                                  <div>{getStatusIcon(k.checkStatus, 26, 16)}</div>
                                  <div className={S.infoRight}>
                                    <div className={S.infoName} style={{ marginBottom: 4 }}>
                                      {k.name}
                                    </div>
                                    <div className={S.infoTip}>
                                      <span style={{ color: '#535252' }}>{k.tip}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  {getStatusSmTag(k.checkStatus)}
                                  <span className={S.content_item_area}>{k.area}</span>
                                </div>
                              </div>
                              <div className={S.content_item_bottom}>
                                <div className={S.content_item_result}>
                                  检查结果：<span>{k.checkRes}</span>
                                </div>
                                <div className={S.content_item_text}>
                                  详细说明：<span>{k.desc}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className={S.errCard}>
                <div className={S.errCard_header}>重点问题汇总</div>
                <div className={S.errCard_list}>
                  {current.errorList.map((o: any) => (
                    <div
                      className={S.errCard_item}
                      key={o.key}
                      style={{
                        backgroundColor: colorBgMap[o.checkStatus],
                        borderColor: colorMap[o.checkStatus],
                      }}
                    >
                      <div className={S.errCard_item_1}>
                        <div>{getStatusIcon(o.checkStatus)}</div>
                        <div style={{ fontSize: 20, marginRight: 16 }}>{o.name}</div>
                        <div style={{ color: colorMap[o.checkStatus] }}>
                          {getStatusText(o.checkStatus)}
                        </div>
                      </div>
                      <div className={S.errCard_item_2}>
                        <span>{o.checkRes}</span>
                      </div>
                      <div>
                        <span>位置：</span>
                        <span>{o.area}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Flexbox>
  );
});

export default Container;
