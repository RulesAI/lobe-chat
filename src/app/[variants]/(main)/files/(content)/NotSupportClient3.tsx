import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle, Eye, Download, Search, Filter, MoreHorizontal, User, Bell, Settings, Home, ChevronDown, FileCheck, Plus } from 'lucide-react';

const DocumentManagementInterface = () => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showSidePanel, setShowSidePanel] = useState(false);

  const documents = [
    {
      id: 1,
      name: '大数据中心项目可行性研究报告.pdf',
      type: '可研报告',
      size: '2.3 MB',
      uploadTime: '2025-06-18 14:30',
      status: 'completed',
      passRate: 73,
      issues: { severe: 3, warning: 8, suggestion: 5 },
      project: '大数据中心项目',
      hasReport: true
    },
    {
      id: 2,
      name: '项目申请表.pdf',
      type: '申请表',
      size: '156 KB',
      uploadTime: '2025-06-18 14:25',
      status: 'reviewing',
      progress: 15,
      currentRule: '正在执行规则 15/38',
      project: '大数据中心项目',
      hasReport: false
    },
    {
      id: 3,
      name: '智慧城市管理平台实施方案.docx',
      type: '实施方案',
      size: '4.1 MB',
      uploadTime: '2025-06-17 16:45',
      status: 'completed',
      passRate: 92,
      issues: { severe: 0, warning: 2, suggestion: 3 },
      project: '智慧城市项目',
      hasReport: true
    },
    {
      id: 4,
      name: '电子政务系统升级改造方案.pdf',
      type: '可研报告',
      size: '1.8 MB',
      uploadTime: '2025-06-16 09:15',
      status: 'pending',
      project: '电子政务升级项目',
      hasReport: false
    }
  ];

  const getStatusDisplay = (doc) => {
    switch (doc.status) {
      case 'pending':
        return { text: '未审核', color: 'text-gray-600', bg: 'bg-gray-100', textColor: 'text-gray-600' };
      case 'reviewing':
        return { text: '审核中', color: 'text-blue-600', bg: 'bg-blue-50', textColor: 'text-blue-600' };
      case 'completed':
        const rate = doc.passRate;
        if (rate >= 90) return { text: '已校验', color: 'text-green-600', bg: 'bg-green-50', textColor: 'text-green-600' };
        if (rate >= 60) return { text: '有警告', color: 'text-orange-600', bg: 'bg-orange-50', textColor: 'text-orange-600' };
        return { text: '有错误', color: 'text-red-600', bg: 'bg-red-50', textColor: 'text-red-600' };
      default:
        return { text: '未知', color: 'text-gray-600', bg: 'bg-gray-100', textColor: 'text-gray-600' };
    }
  };

  const getPassRateColor = (rate) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleSelectDoc = (docId) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleRowClick = (doc) => {
    setSelectedDoc(doc);
    setShowSidePanel(true);
  };

  const handleSelectAll = () => {
    if (selectedDocs.length === documents.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(documents.map(doc => doc.id));
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* 左侧导航栏 */}
      <div className="w-60 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo区域 */}
        <div className="h-16 px-6 flex items-center border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">智能文档审核</span>
          </div>
        </div>

        {/* 导航菜单 */}
        <div className="flex-1 py-4">
          <nav className="px-3 space-y-1">
            <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50">
              <Home className="w-4 h-4 mr-3" />
              首页
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50">
              项目管理
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
              方案文档管理
            </a>
            <a href="https://claude.ai/public/artifacts/42738ad9-22b3-4b21-8e1a-8c1e8911b8b6" target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50">
              审核规则管理
            </a>
            <a href="https://claude.ai/public/artifacts/ab180088-1e3c-4311-882f-373054c68982" target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50">
              审核报告管理
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50">
              方案归档
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50">
              系统设置
            </a>
          </nav>
        </div>

        {/* 底部用户信息 */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">管理员</p>
              <p className="text-xs text-gray-500 truncate">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航栏 */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">方案文档管理</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            <Settings className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </header>

        {/* 页面内容 */}
        <div className={`flex-1 ${showSidePanel ? 'mr-96' : ''} transition-all duration-300`}>
          <div className="p-6">
            {/* 页面描述和操作区 */}
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                参考数据模板及数据格式要求，准备并上传您的方案文档，文档质量直接影响审核效果。
                <a href="#" className="text-blue-500 hover:text-blue-600 ml-1">查看示例文档</a>
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedDocs.length > 0 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={selectedDocs.length === 0}
                  >
                    开始审核
                  </button>
                  
                  <button 
                    className={`px-3 py-2 text-sm text-gray-600 hover:text-gray-800 ${
                      selectedDocs.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={selectedDocs.length === 0}
                  >
                    批量导出
                  </button>
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
                  <Plus className="w-4 h-4" />
                  <span>上传方案文档</span>
                </button>
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
                      placeholder="请输入方案名称"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>全部状态</option>
                    <option>未审核</option>
                    <option>审核中</option>
                    <option>已完成</option>
                  </select>
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                    重置
                  </button>
                  <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                    删除
                  </button>
                </div>
              </div>

              {/* 表格 */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="w-12 px-4 py-3 text-left">
                        <input 
                          type="checkbox" 
                          checked={selectedDocs.length === documents.length}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">方案名称</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">文件上传时间</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">文档审核状态</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">审核报告</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {documents.map((doc) => {
                      const status = getStatusDisplay(doc);
                      return (
                        <tr 
                          key={doc.id} 
                          className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedDocs.includes(doc.id) ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleRowClick(doc)}
                        >
                          <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={selectedDocs.includes(doc.id)}
                              onChange={() => handleSelectDoc(doc.id)}
                              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                                <FileText className="w-4 h-4 text-blue-500" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                                <div className="text-xs text-gray-500">{doc.project}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-600">{doc.uploadTime}</span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${status.bg} ${status.textColor}`}>
                              {status.text}
                            </span>
                            {doc.status === 'reviewing' && (
                              <div className="mt-1">
                                <div className="text-xs text-gray-500">{doc.currentRule}</div>
                                <div className="w-20 h-1 bg-gray-200 rounded-full mt-1">
                                  <div 
                                    className="h-1 bg-blue-500 rounded-full transition-all duration-300" 
                                    style={{ width: `${(doc.progress / 38) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-center">
                              <Eye 
                                className={`w-5 h-5 cursor-pointer transition-colors ${
                                  doc.hasReport 
                                    ? 'text-green-500 hover:text-green-600' 
                                    : 'text-gray-300 cursor-not-allowed'
                                }`}
                                title={doc.hasReport ? '查看审核报告' : '审核报告未生成'}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-2">
                              {doc.status === 'completed' && (
                                <button className="text-blue-500 hover:text-blue-600 text-sm">
                                  新增版本
                                </button>
                              )}
                              {doc.status === 'pending' && (
                                <button className="text-blue-500 hover:text-blue-600 text-sm">
                                  开始审核
                                </button>
                              )}
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
                    共 2 条
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

        {/* 侧边详情面板 */}
        {showSidePanel && selectedDoc && (
          <div className="fixed right-0 top-0 w-96 h-full bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
            <div className="p-6">
              {/* 面板头部 */}
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-semibold text-gray-900">数据集详情</h3>
                <button 
                  onClick={() => setShowSidePanel(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* 基本信息 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">基本信息</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">数据集名称：</span>
                    <span className="text-gray-900 font-medium text-right flex-1 ml-2 break-all">{selectedDoc.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">关联项目：</span>
                    <span className="text-gray-900">{selectedDoc.project}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">文件大小：</span>
                    <span className="text-gray-900">{selectedDoc.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">创建时间：</span>
                    <span className="text-gray-900">{selectedDoc.uploadTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">使用空间：</span>
                    <span className="text-gray-900">1%</span>
                  </div>
                </div>
              </div>

              {/* 审核概览 */}
              {selectedDoc.status === 'completed' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">审核概览</h4>
                  
                  {/* 通过率显示 */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getPassRateColor(selectedDoc.passRate)} mb-1`}>
                        {selectedDoc.passRate}%
                      </div>
                      <div className="text-sm text-gray-600">整体通过率</div>
                    </div>
                  </div>

                  {/* 问题统计 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                      <span className="text-sm text-red-800">严重问题</span>
                      <span className="text-sm font-medium text-red-800">{selectedDoc.issues.severe}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                      <span className="text-sm text-orange-800">警告问题</span>
                      <span className="text-sm font-medium text-orange-800">{selectedDoc.issues.warning}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="text-sm text-blue-800">建议优化</span>
                      <span className="text-sm font-medium text-blue-800">{selectedDoc.issues.suggestion}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 问题详情 */}
              {selectedDoc.status === 'completed' && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">问题详情</h4>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-red-500 pl-3 py-2 bg-red-50">
                      <div className="font-medium text-red-900">不予立项核验</div>
                      <div className="text-red-700 mt-1">文档中提及新建机房，违反不予立项条款</div>
                      <div className="text-red-600 mt-1 text-xs">位置：第36页</div>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-3 py-2 bg-orange-50">
                      <div className="font-medium text-orange-900">附表齐全核验</div>
                      <div className="text-orange-700 mt-1">缺少附表3：系统运行维护费估算表</div>
                      <div className="text-orange-600 mt-1 text-xs">位置：第23页</div>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-3 py-2 bg-blue-50">
                      <div className="font-medium text-blue-900">信创描述优化</div>
                      <div className="text-blue-700 mt-1">建议补充具体的信创技术方案</div>
                      <div className="text-blue-600 mt-1 text-xs">位置：第22页</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="space-y-3">
                {selectedDoc.status === 'completed' && (
                  <>
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
                      导出审核报告
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                      新增版本
                    </button>
                  </>
                )}
                <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm">
                  删除数据集
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentManagementInterface;