import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Repository, UpdateResult } from "typeorm";
import { FileUrl } from "./models/fileurl.entity";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/fileurl.dto";
import { FilE_URL_REPOSITORY } from "src/constants/repository.constants";
import { MessagePattern } from "@nestjs/microservices";

@Injectable()
export class FileUrlService {
  constructor(
    @Inject(FilE_URL_REPOSITORY)
    private fileUrlRepository: Repository<FileUrl>
  ) {}

  @MessagePattern("fileurl_created")
  async createFileUrl(createFileUrlDTO: CreateFileUrlDto): Promise<FileUrl> {
    try {
      return await this.fileUrlRepository.save(
        this.fileUrlRepository.create({
          ...createFileUrlDTO
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

  async updateFileUrl(
    id: number,
    updateFileUrlDto: UpdateFileUrlDto
  ): Promise<UpdateResult> {
    return await this.fileUrlRepository.update({ id }, { ...updateFileUrlDto });
  }

  async getFileUrl(
    appId: number,
    businessId: number,
    itemId: number
  ): Promise<FileUrl> {
    return await this.fileUrlRepository.findOne({
      where: { app_id: appId, business_id: businessId, item_id: itemId },
      withDeleted: true
    });
  }

  async getFileUrlById(id: number): Promise<FileUrl> {
    return await this.fileUrlRepository.findOne({
      where: { id },
      withDeleted: true
    });
  }

  async deleteFileUrl(id: number): Promise<UpdateResult> {
    return await this.fileUrlRepository.softDelete(id); // Note: Soft Delete
    // return await this.fileUrlRepository.delete(id); // Note: Hard Delete
  }
}
