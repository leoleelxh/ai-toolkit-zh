/**
 * 本地化 Hook
 * Localization Hook for Singapore Chinese
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import zhSG, { LocaleKeys } from '@/locales/zh-SG';

type SupportedLocale = 'zh-SG' | 'en-US';

interface LocaleContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
  tNested: (keyPath: string) => any;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// 获取嵌套对象值的辅助函数
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
};

// 英文默认翻译（简化版，主要用于 fallback）
const enUS = {
  common: {
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    create: "Create",
    update: "Update",
    loading: "Loading...",
    showSimple: "Show Simple",
    showAdvanced: "Show Advanced"
  },
  navigation: {
    dashboard: "Dashboard", 
    jobs: "Training Jobs",
    datasets: "Datasets",
    settings: "Settings",
    newJob: "New Job"
  },
  jobs: {
    title: "AI Model Training Jobs",
    newTrainingJob: "New Training Job",
    editTrainingJob: "Edit Training Job",
    trainingName: "Training Name",
    status: {
      saving: "Saving..."
    }
  },
  settings: {
    title: "Settings",
    general: "General",
    language: "Language"
  }
};

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 默认使用新加坡中文
  const [locale, setLocaleState] = useState<SupportedLocale>('zh-SG');

  // 从 localStorage 读取用户偏好
  useEffect(() => {
    const savedLocale = localStorage.getItem('ai-toolkit-locale') as SupportedLocale;
    if (savedLocale && ['zh-SG', 'en-US'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  // 保存语言偏好到 localStorage
  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('ai-toolkit-locale', newLocale);
  };

  // 获取当前语言包
  const getLocaleData = () => {
    switch (locale) {
      case 'zh-SG':
        return zhSG;
      case 'en-US':
        return enUS;
      default:
        return zhSG; // 默认返回中文
    }
  };

  // 翻译函数 - 简单键名
  const t = (key: string): string => {
    const localeData = getLocaleData();
    const value = getNestedValue(localeData, key);
    
    // 如果找不到翻译，返回键名作为 fallback
    if (value === null || value === undefined) {
      console.warn(`Missing translation for key: ${key} in locale: ${locale}`);
      return key;
    }
    
    return typeof value === 'string' ? value : key;
  };

  // 翻译函数 - 嵌套对象
  const tNested = (keyPath: string): any => {
    const localeData = getLocaleData();
    const value = getNestedValue(localeData, keyPath);
    
    if (value === null || value === undefined) {
      console.warn(`Missing translation for keyPath: ${keyPath} in locale: ${locale}`);
      return {};
    }
    
    return value;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, tNested }}>
      {children}
    </LocaleContext.Provider>
  );
};

// 使用本地化的 Hook
export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

// 便捷的翻译 Hook
export const useTranslation = () => {
  const { t, tNested } = useLocale();
  return { t, tNested };
};

export default useLocale;
