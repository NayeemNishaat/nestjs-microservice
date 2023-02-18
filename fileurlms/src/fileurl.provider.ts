import { DataSource } from "typeorm";
import { FileUrl } from "./models/fileurl.entity";
import { FileUrlService } from "./fileurl.service";
import { FilE_URL_REPOSITORY } from "src/constants/repository.constants";
import { MYSQL_DATA_SOURCE } from "./constants/provider.constant";

export const fileUrlProvider = [
  {
    provide: MYSQL_DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        synchronize: true,
        entities: [__dirname + "/../../models/*.entity{.ts,.js}"]
      });

      return dataSource.initialize();
    }
  },
  {
    provide: FilE_URL_REPOSITORY,
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(FileUrl),
    inject: [MYSQL_DATA_SOURCE]
  },
  FileUrlService
];
