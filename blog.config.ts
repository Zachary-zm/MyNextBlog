import { IBlogConfig } from './types';

const config: IBlogConfig = {
  host: '0.0.0.0',
  port: 9000,
  enableHTTPS: true,
  mongoUrl: `mongodb://116.62.106.70:27017/iBlog_v2`,
  jwtSecret: 'myblogjsonwebtokensecretkey'
};

export default config;
