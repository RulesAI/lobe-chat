'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, NeutralColors, PrimaryColors } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';
import 'antd/dist/reset.css';
import { ReactNode, memo, useEffect } from 'react';

import { LOBE_THEME_NEUTRAL_COLOR, LOBE_THEME_PRIMARY_COLOR } from '@/const/theme';
import { useUserStore } from '@/store/user';
import { userGeneralSettingsSelectors } from '@/store/user/selectors';
import { setCookie } from '@/utils/client/cookie';

export interface AppThemeProps {
  children?: ReactNode;
  customFontFamily?: string;
  customFontURL?: string;
  defaultAppearance?: ThemeAppearance;
  defaultNeutralColor?: NeutralColors;
  defaultPrimaryColor?: PrimaryColors;
  globalCDN?: boolean;
}

const AppTheme = memo<AppThemeProps>(({ children }) => {
  const [primaryColor, neutralColor] = useUserStore((s) => [
    userGeneralSettingsSelectors.primaryColor(s),
    userGeneralSettingsSelectors.neutralColor(s),
  ]);

  useEffect(() => {
    setCookie(LOBE_THEME_PRIMARY_COLOR, primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    setCookie(LOBE_THEME_NEUTRAL_COLOR, neutralColor);
  }, [neutralColor]);
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider config={{}}>{children}</ConfigProvider>
    </StyleProvider>
  );
});

export default AppTheme;
