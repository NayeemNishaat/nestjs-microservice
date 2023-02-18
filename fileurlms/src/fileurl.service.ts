import { Injectable, Inject, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Repository, UpdateResult } from "typeorm";
import { FileUrl } from "./models/fileurl.entity";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/fileurl.dto";
import { FilE_URL_REPOSITORY } from "src/constants/repository.constants";

@Injectable()
export class FileUrlService {
  constructor(
    @Inject(FilE_URL_REPOSITORY)
    private fileUrlRepository: Repository<FileUrl>
  ) {}

  async createFileUrl(createFileUrlDTO: CreateFileUrlDto): Promise<FileUrl> {
    try {
      return await this.fileUrlRepository.save(
        this.fileUrlRepository.create({
          ...createFileUrlDTO
        })
      );
    } catch (err: any) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new RpcException({
          error: true,
          message: "itemId, appId, businessId must be unique togather!",
          statusCode: HttpStatus.BAD_REQUEST
        });
      }

      throw new RpcException(err);
    }
  }

  async updateFileUrl(
    id: number,
    updateFileUrlDto: UpdateFileUrlDto
  ): Promise<UpdateResult> {
    try {
      return await this.fileUrlRepository.update(
        { id },
        { ...updateFileUrlDto }
      );
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async getFileUrl(
    appId: number,
    businessId: number,
    itemId: number
  ): Promise<FileUrl> {
    try {
      return await this.fileUrlRepository.findOne({
        where: { app_id: appId, business_id: businessId, item_id: itemId },
        withDeleted: true
      });
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async getFileUrlById(id: number): Promise<FileUrl> {
    try {
      return await this.fileUrlRepository.findOne({
        where: { id },
        withDeleted: true
      });
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async getAllFileUrl(): Promise<FileUrl[]> {
    try {
      return await this.fileUrlRepository.find({});
    } catch (err: any) {
      throw new RpcException(err);
    }
  }

  async deleteFileUrl(id: number): Promise<UpdateResult> {
    try {
      return await this.fileUrlRepository.softDelete(id); // Note: Soft Delete
      // return await this.fileUrlRepository.delete(id); // Note: Hard Delete
    } catch (err: any) {
      throw new RpcException(err);
    }
  }
}
