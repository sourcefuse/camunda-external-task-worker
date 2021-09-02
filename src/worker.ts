import { Client, logger } from 'camunda-external-task-client-js';

import * as dotenv from 'dotenv';
import path from 'path';
import { getWorkerConfiguration, TopicConfiguration } from './infrastructure';

const subscribeToTopics = (
  camundaClient: Client,
  topicConfigurations: TopicConfiguration[]
) => {
  topicConfigurations.forEach(topicConfiguration =>
    camundaClient.subscribe(
      topicConfiguration.topicName,
      topicConfiguration.handlerFunction
    )
  );
};

export const initializeWorker = (topicConfigurations: TopicConfiguration[]) => {
  dotenv.config({ path: path.join(__dirname, '.env') });

  const workerConfig = getWorkerConfiguration(process);

  // TODO: define config for actual project
  const camundaClientConfig = {
    baseUrl: workerConfig.camundaRestUrl,
    use: logger,
  };

  const client = new Client(camundaClientConfig);
  subscribeToTopics(client, topicConfigurations);
};
