const format_date = (time) => {
  var date = new Date(time);
  var currentDate = new Date();
  var minutes = Math.abs(currentDate - date) / 60000; // Số phút giữa hai thời điểm

  if (minutes < 1) {
    return `vừa xong`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} phút trước`;
  } else {
    var hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} giờ trước`;
    } else {
      var day = date.getUTCDate();
      var month = date.getUTCMonth() + 1;
      return `${day} tháng ${month}`;
    }
  }
};

export default format_date;
