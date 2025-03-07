# Promise Track

A utility for tracing and monitoring Promise rejections with labels.

## Installation

```sh
npm install promise-track
```

or with Yarn:

```sh
yarn add promise-track
```

## Usage

### Import the Functions

```ts
import { withTrace, traceAllSettled } from "promise-track";
```

### Example Usage

```ts
const p1 = Promise.resolve("Success 1");
const p2 = Promise.reject("Error 1");
const p3 = Promise.resolve("Success 2");
const p4 = Promise.reject("Error 2");
const p5 = Promise.reject("Error 3");

// Wrap potentially failing promises with labels
const tracedPromises = [
  p1,
  withTrace("ID-1", p2),
  p3,
  withTrace("ID-2", p4),
  withTrace("ID-3", p5)
];

// Call traceAllSettled with a custom logger
traceAllSettled(tracedPromises, console.warn).then(([resolved, rejected]) => {
  console.log("Resolved:", resolved);
  console.log("Rejected:", rejected);
});
```

### Behavior
- The `withTrace` function wraps a promise with a **label**, making it easier to debug.
- The `traceAllSettled` function waits for all promises to settle and separates **fulfilled** and **rejected** promises.
- In **development mode (`NODE_ENV=development`)**, it logs labeled failures automatically.

## API

### `withTrace(label: string, promise: Promise<T>): { label: string, promise: Promise<T> }`
Wraps a promise with a label for easier debugging.

### `traceAllSettled(promises: (Promise<T> | { label: string, promise: Promise<T> })[], logFn?: (...args: any[]) => void): Promise<[T[], any[]]>`
Similar to `Promise.allSettled`, but returns two arrays: **fulfilled values** and **rejected reasons**. The `logFn` argument (default: `console.log`) is only called in **development mode**.

## License

MIT
