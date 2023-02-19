import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async getHealth(): Promise<null> {
    return null;
  }
}
