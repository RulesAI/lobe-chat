"use client";
import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Calendar, User, Building, DollarSign, Clock, AlertCircle, CheckCircle, AlertTriangle, XCircle, FileText, MoreHorizontal, FileCheck, BarChart3, FileDown } from 'lucide-react';
import './Container.module.css'

const AuditReportManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [selectedReports, setSelectedReports] = useState([]);

  // 审核报告数据
  const auditReports = [
    {
      id: 1,
      documentName: '大数据中心项目可行性研究报告.pdf',
      projectName: '大数据中心项目',
      submitter: '张三',
      unit: '一二三',
      budget: '441万元',
      auditDate: '2025-06-19 14:30',
      auditor: '智能审核系统v2.0',
      overallScore: 73,
      status: 'warning',
      passedRules: 28,
      warningRules: 7,
      failedRules: 3,
      totalRules: 38,
      reportSize: '2.3MB',
      downloadCount: 12
    },
    {
      id: 2,
      documentName: '智慧城市管理平台实施方案.docx',
      projectName: '智慧城市项目',
      submitter: '李四',
      unit: '智慧城市建设中心',
      budget: '850万元',
      auditDate: '2025-06-18 16:45',
      auditor: '智能审核系统v2.0',
      overallScore: 92,
      status: 'passed',
      passedRules: 35,
      warningRules: 2,
      failedRules: 1,
      totalRules: 38,
      reportSize: '1.8MB',
      downloadCount: 8
    },
    {
      id: 3,
      documentName: '电子政务系统升级改造方案.pdf',
      projectName: '电子政务升级项目',
      submitter: '王五',
      unit: '政务服务中心',
      budget: '320万元',
      auditDate: '2025-06-17 09:15',
      auditor: '智能审核系统v2.0',
      overallScore: 45,
      status: 'failed',
      passedRules: 17,
      warningRules: 8,
      failedRules: 13,
      totalRules: 38,
      reportSize: '3.1MB',
      downloadCount: 25
    },
    {
      id: 4,
      documentName: '数字化办公平台建设方案.pdf',
      projectName: '数字化办公项目',
      submitter: '赵六',
      unit: '信息化管理中心',
      budget: '180万元',
      auditDate: '2025-06-16 11:20',
      auditor: '智能审核系统v2.0',
      overallScore: 88,
      status: 'passed',
      passedRules: 33,
      warningRules: 4,
      failedRules: 1,
      totalRules: 38,
      reportSize: '1.5MB',
      downloadCount: 6
    },
    {
      id: 5,
      documentName: '区块链政务服务平台可研报告.pdf',
      projectName: '区块链政务服务项目',
      submitter: '孙七',
      unit: '区块链技术中心',
      budget: '650万元',
      auditDate: '2025-06-15 15:30',
      auditor: '智能审核系统v2.0',
      overallScore: 78,
      status: 'warning',
      passedRules: 29,
      warningRules: 6,
      failedRules: 3,
      totalRules: 38,
      reportSize: '2.7MB',
      downloadCount: 15
    }
  ];

  const getStatusDisplay = (status, score) => {
    switch (status) {
      case 'passed':
        return {
          text: '审核通过',
          color: 'text-green-600',
          bg: 'bg-green-50',
          icon: CheckCircle,
          badgeColor: 'bg-green-100 text-green-800'
        };
      case 'warning':
        return {
          text: '有警告',
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          icon: AlertTriangle,
          badgeColor: 'bg-orange-100 text-orange-800'
        };
      case 'failed':
        return {
          text: '审核不通过',
          color: 'text-red-600',
          bg: 'bg-red-50',
          icon: XCircle,
          badgeColor: 'bg-red-100 text-red-800'
        };
      default:
        return {
          text: '未知状态',
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          icon: AlertCircle,
          badgeColor: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredReports = auditReports.filter(report => {
    const matchesSearch = report.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.submitter.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleSelectReport = (reportId) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports.length === filteredReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(filteredReports.map(report => report.id));
    }
  };

  const handleViewReport = (report) => {
    // 跳转到文档审核结果页面
    window.open('https://claude.ai/public/artifacts/4ab64bbe-1a37-4ba6-a7b8-c35fedf015ad', '_blank');
  };

  const handleDownloadReport = (report, event) => {
    event.stopPropagation();
    console.log('下载报告:', report.documentName);
    // 实际下载逻辑
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">审核报告管理</h1>
            <p className="text-sm text-gray-600 mt-1">查看和管理所有已完成的文档审核报告</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedReports.length > 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={selectedReports.length === 0}
            >
              <Download className="w-4 h-4 mr-2 inline" />
              批量导出（{selectedReports.length}）
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 统计卡片 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">总报告数</p>
                <p className="text-2xl font-bold text-gray-900">{auditReports.length}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">审核通过</p>
                <p className="text-2xl font-bold text-green-600">
                  {auditReports.filter(r => r.status === 'passed').length}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">有警告</p>
                <p className="text-2xl font-bold text-orange-600">
                  {auditReports.filter(r => r.status === 'warning').length}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">不通过</p>
                <p className="text-2xl font-bold text-red-600">
                  {auditReports.filter(r => r.status === 'failed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索报告名称、项目名称、提交人..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部状态</option>
                <option value="passed">审核通过</option>
                <option value="warning">有警告</option>
                <option value="failed">不通过</option>
              </select>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">全部时间</option>
                <option value="today">今天</option>
                <option value="week">本周</option>
                <option value="month">本月</option>
              </select>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                重置
              </button>
            </div>
          </div>

          {/* 报告列表 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="w-12 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedReports.length === filteredReports.length && filteredReports.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">文档信息</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">项目信息</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">审核结果</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">审核详情</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => {
                  const status = getStatusDisplay(report.status, report.overallScore);
                  const StatusIcon = status.icon;
                  return (
                    <tr
                      key={report.id}
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedReports.includes(report.id) ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleViewReport(report)}
                    >
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedReports.includes(report.id)}
                          onChange={() => handleSelectReport(report.id)}
                          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.documentName}</div>
                            <div className="text-xs text-gray-500">
                              大小：{report.reportSize} • 下载：{report.downloadCount}次
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.projectName}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="flex items-center space-x-2">
                              <User className="w-3 h-3" />
                              <span>{report.submitter}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Building className="w-3 h-3" />
                              <span>{report.unit}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <DollarSign className="w-3 h-3" />
                              <span>{report.budget}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <StatusIcon className={`w-5 h-5 ${status.color}`} />
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${status.badgeColor}`}>
                            {status.text}
                          </span>
                        </div>
                        <div className={`text-lg font-bold ${getScoreColor(report.overallScore)}`}>
                          {report.overallScore}分
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">通过：</span>
                            <span className="text-green-600 font-medium">{report.passedRules}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">警告：</span>
                            <span className="text-orange-600 font-medium">{report.warningRules}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">不通过：</span>
                            <span className="text-red-600 font-medium">{report.failedRules}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {report.auditDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewReport(report)}
                            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                          >
                            查看详情
                          </button>
                          <button
                            onClick={(e) => handleDownloadReport(report, e)}
                            className="text-gray-500 hover:text-gray-600"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                共 {filteredReports.length} 条报告
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>
                  上一页
                </button>
                <span className="px-3 py-1 text-sm bg-blue-500 text-white rounded">1</span>
                <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>
                  下一页
                </button>
                <span className="text-sm text-gray-500 ml-2">共 1 页</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditReportManagement;
