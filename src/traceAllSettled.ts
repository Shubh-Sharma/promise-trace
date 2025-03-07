export async function traceAllSettled<T = unknown>(
  promises: (Promise<T> | { label: string; promise: Promise<T> })[],
  logFn: (...args: any[]) => void = console.log
): Promise<[T[], any[]]> {
  const resolved: T[] = [];
  const rejected: any[] = [];

  const isDevelopment = process.env.NODE_ENV === "development";

  await Promise.allSettled(
    promises.map((entry) => {
      if (typeof entry === "object" && "promise" in entry) {
        return entry.promise.then(
          (value) => {
            resolved.push(value);
            return { label: entry.label, status: "fulfilled", value };
          },
          (reason) => {
            if (isDevelopment) {
              logFn(`[${entry.label}]`, { status: "rejected", reason });
            }
            rejected.push(reason);
            return { label: entry.label, status: "rejected", reason };
          }
        );
      } else {
        return (entry as Promise<T>).then(
          (value) => {
            resolved.push(value);
            return { status: "fulfilled", value };
          },
          (reason) => {
            rejected.push(reason);
            return { status: "rejected", reason };
          }
        );
      }
    })
  );

  return [resolved, rejected];
}
