import { HandlerRegistry } from './registry';

// TODO: inject HandlerRegistry for testing
export const dynamicHandler = (handlerName: string) => {
  if (
    HandlerRegistry[handlerName] === undefined ||
    HandlerRegistry[handlerName] === null
  ) {
    throw new Error(
      `Handler type of \'${handlerName}\' is not in the registry`
    );
  }
  return HandlerRegistry[handlerName];
};
