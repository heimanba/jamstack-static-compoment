import { HLogger, ILogger, getCredential } from '@serverless-devs/core';
import get from 'lodash.get';
import oss, { IOssConfig } from './deploy.server';

export default class JamStackComponent {
  @HLogger('JAMSTACK_STATIC') logger: ILogger;
  async deploy(inputs: any) {
    const { ProjectName, Provider, AccessAlias } = inputs.Project;
    this.logger.debug(`[${ProjectName}] inputs params: ${JSON.stringify(inputs, null, 2)}`);
    const { AccessKeyID, AccessKeySecret } = await getCredential(Provider, AccessAlias);
    const ossConfig: IOssConfig = {
      bucket: get(inputs, 'Properties.bucket'),
      region: get(inputs, 'Properties.region'),
      accessKeyId: get(inputs, 'Credentials.AccessKeyID', AccessKeyID),
      accessKeySecret: get(inputs, 'Credentials.AccessKeySecret', AccessKeySecret),
    };

    await oss(ossConfig, ProjectName);
  }

  async remove(inputs: any) {
    // 删除所有用到的资源以及配置等
    console.log(inputs);
  }
}
