// import OssClient from 'ali-oss';
// import { zip, spinner } from '@serverless-devs/core';
// import { spawnSync } from 'child_process';
// import path from 'path';
// import fs from 'fs-extra';
// import { PUT_BUCKET_CORS } from './contants';

// export interface IOssConfig {
//   bucket: string;
//   region: string;
//   accessKeyId: string;
//   accessKeySecret: string;
// }
// export interface IDeployConfig {
//   buildCommand: string;
//   publishDir: string;
// }

// export default async (ossConfig: IOssConfig, deployConfig: IDeployConfig, projectName: string) => {
//   // 1. 执行打包指令
//   await buildSpawnSync(deployConfig.buildCommand);

//   // 2. build文件打包成zip包
//   await zipBuildFile(deployConfig);

//   // 3. 开启OSS上传
//   const { bucket, region, accessKeyId, accessKeySecret } = ossConfig;
//   // 构造oss客户端
//   let ossClient = new OssClient({
//     bucket,
//     region: `oss-${region}`,
//     accessKeyId,
//     accessKeySecret,
//   });

//   // bucket, 不存在此bucket,则创建: 并且加上权限
//   await getOrCreateBucket(ossClient, bucket);
//   // region重新赋值
//   const location = await ossClient.getBucketLocation(bucket);
//   ossClient = new OssClient({
//     bucket,
//     region: location.location,
//     accessKeyId,
//     accessKeySecret,
//   });

//   // 上传格式 ossClient.putStream('source/${projectName.zip}', 'build.zip');
//   // stream方式上传 https://github.com/ali-sdk/ali-oss#putstreamname-stream-options
//   await ossClient.putStream(
//     `source/${projectName}.zip`,
//     fs.createReadStream(path.resolve(process.cwd(), 'build.zip')),
//   );

//   // 删除build.zip文件
//   await fs.unlink(path.resolve(process.cwd(), 'build.zip'));
// };

// async function getOrCreateBucket(ossClient: OssClient, bucket: string) {
//   try {
//     await ossClient.getBucketInfo(bucket);
//     // bucket存在，检查权限，且只能设置为 公共读
//     const { acl } = await ossClient.getBucketACL(bucket);
//     if (acl !== 'public-read') {
//       await ossClient.putBucketACL(bucket, 'public-read');
//     }
//   } catch (error) {
//     if (error.code == 'NoSuchBucket') {
//       const vm = spinner(`Create ${bucket} bucket`);
//       await ossClient.putBucket(bucket);
//       await ossClient.putBucketACL(bucket, 'public-read');
//       await ossClient.putBucketCORS(bucket, PUT_BUCKET_CORS);
//       vm.succeed();
//     } else {
//       throw error;
//     }
//   }
// }

// async function buildSpawnSync(buildCommand: string) {
//   const result = await spawnSync(buildCommand, [], {
//     cwd: process.cwd(),
//     stdio: 'inherit',
//     shell: true,
//   });
//   if (result && result.status !== 0) {
//     throw Error('> Execute Error');
//   }
// }

// async function zipBuildFile(deployConfig: IDeployConfig) {
//   await zip({
//     codeUri: path.resolve(process.cwd(), deployConfig.publishDir),
//     outputFileName: 'build.zip',
//   });
// }
