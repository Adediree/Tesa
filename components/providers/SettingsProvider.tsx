'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const settings = useAppSelector((state) => state.settings);

  useEffect(() => {
    document.body.setAttribute('data-font-size', settings.fontSize);
    document.body.setAttribute('data-font-family', settings.fontFamily);
    document.body.setAttribute('data-theme', settings.theme);
  }, [settings]);

  return <>{children}</>;
}
