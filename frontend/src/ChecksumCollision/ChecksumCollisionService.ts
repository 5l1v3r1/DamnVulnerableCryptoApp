import ApiRequest from "../Common/ApiRequest";

export interface IResponse {
  flag: string;
  success: boolean;
}


export default class ChecksumCollisionService {
  public static CHALLENGEPATH = `/md5/checksum/`;

  public static sendFiles(file1: File, file2: File): Promise<IResponse> {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    return ApiRequest.do(ChecksumCollisionService.CHALLENGEPATH, { method: 'POST', body: formData }, true);

  }
}