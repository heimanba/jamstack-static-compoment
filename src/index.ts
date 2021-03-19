import { HLogger, ILogger } from '@serverless-devs/core';
import get from 'lodash.get';
import oss, { IOssConfig, IDeployConfig } from './deploy.server';

export default class JamStackComponent {
  @HLogger('JAMSTACK_STATIC') logger: ILogger;
  async deploy(inputs: any) {
    const { ProjectName } = inputs.Project;
    this.logger.debug(`[${ProjectName}] inputs params: ${JSON.stringify(inputs, null, 2)}`);
    const ossConfig: IOssConfig = {
      bucket: get(inputs, 'Properties.bucket'),
      region: get(inputs, 'Properties.region'),
      accessKeyId: get(inputs, 'Credentials.AccessKeyID'),
      accessKeySecret: get(inputs, 'Credentials.AccessKeySecret'),
    };
    const deployConfig: IDeployConfig = {
      buildCommand: 'npm run build',
      publishDirectory: 'dist',
    };
    await oss(ossConfig, deployConfig);
  }

  async remove(inputs: any) {
    console.log(inputs);
  }
}
