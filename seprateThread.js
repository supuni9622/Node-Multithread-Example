/*
*  File Name: seprateThread.js
*  Description: This is another thread
*/

//  seprateThread.postMessage() function used by the main thread to communicate with the child thread.
// Likewise, parentPort.postMessage() used by the child thread to communicate with the main thread.

const { parentPort } = require("worker_threads");

const getSum = (limit) => {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += i;
  }
  return sum;
};

parentPort.on("message", (limit) => {
 const result = getSum(limit);
 parentPort.postMessage(result);
});