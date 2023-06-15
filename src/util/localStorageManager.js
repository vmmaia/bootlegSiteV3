export const getValue = (key) => {
  return window.localStorage.getItem(key);
};

export const setValue = (key, value) => {
  window.localStorage.setItem(key, value);
};
