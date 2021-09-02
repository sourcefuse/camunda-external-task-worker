import {
  invoiceProcessHandler,
  loanProcessHandler,
  requestRejectorHandler,
} from './processHandlers';
import { initializeWorker } from '../worker';

// TODO: how to make these dynamic?
const getTopicConfigurations = () => {
  return [
    {
      topicName: 'creditScoreChecker',
      handlerFunction: loanProcessHandler,
    },
    {
      topicName: 'invoiceCreator',
      handlerFunction: invoiceProcessHandler,
    },
    {
      topicName: 'requestRejecter',
      handlerFunction: requestRejectorHandler,
    },
  ];
};

initializeWorker(getTopicConfigurations());
