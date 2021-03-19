import OssClient from 'ali-oss';
import { Logger } from '@serverless-devs/core';

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

// 判断bucket是否存在
async function getBucketInfo(bucket: string, ossClient: OssClient) {
  try {
    return await ossClient.getBucketInfo(bucket);
  } catch (error) {
    return false;
  }
}

export default async (
  { bucket, region, accessKeyId, accessKeySecret }: IOssConfig,
  deployConfig: IDeployConfig,
) => {
  // 1. 构造oss客户端
  const ossClient = new OssClient({
    region: `oss-${region}`,
    accessKeyId,
    accessKeySecret,
  });
  const isExistBucket = await getBucketInfo(bucket, ossClient);
  logger.debug(`bucket值${bucket}是否存在: ${isExistBucket}`);
  // 2. 执行打包指令

  // 3. build文件打包成zip包
  zipBuildFile(deployConfig);
  // 4. 开启OSS上传
  /**
   * - bucket, 不存在此bucket,则创建: 并且加上权限
   * - 上传格式 ossClient.putStream('source/${projectName.zip}', 'build.zip');
   * - 删除build.zip文件
   *
   */
};

// build文件打包压缩成zip
const zipBuildFile = (deployConfig: IDeployConfig) => {
  console.log(deployConfig);
};

// stream方式上传 https://github.com/ali-sdk/ali-oss#putstreamname-stream-options
// const PutObject = (ossClient: any, { bucket, region, accessKeyId, accessKeySecret}:ossConfig) => {
//   ossClient.putStream(`${bucket}/${}`);
// }
