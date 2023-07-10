class Storage {
  getItem(key: string) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : item;
    } catch (_) {
      return;
    }
  }

  setItem(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      return;
    }
  }

  removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (_) {
      return;
    }
  }
}

export const storage = new Storage();
