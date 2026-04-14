self.onmessage = function (e) {
  let interval = this.setInterval(
    () => self.postMessage("in progress..."),
    1000,
  );
  this.setTimeout(() => {
    let data = e.data;
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i];
    }
    self.postMessage(total);
    this.clearInterval(interval);
  }, 10000);
};
