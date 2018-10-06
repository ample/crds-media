$(document).ready(function () {
  $("time[is='time-ago']").each(function () {
    var date = $(this).attr("datetime");
    var timePassed = moment(date).fromNow();
    $(this).append(timePassed);
  })
});