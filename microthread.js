/**
 * MicroThread v1.0.0
 * Run heavy functions in a Web Worker without extra files.
 */
function runAsync(fn, ...args) {
  return new Promise((resolve, reject) => {
    // 1. Превращаем функцию в строку для Web Worker
    const workerCode = `
      self.onmessage = async function(e) {
        try {
          const result = await (${fn.toString()})(...e.data);
          self.postMessage({ success: true, result });
        } catch(err) {
          self.postMessage({ success: false, error: err.message });
        }
      }
    `;

    // 2. Создаем "виртуальный файл" в памяти браузера
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    // 3. Слушаем ответ от Worker'а
    worker.onmessage = (e) => {
      if (e.data.success) resolve(e.data.result);
      else reject(new Error(e.data.error));
      worker.terminate(); // Убиваем процесс, чтобы не жрал память
    };

    worker.onerror = (err) => {
      reject(err);
      worker.terminate();
    };

    // 4. Отправляем аргументы на выполнение
    worker.postMessage(args);
  });
}

// Экспорт
if (typeof module !== 'undefined') module.exports = runAsync;
