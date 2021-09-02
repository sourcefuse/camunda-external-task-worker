import { initializeWorker } from './worker';
import {
  getTopicConfigurations,
  getWorkerConfiguration,
} from './infrastructure';

const workerConfiguration = getWorkerConfiguration(process);
initializeWorker(
  getTopicConfigurations(workerConfiguration.topicConfigurationLoadMethod)
);
