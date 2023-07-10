export const getMockedResponse = (success: boolean, timeout: number, data: unknown, type: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      success ? resolve(data) : reject({ message: `Error from ${type}` });
    }, timeout);
  });
};
