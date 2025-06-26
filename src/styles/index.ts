import { createGlobalStyle } from 'antd-style';

import antdOverride from './antdOverride';
import global from './global';

const prefixCls = 'ant';

// export const GlobalStyle = createGlobalStyle(({ theme }) => [
//   global({ prefixCls, token: theme }),
//   antdOverride({ prefixCls, token: theme }),
// ]);

export const GlobalStyle = createGlobalStyle(({ theme }) => {
  // console.log('theme002', theme)
  const newTheme = {...theme, colorPrimary: '#1890ff', primary: '#1890ff'}
  return [
  global({ prefixCls, token: newTheme }),
  antdOverride({ prefixCls, token: newTheme }),
]});

export * from './text';
