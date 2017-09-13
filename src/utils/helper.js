/**
 * Created by Administrator on 2017/9/1.
 */
import moment from 'moment'


export function formatDate(value) {
  const {select, dateRange} = value
  let rt;
  if (select === "null") {
    rt = [null, null];
  } else if (select === "custom") {
    rt = [moment(dateRange[0]).hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss'), moment(dateRange[1]).hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss')]
  } else {
    rt = [moment().subtract(Number(select), 'days').hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss'), moment().hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss')]
  }
  return rt;
}
