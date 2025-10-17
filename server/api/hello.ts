export default defineEventHandler(() => {
  return {
    message: "Hello from the Crypto Portfolio Tracker API",
    timestamp: new Date().toISOString(),
  };
});
