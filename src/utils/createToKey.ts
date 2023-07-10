import { KeyboardEvent } from 'react';

export const createToKey = <T>(fun: (event: KeyboardEvent<T>) => void, keyName = 'Enter') => (e: KeyboardEvent<T>) => {
  e.preventDefault();

  if (e.code === keyName) {
    fun(e);
  }
};
