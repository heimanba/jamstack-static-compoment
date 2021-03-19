import OssClient from 'ali-oss';
import { Logger, zip } from '@serverless-devs/core';
import { spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';

const logger = new Logger('JAMSTACK_STATIC');
export interface IOssConfig {
  bucket: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
}
export interface IDeployConfig {
  buildCommand: string;
  publishDirectory: string;
}

export default async (
  ossConfig: IOssConfig,
  deployConfig: IDeployConfig,
) => {
  const { bucket, region, accessKeyId, accessKeySecret } = ossConfig;
  // 1. 构造oss客户端
  const ossClient = new OssClient({
    bucket,
    region: `oss-${region}`,
    accessKeyId,
    accessKeySecret,
  });
  const isExistBucket = await getBucketInfo(bucket, ossClient);
  logger.debug(`bucket值${bucket}是否存在: ${JSON.stringify(isExistBucket, null, 2)}`);

  // 2. 执行打包指令
  await buildSpawnSync(deployConfig.buildCommand);

  // 3. build文件打包成zip包
  await zipBuildFile(deployConfig);
  // 4. 开启OSS上传
  /**
   * - bucket, 不存在此bucket,则创建: 并且加上权限
   * - 上传格式 ossClient.putStream('source/${projectName.zip}', 'build.zip');
   * - 删除build.zip文件
   */
  const res: any = await putObject(ossClient);
  console.log(res.url);
};

// 判断bucket是否存在
async function getBucketInfo(bucket: string, ossClient: OssClient) {
  try {
    return await ossClient.getBucketInfo(bucket);
  } catch (error) {
    return false;
  }
}

// 执行打包指令
async function buildSpawnSync(buildCommand: string) {
  const result = await spawnSync(
    buildCommand,
    [],
    {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    },
  );
  if (result && result.status !== 0) {
    throw Error('> Execute Error');
  }
}

// build文件打包压缩成zip
async function zipBuildFile(deployConfig: IDeployConfig) {
  await zip({
    codeUri: path.resolve(process.cwd(), deployConfig.publishDirectory),
    outputFileName: 'build.zip',
  });
}

// stream方式上传 https://github.com/ali-sdk/ali-oss#putstreamname-stream-options
async function putObject(ossClient: OssClient) {
  return await ossClient.putStream('source/build.zip', fs.createReadStream(path.resolve(process.cwd(), 'build.zip')));
}
