import get from 'lodash.get';
import { IDomain } from './interface';

export const transfromInput = async (inputs: any) => {
  const bucket = get(inputs, 'Properties.bucket');
  const date = new Date().getTime();
  inputs.Properties.service = {
    name: `unzip-${bucket}-fc-deploy-service`,
    internetAccess: true,
    role: {
      name: `unzip-file-${date}`,
      policies: [
        {
          name: `ReadAndWriteBucket-${date}`,
          description: `Read and write bucket(${bucket}) for Function Compute`,
          statement: [
            {
              Action: ['oss:GetObject', 'oss:PutObject'],
              Resource: [`acs:oss:*:*:${bucket}/*`],
              Effect: 'Allow',
            },
          ],
        },
      ],
    },
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
  };
  inputs.Properties.triggers = [
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
  ];
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

export function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

// export const waitForComplete = async (asyncFun, completeFun, timeout?: number) => {
//   let countTime = 0;
//   let result = null;
//   return new Promise((reslove, reject) => {
//     const timehandler = setTimeout(async () => {
//       result = await asyncFun();
//       if (completeFun(result)) {
//         reslove(result);
//         clearTimeout(timehandler);
//       }
//       countTime += 200;
//       if (countTime >= timeout) {
//         clearTimeout(timehandler);
//         reject(result);
//       }
//     }, 350);
//   });
// };
