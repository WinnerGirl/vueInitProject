/* eslint-disable */
const REGEX = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
export default (val, format) => {
  if (val) {
    let date = new Date(val);
    date.setHours(date.getHours() + 8);
    const [whole, yy, MM, dd, hh, mm, ss] = date.toISOString().match(REGEX);
    const year = new Date().getFullYear(),
      month = new Date().getMonth() + 1,
      dates = new Date().getDate();
    if (format) {
      // if (year == yy && month == MM) {
      //   if (month == MM && (dates == dd || (dates - dd == 1))) {
      //     let time = format
      //       .replace('yyyy', '')
      //       .replace('yy', '')
      //       .replace('-', '')
      //       .replace('-', '')
      //       .replace('MM', '')
      //       .replace('dd', '')
      //       .replace('mm', mm)
      //       .replace('ss', ''), timer;
      //     if (hh >= 13) {
      //       time = time.replace('hh', hh - 12);
      //       timer = `下午${time}`
      //     } else {
      //       time = time.replace('hh', hh);
      //       timer = `上午${time}`
      //     }
      //     if (dates == dd) {
      //       return timer;
      //     } else if (dates - dd == 1) {
      //       return `昨天${timer}`
      //     } else {
      //       return time;
      //     }
      //   } else {
      //     return format
      //       .replace('yyyy', '')
      //       .replace('-', '')
      //       .replace('MM', MM)
      //       .replace('dd', dd)
      //       .replace('hh', hh)
      //       .replace('mm', mm)
      //       .replace('ss', '');
      //   }
      // } else {
      return format
        .replace('yyyy', yy)
        .replace('yy', yy.slice(2))
        .replace('MM', MM)
        .replace('dd', dd)
        .replace('hh', hh)
        .replace('mm', mm)
        .replace('ss', ss)
      //}
    } else {
      // return [yy, MM, dd].join('-') + ' ' + [hh, mm, ss].join(':');
      return [yy, MM, dd].join('-');
    }
  } else {
    return '--';
  }
}
