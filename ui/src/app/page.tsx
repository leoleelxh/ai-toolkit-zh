/**
 * 首页重定向到控制台
 * Homepage redirect to dashboard
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useLocale';

export default function HomePage() {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    // 自动重定向到控制台
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">AI Toolkit - 中文版</h1>
        <p className="text-gray-400">{t('common.loading')}</p>
      </div>
    </div>
  );
}