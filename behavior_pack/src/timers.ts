export default function setTimeout (callback: () => void, timeout: number) {
  const StartTime = new Date().getTime();

  (async () => {
    while(true) {
      const EndTime = new Date().getTime();
      if (EndTime - StartTime > timeout) {
        callback();
        break;
      }
    }
  })()
}