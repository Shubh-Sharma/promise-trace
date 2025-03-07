export function withTrace<T>(label: string, promise: Promise<T>): { label: string; promise: Promise<T> } {
  if (!(promise instanceof Promise)) {
    throw new TypeError("Expected a Promise instance");
  }
  return { label, promise };
}