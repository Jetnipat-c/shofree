export interface Gateways {
  cmsServiceUrl: string;
}

export interface Configuration {
  port: number;
  gateways: Gateways;
}

export default (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  gateways: {
    cmsServiceUrl: process.env.CMS_SERVICE_URL || '',
  },
});
