import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "MYSQL_DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mysql", // Note: Using mysql8, 5.6 has issue with typeorm
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        // synchronize: true,
        entities: [__dirname + "/../../models/*.entity{.ts,.js}"]
      });

      return dataSource.initialize();
    }
  }
];
