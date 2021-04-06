/* eslint-disable @typescript-eslint/indent */
// This file is auto-generated, don't edit it
import Alidns20150109, * as $Alidns20150109 from '@alicloud/alidns20150109';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import * as $OpenApi from '@alicloud/openapi-client';
// import * as $tea from '@alicloud/tea-typescript';
import { ICredentials } from './interface';

export interface IAddDomainRecord {
  domainName: string;
  RR: string;
  type:
    | 'A'
    | 'NS'
    | 'MX'
    | 'TXT'
    | 'CNAME'
    | 'SRV'
    | 'AAAA'
    | 'CAA'
    | 'REDIRECT_URL'
    | 'FORWARD_URL';
  value: string;
}

export default class Client {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(credentials: ICredentials): Alidns20150109 {
    const { accessKeyId, accessKeySecret } = credentials;
    const config = new $OpenApi.Config({
      accessKeyId,
      accessKeySecret,
    });
    // 访问的域名
    config.endpoint = 'dns.aliyuncs.com';
    return new Alidns20150109(config);
  }

  static async addDomainRecord(
    credentials: ICredentials,
    addDomainRecordParams: IAddDomainRecord,
  ): Promise<any> {
    const client = Client.createClient(credentials);
    const addDomainRecordRequest = new $Alidns20150109.AddDomainRecordRequest(
      addDomainRecordParams,
    );
    // 复制代码运行请自行打印 API 的返回值
    const result = await client.addDomainRecord(addDomainRecordRequest);
    return result;
  }
}
