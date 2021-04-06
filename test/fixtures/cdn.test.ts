import Client from '../../src/cdnclient.service';
import credentials from '../credentials';
Client.addCDNDomain(credentials, {
  domain: 'kunge.serverlessfans.com',
  cdnSource: {
    content: 'mq-website.oss-accelerate.aliyuncs.com',
    type: 'oss',
    port: 80,
  },
});

Client.describeCdnDomainDetail(credentials, 'kunge.serverlessfans.com');
