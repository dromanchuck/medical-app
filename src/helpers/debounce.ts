export function debounce(callback: (...args: any) => void, timestamp: number) {
  let lastCall = Date.now();
  let lastCallTimer: NodeJS.Timeout;

  return function (...args: any) {
    let previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= timestamp) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => callback(...args), timestamp);
  };
}
