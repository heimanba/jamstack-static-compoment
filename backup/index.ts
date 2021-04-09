// import { HLogger, ILogger, loadComponent, getCredential } from '@serverless-devs/core';
// import get from 'lodash.get';
// import cloneDeep from 'lodash.clonedeep';
// import oss, { IOssConfig, IDeployConfig } from './deploy.server';
// import { transfromInput } from './utils';

// export default class JamStackComponent {
//   @HLogger('JAMSTACK_STATIC') logger: ILogger;
//   async deploy(inputs: any) {
//     const { ProjectName, Provider, AccessAlias } = inputs.Project;
//     this.logger.debug(`[${ProjectName}] inputs params: ${JSON.stringify(inputs, null, 2)}`);

//     // 调用FC的函数的能力
//     const fcDeploy = await loadComponent('alibaba/fc-deploy');
//     const fcDeployInputs = await transfromInput(cloneDeep(inputs));
//     const result = await fcDeploy.deploy(fcDeployInputs);

//     const { AccessKeyID, AccessKeySecret } = await getCredential(Provider, AccessAlias);
//     const ossConfig: IOssConfig = {
//       bucket: get(inputs, 'Properties.bucket'),
//       region: get(inputs, 'Properties.region'),
//       accessKeyId: get(inputs, 'Credentials.AccessKeyID', AccessKeyID),
//       accessKeySecret: get(inputs, 'Credentials.AccessKeySecret', AccessKeySecret),
//     };

//     const deployConfig: IDeployConfig = {
//       buildCommand: get(inputs, 'Properties.deploy.buildCommand'),
//       publishDir: get(inputs, 'Properties.deploy.publishDir'),
//     };
//     await oss(ossConfig, deployConfig, ProjectName);

//     return result;
//   }

//   async remove(inputs: any) {
//     // 删除所有用到的资源以及配置等
//     console.log(inputs);
//   }
// }
