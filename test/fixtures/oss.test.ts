import OssClient from 'ali-oss';
import credentials from '../credentials';
// import path from 'path';

const clinet = new OssClient({
  bucket: 'dankun-fc-component',
  region: 'oss-cn-hangzhou',
  accessKeyId: credentials.accessKeyId,
  accessKeySecret: credentials.accessKeySecret,
});

const demo = async () => {
  // const result = clinet.useBucket('dankun-fc-component');
  const result = await clinet.putBucketWebsite('dankun-fc-component', {
    index: 'index.html',
    error: 'error.html',
  });
  console.log(result);
};
demo();
