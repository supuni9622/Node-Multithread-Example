/*
*  File Name: index.js
*  Description: This is the main thread
*/

/*
    Features 
    1. Each thread has separate v8 engines.
    2. Child threads could communicate with each other.
    3. Child threads could share the same memory.
    4. An initial value could be passed as an option while starting the new thread.
*/
const express = require("express");

//Importing the worker thread module to the main thread.
const { Worker } = require("worker_threads");

const app = express();
const port = 5000;

// demonstrate how to create another thread for processing an operation

const getSum = (limit) => {
    let sum = 0;
    for (let i = 0; i < limit; i++) {
         sum += i;
    }
    return sum;
    };
    
// the first API will process the function on the main thread, and the other API will process the function on a separate thread.
app.get("/", (req, res) => {
    const result = getSum(100);
    res.send(`Process function on main thread result : ${result} `);
});

app.get("/seprate-thread", (req, res) => {

    //Create an instance of the worker thread module and provide the pathname to the newly created file.
    const seprateThread = new Worker(__dirname + "/seprateThread.js");

    // Starting a new thread
    seprateThread.on("message", (result) => {
    res.send(`Processed function getSum on seprate thread: ${result}`);
    });

    // Sending data to the new thread.
    seprateThread.postMessage(1000);
});

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`);
});