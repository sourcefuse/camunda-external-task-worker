import assert from 'assert';
import { dynamicHandler } from '../infrastructure';

// TODO: add handler tests
describe('dynamicHandler', () => {
  it('returns the correct handler', () => {
    const handler = dynamicHandler('genericHandler');
    assert(handler, 'Handler is not null');

    expect(async () => handler({}, {}).toThrow(Error));
  });
});
