import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUrl
} from "class-validator";
import { ModuleKey } from "src/enums/entity.enums";

export class CreateFileUrlDto {
  @ApiProperty({
    type: String,
    name: "fileUrl",
    description: "URL of The File",
    required: true,
    title: "File URL",
    example: "https://www.google.com"
  })
  @IsUrl()
  public fileUrl: string;

  @ApiProperty({
    type: Number,
    name: "itemId",
    title: "Item Id",
    description: "Unique Id of the Item",
    required: true,
    example: 1
  })
  @IsNumber()
  public itemId: number;

  @ApiProperty({
    type: Number,
    name: "appId",
    title: "App Id",
    description: "Unique Id of the App",
    required: true,
    example: 12
  })
  @IsNumber()
  public appId: number;

  @ApiProperty({
    type: Number,
    name: "businessId",
    title: "Business Id",
    description: "Unique Id of the Business",
    required: true,
    example: 123
  })
  @IsNumber()
  public businessId: number;

  @ApiProperty({
    enum: ModuleKey,
    name: "moduleKey",
    title: "Key of the Module",
    description: "Module Identifier",
    required: true,
    default: ModuleKey.ECOMPRODUCT,
    example: ModuleKey.ECOMPRODUCT
  })
  @IsEnum(ModuleKey)
  public moduleKey: ModuleKey;

  @ApiProperty({
    type: String,
    name: "imageAlt",
    title: "Alt Text",
    description: "Alternative Text of the Image",
    required: false,
    default: null,
    example: "Alt Text of the Image"
  })
  @IsString()
  @IsOptional()
  public imageAlt: string;

  @ApiProperty({
    type: String,
    name: "imageTitle",
    title: "Title Text",
    description: "Title of the Image",
    required: false,
    default: null,
    example: "Title Text of the Image"
  })
  @IsString()
  @IsOptional()
  public imageTitle: string;

  @ApiProperty({
    type: String,
    name: "description",
    title: "Image Description",
    description: "Description of the Image",
    required: false,
    default: null,
    example: "Description Text"
  })
  @IsString()
  @IsOptional()
  public description: string;

  @ApiProperty({
    type: String,
    name: "remoteAddr",
    title: "Remote Address",
    description: "User's Remote Address",
    required: false,
    default: null,
    example: "Description Text"
  })
  @IsUrl()
  @IsOptional()
  public remoteAddr: string;

  @ApiProperty({
    type: String,
    name: "userAgent",
    title: "User Agent",
    description: "User's Device Information",
    required: false,
    default: null,
    example: "Description Text"
  })
  @IsString()
  @IsOptional()
  public userAgent: string;

  @ApiProperty({
    type: Number,
    name: "updatedBy",
    title: "Updater's Id",
    description: "Unique Id of the Updater",
    required: false,
    default: null,
    example: 15
  })
  @IsNumber()
  @IsOptional()
  public updatedBy: number;

  @ApiProperty({
    type: Number,
    name: "status",
    title: "Status",
    description: "Status of the File",
    required: false,
    default: true,
    example: true
  })
  @IsBoolean()
  @IsOptional()
  public status: boolean;

  // @IsNumber()
  // readonly id: number;
  // readonly created_at: Date;
  // readonly updated_at: Date;
  // readonly deleted_at: Date;
  // readonly version: number;
  // readonly isDelete: boolean;
  // readonly isPublish: boolean;
}

export class UpdateFileUrlDto {
  @ApiProperty({
    type: Number,
    name: "accountCertificateId",
    description: "Account Certificate Id",
    example: 1
  })
  @ApiProperty({
    type: Number,
    name: "accountId",
    description: "Account Id",
    example: 1
  })
  @ApiProperty({
    type: Number,
    name: "link",
    description: "If true, this will return the link of the certificate",
    example: true
  })
  @IsBoolean()
  public download?: boolean = false;
}
// @IsEmail(undefined, { message: 'Not a valid e-mail' })
// Validates for a non-empty integer array
// @IsArray()
// @IsNumber({ allowNaN: false }, { each: true })
// @ArrayMinSize(1)
// public nums: number[];
