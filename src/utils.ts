import { IDomain } from './interface';

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
