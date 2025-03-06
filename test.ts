// Import from `src` during development, and from `dist` in production
const { withTrace, traceAllSettled } =
  process.env.NODE_ENV === "development"
    ? require("./src/index")
    : require("./dist/index");



// Sample Promises
const p1 = Promise.resolve("Success 1");
const p2 = Promise.reject("Error 1");
const p3 = Promise.resolve("Success 2");
const p4 = Promise.reject("Error 2");
const p5 = Promise.reject("Error 3");

// Wrap potentially failing promises
const tracedPromises = [
  p1,
  withTrace("ID-1", p2),
  p3,
  withTrace("ID-2", p4),
  withTrace("ID-3", p5)
];

// Run traceAllSettled with a custom logger
traceAllSettled(tracedPromises, console.warn).then(([resolved, rejected]: [unknown[], any[]]) => {
  console.log("✅ Resolved:", resolved);
  console.log("❌ Rejected:", rejected);
});
