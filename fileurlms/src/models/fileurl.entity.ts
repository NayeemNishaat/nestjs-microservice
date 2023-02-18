import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  AfterInsert,
  AfterUpdate,
  AfterLoad,
  AfterSoftRemove,
  AfterRemove,
  Index
} from "typeorm";
import { ModuleKey } from "src/enums/entity.enums";

@Index(["item_id", "app_id", "business_id"], { unique: true })
@Entity({ name: "fileurl" })
export class FileUrl {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "varchar" })
  fileurl: string;

  @Column({ type: "int" })
  item_id: number;

  @Column({ type: "int" })
  app_id: number;

  @Column({ type: "int" })
  business_id: number;

  @Column({ type: "enum", enum: ModuleKey, default: ModuleKey.ECOMPRODUCT })
  module_key: ModuleKey;

  @Column({ type: "varchar", nullable: true, default: null })
  image_alt: string;

  @Column({ type: "varchar", nullable: true, default: null })
  image_title: string;

  @Column({ type: "varchar", nullable: true, default: null })
  description: string;

  @Column({ type: "varchar", nullable: true, default: null })
  remote_addr: string;

  @Column({ type: "varchar", nullable: true, default: null })
  user_agent: string;

  @Column({ type: "int", nullable: true, default: null })
  updated_by: number; // Note: user_id

  @Column({ type: "boolean", default: true })
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @VersionColumn()
  version: number;

  protected isDelete: boolean;
  protected isPublish: boolean;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  @AfterSoftRemove()
  @AfterRemove()
  checkIfDeleted(): void {
    this.isDelete = this.deleted_at ? true : false;
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  @AfterSoftRemove()
  @AfterRemove()
  checkIfPublished(): void {
    this.isPublish = this.remote_addr ? true : false;
  }
}
