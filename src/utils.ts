import get from 'lodash.get';
import { IDomain } from './interface';

export const transfromInput = async (inputs: any) => {
  const bucket = get(inputs, 'Properties.bucket');
  inputs.Properties.service = {
    name: `unzip-${bucket}-fc-deploy-service`,
    internetAccess: true,
  };
  inputs.Properties.function = {
    name: 'oss-invoke-fc',
    runtime: 'python3',
    codeUri: '../oss-unzip',
    handler: 'index.handler',
    memorySize: 128,
    timeout: 60,
    instanceType: 'e1',
    environmentVariables: {
      PROCESSED_DIR: 'static',
      RETAIN_FILE_NAME: 'true',
    },
    triggers: [
      {
        name: 'ossTrigger',
        type: 'oss',
        config: {
          bucketName: bucket,
          events: [
            'oss:ObjectCreated:PutObject',
            'oss:ObjectCreated:PostObject',
            'oss:ObjectCreated:CompleteMultipartUpload',
            'oss:ObjectCreated:PutSymlink',
          ],
          filter: {
            Key: {
              Prefix: 'source/',
              Suffix: '.zip',
            },
          },
        },
      },
    ],
  };
  return inputs;
};

export const generateDomain = (domain: string): IDomain => {
  const [first, second, thrid] = domain.split('.');
  if (!thrid) {
    return {
      topDomain: `${first}.${second}`,
      rrDomainName: null,
    };
  } else {
    return {
      topDomain: `${second}.${thrid}`,
      rrDomainName: first,
    };
  }
};
