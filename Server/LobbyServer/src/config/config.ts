import dotenv from 'dotenv';

dotenv.config();

export const PORT: number = 3000;
export const HOST: string = '127.0.0.1';

export const BATTLE_PORT: number = 3005;
export const BATTLE_HOST: string = '127.0.0.1';

export const CLIENT_VERSION: string = process.env.CLIENT_VERSION || '1.0.0';

export const DB1_NAME: string = process.env.DB1_NAME || 'database1';
export const DB1_USER: string = process.env.DB1_USER || 'user1';
export const DB1_PASSWORD: string = process.env.DB1_PASSWORD || 'password1';
export const DB1_HOST: string = process.env.DB1_HOST || 'localhost';
export const DB1_PORT: number = parseInt(process.env.DB1_PORT || '3306', 10);

export const DB2_NAME: string = process.env.DB2_NAME || 'database2';
export const DB2_USER: string = process.env.DB2_USER || 'user2';
export const DB2_PASSWORD: string = process.env.DB2_PASSWORD || 'password2';
export const DB2_HOST: string = process.env.DB2_HOST || 'localhost';
export const DB2_PORT: number = parseInt(process.env.DB2_PORT || '3306', 10);

export const lobbyConfig = {
  server: {
    port: PORT,
    host: HOST,
  },
  battleServer: {
    port: BATTLE_PORT,
    host: BATTLE_HOST,
  },
  client: {
    version: CLIENT_VERSION,
  },
  database: {
    GAME_DB: {
      name: DB1_NAME,
      user: DB1_USER,
      password: DB1_PASSWORD,
      host: DB1_HOST,
      port: DB1_PORT,
    },
    USER_DB: {
      name: DB2_NAME,
      user: DB2_USER,
      password: DB2_PASSWORD,
      host: DB2_HOST,
      port: DB2_PORT,
    },
  },
};
