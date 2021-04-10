import CdnService from '../../src/cdnclient.service';
import DnsService from '../../src/dnsclient.service';
import { ICdnSource } from '../../src/interface';
import { generateDomain, sleep } from '../../src/utils';
import credentials from '../credentials';
import chillout from 'chillout';

const demo = async () => {
  // 源站信息
  const sources: ICdnSource = {
    content: 'jamstack-hangzhou.oss-cn-hangzhou.aliyuncs.com',
    type: 'oss',
    port: 80,
  };
  const domain = 'hx1.alijam.top';
  const cdnClient = CdnService.createClient(credentials);
  const dnsClient = DnsService.createClient(credentials);
  // TODO: 先校验下域名状态
  let domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, domain);
  const { topDomain, rrDomainName } = generateDomain(domain);
  // 没有域名则添加域名
  if (!domainDetailMode) {
    // 第一次添加会出强制校验
    await CdnService.verifyDomainOwner(cdnClient, { domain });
    await CdnService.deleteCdnDomain(cdnClient, domain, true);
    await CdnService.addCDNDomain(cdnClient, {
      domain,
      sources,
    });

    await chillout.waitUntil(async () => {
      let isStop = false;
      while (!isStop) {
        await sleep(350);
        domainDetailMode = await CdnService.describeCdnDomainDetail(cdnClient, domain);
        isStop = domainDetailMode.cname ? true : false;
        if (isStop) {
          return chillout.StopIteration;
        }
      }
    });
    await DnsService.addDomainRecord(dnsClient, {
      domainName: topDomain,
      RR: rrDomainName,
      type: 'CNAME',
      value: domainDetailMode.cname,
    });
    // 配置CNAME后大约有10分钟延迟才会更新该列状态。如已按教程配置，请忽略该提示。如何配置？
  } else {
    // 运行中才能进行状态修改
    if (domainDetailMode.domainStatus === 'online') {
      // 暂时先覆盖操作
      CdnService.modifyCdnDomain(cdnClient, { domain, sources });
    }

    await DnsService.addDomainRecord(dnsClient, {
      domainName: topDomain,
      RR: rrDomainName,
      type: 'CNAME',
      value: domainDetailMode.cname,
    });
  }
  // 验证是否是自己域名
  // await CdnService.verifyDomainOwner(cdnClient, { domain });
  // await CdnService.deleteCdnDomain(cdnClient, domain);
  // await CdnService.addCDNDomain(cdnClient, {
  //   domain: 'dankun.alijam.top',
  //   sources: {
  //     content: 'mq-website.oss-accelerate.aliyuncs.com',
  //     type: 'oss',
  //     port: 80,
  //   },
  // });
};
demo();

// Client.addCDNDomain(credentials, {
//   domain: 'kunge.serverlessfans.com',
//   cdnSource: {
//     content: 'mq-website.oss-accelerate.aliyuncs.com',
//     type: 'oss',
//     port: 80,
//   },
// });

// Client.describeCdnDomainDetail(credentials, 'kunge.serverlessfans.com');
