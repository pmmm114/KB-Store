export const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    // console.log(entry);
  });
});
