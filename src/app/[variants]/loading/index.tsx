import { isServerMode } from '@/const/version';

import Client from './Client';
import Server from './Server';

const ScreenLoading = () => (isServerMode ? <Server /> : <Client />);
console.log('我执行了loading/index')

ScreenLoading.displayName = 'ScreenLoading';

export default ScreenLoading;
