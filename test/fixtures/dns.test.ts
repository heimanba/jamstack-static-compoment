import Client from '../../src/dnsclient.service';
import credentials from '../credentials';

Client.addDomainRecord(credentials, {
  domainName: 'serverlessfans.com',
  RR: 'dankun',
  type: 'CNAME',
  value: 'dankun.serverlessfans.com.w.alikunlun.com',
});
