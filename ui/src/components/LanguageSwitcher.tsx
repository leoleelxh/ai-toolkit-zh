/**
 * 语言切换组件
 * Language Switcher Component
 */

'use client';

import React from 'react';
import { useLocale } from '@/hooks/useLocale';
import { SelectInput } from '@/components/formInputs';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, t } = useLocale();

  const languageOptions = [
    { value: 'zh-SG', label: '中文（新加坡）' },
    { value: 'en-US', label: 'English (US)' }
  ];

  return (
    <div className="w-48">
      <SelectInput
        label={t('settings.language')}
        value={locale}
        onChange={(value) => setLocale(value as 'zh-SG' | 'en-US')}
        options={languageOptions}
      />
    </div>
  );
};

export default LanguageSwitcher;
