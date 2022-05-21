export function setTimeout (callback: () => void, timeout: number) {
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

export function formatMilliseconds (date: Date) {
  const DateMs = date.getMilliseconds();
  let MsString = ".";
  for (let index = 0; index < 4 - String(DateMs).length; index++) MsString += "0";
  MsString += DateMs;
  
  return MsString;
};