/* eslint-disable no-console */
// This file is auto-generated, don't edit it
import Cdn20180510, * as $Cdn20180510 from '@alicloud/cdn20180510';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import * as $OpenApi from '@alicloud/openapi-client';
// import * as $tea from '@alicloud/tea-typescript';
import { ICredentials, ICdnSource } from './interface';
import DnsClient from './dnsclient.service';
import { generateDomain } from './utils';

export default class Client {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(credentials: ICredentials): Cdn20180510 {
    const { accessKeyId, accessKeySecret } = credentials;
    const config = new $OpenApi.Config({
      // 您的AccessKey ID
      accessKeyId,
      // 您的AccessKey Secret
      accessKeySecret,
    });
    // 访问的域名
    config.endpoint = 'cdn.aliyuncs.com';
    return new Cdn20180510(config);
  }

  /**
   * 设置edge script灰度配置
   * @param accessKeyId
   * @param accessKeySecret
   */
  static async setEsStagingConfig(
    credentials: ICredentials,
    { domain, rule }: { domain: string; rule: string },
  ): Promise<any> {
    const client = Client.createClient(credentials);
    const setCdnDomainStagingConfigRequest = new $Cdn20180510.SetCdnDomainStagingConfigRequest({
      domainName: domain,
      functions: JSON.stringify([
        {
          functionArgs: [
            { argName: 'enable', argValue: 'on' },
            { argName: 'pri', argValue: '0' },
            { argName: 'name', argValue: 'serverless_dev_auto_es' },
            {
              argName: 'rule',
              argValue: rule,
            },
          ],
          functionName: 'edge_function',
        },
      ]),
    });
    // 复制代码运行请自行打印 API 的返回值
    const result = await client.setCdnDomainStagingConfig(setCdnDomainStagingConfigRequest);
    console.log(result);
  }

  /**
   * 将edge script灰度配置发布到线上环境
   * @param credentials
   */
  static async publishEsStagingConfigToProduction(
    credentials: ICredentials,
    domain: string,
  ): Promise<void> {
    const client = Client.createClient(credentials);
    const publishStagingConfigToProductionRequest = new $Cdn20180510.PublishStagingConfigToProductionRequest(
      {
        domainName: domain,
        functionName: 'edge_function',
      },
    );
    // 复制代码运行请自行打印 API 的返回值
    const result = await client.publishStagingConfigToProduction(
      publishStagingConfigToProductionRequest,
    );
    console.log(result);
  }

  /**
   * @description 获取CDN域名的详细信息
   * @param credentials
   */
  static async describeCdnDomainDetail(credentials: ICredentials, domain: string): Promise<any> {
    const client = Client.createClient(credentials);
    const { topDomain, rrDomainName } = generateDomain(domain);
    const describeCdnDomainDetailRequest = new $Cdn20180510.DescribeCdnDomainDetailRequest({
      domainName: `${rrDomainName}.${topDomain}`,
    });
    // 复制代码运行请自行打印 API 的返回值
    const result = await client.describeCdnDomainDetail(describeCdnDomainDetailRequest);
    console.log(result);
    return result;
  }

  /**
   * 添加加速域名
   * @param accessKeyId
   * @param accessKeySecret
   */
  static async addCDNDomain(
    credentials: ICredentials,
    { domain, cdnSource, esRule }: { domain: string; cdnSource: ICdnSource; esRule?: string },
  ): Promise<void> {
    const client = Client.createClient(credentials);
    const { topDomain, rrDomainName } = generateDomain(domain);

    // 添加CDN
    const addCdnDomainRequest = new $Cdn20180510.AddCdnDomainRequest({
      cdnType: 'web', // 图片小文件
      domainName: `${rrDomainName}.${topDomain}`,
      sources: JSON.stringify([].concat(cdnSource)),
    });
    // 复制代码运行请自行打印 API 的返回值
    const cdnResult = await client.addCdnDomain(addCdnDomainRequest);
    console.log(cdnResult);
    // 添加到云解析DNS
    console.log(`域名${domain}添加到云解析DNS`);
    await DnsClient.addDomainRecord(credentials, {
      domainName: topDomain,
      RR: rrDomainName,
      type: 'CNAME',
      value: `${rrDomainName}.${topDomain}.w.alikunlun.com`,
    });
    if (esRule) {
      console.log('开始 edge script灰度配置');
      // 设置edge script灰度配置
      await Client.setEsStagingConfig(credentials, { domain, rule: esRule });
      console.log('edge script灰度配置发布到线上环境');
      // 将edge script灰度配置发布到线上环境
      await Client.publishEsStagingConfigToProduction(credentials, domain);
    }
  }
}
