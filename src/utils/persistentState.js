export function fetchStateFromSession(key) {
  const data = sessionStorage.getItem(key);
  if (data === null) return null;
  return JSON.parse(data);
}

export function saveStateInSession(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}
