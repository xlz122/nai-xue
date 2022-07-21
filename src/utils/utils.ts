/**
 * @description 日期字符串/时间戳，转格式化后的日期字符串
 * @param { String | Date } - date 日期或者时间戳
 * @param { String } - fmt 格式化后的日期字符串格式
 */
export function formatDateTime(
  date: string | Date | number,
  fmt = 'yyyy-MM-dd hh:mm:ss'
): string {
  if (!date) {
    return '';
  }
  if (typeof date === 'number') {
    date = new Date(date * 1000);
  }

  const o = {
    // 月份
    'M+': (date as Date).getMonth() + 1,
    // 日
    'd+': (date as Date).getDate(),
    // 小时
    'h+': (date as Date).getHours(),
    // 分
    'm+': (date as Date).getMinutes(),
    // 秒
    's+': (date as Date).getSeconds(),
    // 季度
    'q+': Math.floor(((date as Date).getMonth() + 3) / 3),
    // 毫秒
    S: (date as Date).getMilliseconds()
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt
      .replace(RegExp.$1, (date as Date).getFullYear() + '')
      .substr(4 - RegExp.$1.length);
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }

  return fmt;
}
