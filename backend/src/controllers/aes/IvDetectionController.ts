import { BodyParams, Controller, Post } from "@tsed/common";
import * as crypto from 'crypto';

interface IResponse {
  data: string;
  flag: string;
}

@Controller("/aes/cbc/iv-detection")
export class IvDetectionController {

  static KEY = "123321123321asdx";
  static IV = "super_secure_iv2";
  static FLAG = "485e40a2-8c8a-11ea-bc55-0242ac130003";

  @Post("/send")
  public send(@BodyParams("data") data: string) {
    // do nothing... just to have an endpoint for the UI to call :)
    return {};
  }


  @Post("/encrypt")
  public encrypt(@BodyParams("data") data: string): IResponse {
    const f = data === IvDetectionController.IV ? IvDetectionController.FLAG : "";

    return { data: this.encryptData(data), flag: f };
  }

  @Post("/decrypt")
  public decrypt(@BodyParams("data") data: string): IResponse {
    return { data: this.decryptData(data), flag: "" };
  }



  private encryptData(data: string): string {
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(IvDetectionController.KEY), IvDetectionController.IV);
    cipher.setAutoPadding(false);
    const buff = Buffer.from(data, 'utf8');
    let encrypted = cipher.update(buff);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString("hex");
  }

  private decryptData(data: string): string {
    const cipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(IvDetectionController.KEY), IvDetectionController.IV);
    cipher.setAutoPadding(false);
    const buff = Buffer.from(data, 'hex');
    let decrypted = cipher.update(buff);
    decrypted = Buffer.concat([decrypted, cipher.final()]);

    return decrypted.toString();
  }

}
