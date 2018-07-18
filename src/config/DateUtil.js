function TimestampToDate(timestamp) {
  var time = new Date(timestamp);
  var year = time.getFullYear();
  var month = time.getMonth()+1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  return year+'-'+addPreZero(month)+'-'+addPreZero(day)+' '+addPreZero(hour)+':'+addPreZero(minute)+':'+addPreZero(second);

}
function addPreZero(value){
  return value<10 ? '0'+value : value
}

export {
  TimestampToDate
}
