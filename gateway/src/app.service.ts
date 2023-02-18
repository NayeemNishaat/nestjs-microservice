import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class AppService {
  async getHealth(res: Response) {
    return res.json({ status: "OK" });
  }
}
