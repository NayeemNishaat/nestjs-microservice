import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUrl,
  IsNotEmpty
} from "class-validator";
import { ModuleKey } from "src/enums/entity.enums";

export class CreateFileUrlDto {
  @ApiProperty({
    type: String,
    name: "fileurl",
    description: "URL of The File",
    required: true,
    title: "File URL",
    example: "https://www.google.com"
  })
  @IsUrl()
  @IsNotEmpty()
  public fileurl: string;

  @ApiProperty({
    type: Number,
    name: "item_id",
    title: "Item Id",
    description: "Unique Id of the Item",
    required: true,
    example: 1
  })
  @IsNumber()
  public item_id: number;

  @ApiProperty({
    type: Number,
    name: "app_id",
    title: "App Id",
    description: "Unique Id of the App",
    required: true,
    example: 12
  })
  @IsNumber()
  public app_id: number;

  @ApiProperty({
    type: Number,
    name: "business_id",
    title: "Business Id",
    description: "Unique Id of the Business",
    required: true,
    example: 123
  })
  @IsNumber()
  public business_id: number;

  @ApiProperty({
    enum: ModuleKey,
    name: "module_key",
    title: "Key of the Module",
    description: "Module Identifier",
    required: true,
    default: ModuleKey.ECOMPRODUCT,
    example: ModuleKey.ECOMPRODUCT
  })
  @IsEnum(ModuleKey)
  public module_key: ModuleKey;

  @ApiProperty({
    type: String,
    name: "image_alt",
    title: "Alt Text",
    description: "Alternative Text of the Image",
    required: false,
    default: null,
    example: "Alt Text of the Image"
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public image_alt: string;

  @ApiProperty({
    type: String,
    name: "image_title",
    title: "Title Text",
    description: "Title of the Image",
    required: false,
    default: null,
    example: "Title Text of the Image"
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public image_title: string;

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
  @IsNotEmpty()
  @IsOptional()
  public description: string;

  @ApiProperty({
    type: String,
    name: "remote_addr",
    title: "Remote Address",
    description: "User's Remote Address",
    required: false,
    default: null,
    example: "https://abc.com"
  })
  @IsUrl()
  @IsOptional()
  public remote_addr: string;

  @ApiProperty({
    type: String,
    name: "user_agent",
    title: "User Agent",
    description: "User's Device Information",
    required: false,
    default: null,
    example: "Description Text"
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public user_agent: string;

  @ApiProperty({
    type: Number,
    name: "updated_by",
    title: "Updater's Id",
    description: "Unique Id of the Updater",
    required: false,
    default: null,
    example: 15
  })
  @IsNumber()
  @IsOptional()
  public updated_by: number;

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
}

export class UpdateFileUrlDto {
  @ApiProperty({
    type: String,
    name: "fileurl",
    description: "URL of The File",
    required: false,
    title: "File URL",
    example: "https://www.google.com"
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  public fileurl: string;

  @ApiProperty({
    type: Number,
    name: "item_id",
    title: "Item Id",
    description: "Unique Id of the Item",
    required: false,
    example: 1
  })
  @IsNumber()
  @IsOptional()
  public item_id: number;

  @ApiProperty({
    type: Number,
    name: "app_id",
    title: "App Id",
    description: "Unique Id of the App",
    required: false,
    example: 12
  })
  @IsNumber()
  @IsOptional()
  public app_id: number;

  @ApiProperty({
    type: Number,
    name: "business_id",
    title: "Business Id",
    description: "Unique Id of the Business",
    required: false,
    example: 123
  })
  @IsNumber()
  @IsOptional()
  public business_id: number;

  @ApiProperty({
    enum: ModuleKey,
    name: "module_key",
    title: "Key of the Module",
    description: "Module Identifier",
    required: false,
    default: ModuleKey.ECOMPRODUCT,
    example: ModuleKey.ECOMPRODUCT
  })
  @IsEnum(ModuleKey)
  @IsOptional()
  public module_key: ModuleKey;

  @ApiProperty({
    type: String,
    name: "image_alt",
    title: "Alt Text",
    description: "Alternative Text of the Image",
    required: false,
    default: null,
    example: "Alt Text of the Image"
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public image_alt: string;

  @ApiProperty({
    type: String,
    name: "image_title",
    title: "Title Text",
    description: "Title of the Image",
    required: false,
    default: null,
    example: "Title Text of the Image"
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public image_title: string;

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
  @IsNotEmpty()
  @IsOptional()
  public description: string;

  @ApiProperty({
    type: String,
    name: "remote_addr",
    title: "Remote Address",
    description: "User's Remote Address",
    required: false,
    default: null,
    example: "https://github.com"
  })
  @IsUrl()
  @IsOptional()
  public remote_addr: string;

  @ApiProperty({
    type: String,
    name: "user_agent",
    title: "User Agent",
    description: "User's Device Information",
    required: false,
    default: null,
    example: "Description Text"
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public user_agent: string;

  @ApiProperty({
    type: Number,
    name: "updated_by",
    title: "Updater's Id",
    description: "Unique Id of the Updater",
    required: false,
    default: null,
    example: 15
  })
  @IsNumber()
  @IsOptional()
  public updated_by: number;

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
}
