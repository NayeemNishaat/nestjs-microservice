import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { FileUrl } from "./models/file-url.entity";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/file-url.dto";
import { ConfigService } from "@nestjs/config";
import { FilE_URL_REPOSITORY } from "src/constants/repository.constants";

@Injectable()
export class FileUrlService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(FilE_URL_REPOSITORY)
    private fileUrlRepository: Repository<FileUrl>
  ) {}

  async createFileUrl(createFileUrlDTO: CreateFileUrlDto) {
    try {
      return await this.fileUrlRepository.save(
        this.fileUrlRepository.create({
          fileurl: createFileUrlDTO.fileUrl,
          item_id: createFileUrlDTO.itemId,
          app_id: createFileUrlDTO.appId,
          business_id: createFileUrlDTO.businessId,
          module_key: createFileUrlDTO.moduleKey,
          image_alt: createFileUrlDTO.imageAlt,
          image_title: createFileUrlDTO.imageTitle,
          description: createFileUrlDTO.description,
          remote_addr: createFileUrlDTO.remoteAddr,
          user_agent: createFileUrlDTO.userAgent,
          updated_by: createFileUrlDTO.updatedBy,
          status: createFileUrlDTO.status
        })
      );
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new HttpException(
          {
            error: true,
            message: "itemId, appId, businessId must be unique togather!",
            statusCode: HttpStatus.BAD_REQUEST
          },
          HttpStatus.BAD_REQUEST
        );
      }

      throw new HttpException(
        {
          error: true,
          message: err.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateFileUrl(id: number, updateFileUrlDto: UpdateFileUrlDto) {
    // return await this.certificateRepository.update(
    //   {
    //     id: updateShareDto.accountCertificateId,
    //     account_id: updateShareDto.accountId
    //   },
    //   { share: updateShareDto.share }
    // );
  }

  async getFileUrl(appId: number, businessId: number, itemId: number) {
    return await this.fileUrlRepository.findOne({
      where: { app_id: appId, business_id: businessId, item_id: itemId },
      withDeleted: true
    });
  }

  async deleteFileUrl(id: number) {
    return await this.fileUrlRepository.softDelete(id); // Note: Soft Delete
    // return await this.fileUrlRepository.delete(id); // Note: Hard Delete
  }
}
