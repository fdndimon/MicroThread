# 🧵 MicroThread

Effortlessly offload heavy JavaScript computations to Web Workers using standard Promises. No extra worker files, no messy `postMessage` handlers.

## 🚀 The Problem
JavaScript runs on a single thread. If you map over a massive array or do heavy math, your UI freezes. Animations stop. Clicks are ignored. 

## ✨ The Solution
MicroThread takes your function, creates an inline Web Worker via Blob URLs, executes it on a separate CPU core, and returns the result as a Promise.

## 📦 Usage

```html
<script src="microthread.js"></script>
<script>
  // Some CPU-intensive task
  const crunchData = (multiplier) => {
    let result = 0;
    for(let i = 0; i < 1000000000; i++) result += multiplier;
    return result;
  };

  // Run it in the background! (UI stays fully responsive)
  runAsync(crunchData, 5).then(result => {
    console.log("Done!", result);
  });
</script>
```

🛠 Tech
* Promises
* Web Workers
* Blob URLs / URL.createObjectURL
