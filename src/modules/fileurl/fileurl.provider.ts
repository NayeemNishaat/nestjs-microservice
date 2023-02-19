import { DataSource } from "typeorm";
import { FileUrl } from "../../models/fileurl.entity";
import { FileUrlService } from "./fileurl.service";
import { FilE_URL_REPOSITORY } from "src/constants/repository.constants";

export const fileUrlProvider = [
  {
    provide: FilE_URL_REPOSITORY,
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(FileUrl),
    inject: ["MYSQL_DATA_SOURCE"]
  },
  FileUrlService
];
