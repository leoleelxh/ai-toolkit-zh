/**
 * 控制台页面 - 中文化版本
 * Dashboard Page - Localized Version
 */

'use client';

import React from 'react';
import { TopBar, MainContent } from '@/components/layout';
import { useTranslation } from '@/hooks/useLocale';
import Card from '@/components/Card';
import { BrainCircuit, Images, Settings, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { t } = useTranslation();

  const quickActions = [
    {
      title: t('navigation.newJob'),
      description: '开始新的 FLUX Kontext 训练任务',
      icon: Plus,
      href: '/jobs/new',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: t('navigation.jobs'),
      description: '查看和管理现有的训练任务',
      icon: BrainCircuit,
      href: '/jobs',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: t('navigation.datasets'),
      description: '管理您的图像数据集',
      icon: Images,
      href: '/datasets',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: t('navigation.settings'),
      description: '配置系统设置和语言偏好',
      icon: Settings,
      href: '/settings',
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  return (
    <>
      <TopBar>
        <div>
          <h1 className="text-lg">{t('navigation.dashboard')}</h1>
        </div>
        <div className="flex-1"></div>
        <div className="text-sm text-gray-400">
          欢迎使用 AI Toolkit 中文版
        </div>
      </TopBar>
      
      <MainContent>
        <div className="space-y-8">
          {/* 欢迎信息 */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-2">🎨 欢迎使用 AI Toolkit</h2>
            <p className="text-gray-300 mb-4">
              专为新加坡用户打造的 FLUX 模型训练平台，支持 FLUX Kontext 指令式图像编辑训练。
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full">
                ✅ FLUX.1-dev 支持
              </span>
              <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full">
                ✅ FLUX Kontext 训练
              </span>
              <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full">
                ✅ 中文界面
              </span>
              <span className="bg-yellow-600/20 text-yellow-300 px-3 py-1 rounded-full">
                ✅ 24GB 显存优化
              </span>
            </div>
          </div>

          {/* 快速操作 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">快速操作</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Card className="h-full hover:scale-105 transition-transform cursor-pointer">
                    <div className="p-6 text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${action.color}`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{action.title}</h4>
                      <p className="text-gray-400 text-sm">{action.description}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* FLUX Kontext 快速指南 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">🚀 FLUX Kontext 快速指南</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-3">📁 准备数据集</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• <strong>原始图像</strong>: 放入 control/ 文件夹</li>
                    <li>• <strong>目标图像</strong>: 放入 images/ 文件夹</li>
                    <li>• <strong>指令文本</strong>: 创建对应的 .txt 文件</li>
                    <li>• <strong>示例指令</strong>: "make this person smile"</li>
                  </ul>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h4 className="font-semibold text-lg mb-3">⚙️ 训练配置</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• <strong>模型选择</strong>: FLUX.1-Kontext-dev</li>
                    <li>• <strong>分辨率</strong>: 建议 512-768</li>
                    <li>• <strong>批量大小</strong>: 1 (24GB 显存)</li>
                    <li>• <strong>训练步数</strong>: 3000 步</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>

          {/* 系统状态 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">📊 系统状态</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">GPU 状态</span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="mt-2 text-lg font-semibold">就绪</div>
                </div>
              </Card>
              
              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">活跃任务</span>
                    <span className="text-blue-400 text-sm">0</span>
                  </div>
                  <div className="mt-2 text-lg font-semibold">无运行任务</div>
                </div>
              </Card>
              
              <Card>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">语言</span>
                    <span className="text-green-400 text-sm">🇸🇬</span>
                  </div>
                  <div className="mt-2 text-lg font-semibold">中文（新加坡）</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </MainContent>
    </>
  );
}