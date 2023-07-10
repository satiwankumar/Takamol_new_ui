import { getMockedResponse } from 'src/utils/getMockedResponse';

describe('getMockedResponse util', () => {
  const data = { test: true };

  test('should return a success response', async () => {
    const response = await getMockedResponse(true, 1000, data, 'test success response');

    expect(response).toEqual(data);
  });
});
