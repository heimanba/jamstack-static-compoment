export interface ICredentials {
  accessKeyId: string;
  accessKeySecret: string;
}

export interface IDomain {
  topDomain: string; // 一级域名
  rrDomainName: string; // 二级域名名称
}

export interface ICdnSource {
  content: string;
  type: 'oss' | 'ipaddr' | 'domain' | 'fc_domain';
  port: number;
}
