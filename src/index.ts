import { HLogger, ILogger } from '@serverless-devs/core';

export default class JamStackComponent {
  @HLogger('JAMSTACK_STATIC') logger: ILogger;
  async deploy(inputs: any) {
    const { ProjectName } = inputs.Project;
    this.logger.debug(`[${ProjectName}] inputs params: ${JSON.stringify(inputs)}`);
  }

  async remove(inputs: any) {
    console.log(inputs);
  }
}
