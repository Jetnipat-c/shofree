export interface Database {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
  synchronize: boolean;
}

export interface Gateways {
  userServiceUrl: string;
}

export interface Security {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export interface Configuration {
  port: number;
  database: Database;
  gateways: Gateways;
  security: Security;
}

export default (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_DATABASE || '',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  },
  gateways: {
    userServiceUrl: process.env.USER_SERVICE_URL || '',
  },
  security: {
    jwt: {
      secret: process.env.JWT_SECRET || '',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
  },
});
