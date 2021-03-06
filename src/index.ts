import { HLogger, ILogger, getCredential } from '@serverless-devs/core';
import get from 'lodash.get';
import oss, { IOssConfig } from './deploy.server';

export default class JamStackComponent {
  @HLogger('JAMSTACK_STATIC') logger: ILogger;
  async deploy(inputs: any) {
    const { ProjectName, AccessAlias } = inputs.Project;
    this.logger.debug(`[${ProjectName}] inputs params: ${JSON.stringify(inputs, null, 2)}`);
    const { AccessKeyID, AccessKeySecret } = await getCredential(AccessAlias);
    const ossConfig: IOssConfig = {
      accessKeyId: get(inputs, 'Credentials.AccessKeyID', AccessKeyID),
      accessKeySecret: get(inputs, 'Credentials.AccessKeySecret', AccessKeySecret),
      bucket: get(inputs, 'Properties.bucket'),
      region: get(inputs, 'Properties.region'),
      staticPath: get(inputs, 'Properties.staticPath', 'build'),
      pages: get(inputs, 'Properties.pages', { index: 'index.html' }),
      cors: get(inputs, 'Properties.cors'),
      referer: get(inputs, 'Properties.referer', { allowEmpty: true, referers: [] }),
    };
    await oss(ossConfig);
  }

  async remove(inputs: any) {
    // 删除所有用到的资源以及配置等
    console.log(inputs);
  }
}
