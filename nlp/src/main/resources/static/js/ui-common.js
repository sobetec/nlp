// menu
$('.main_menu .btn_close, .sub_menu .btn_close').on('click', function () {
  $(this).parent().toggleClass('is_fold');
});

// option panel
$('.option_panel .btn_close').on('click', function () {
  $(this).parents('.option_panel').removeClass('is_active');
});

// modal
$('.layer_dimmed .btn_close').on('click', function () {
  $(this).parents('.layer_dimmed').removeClass('is_active');
  $('.enlargedChartSettings').css("display", "none");
  /* $('.stockLine').attr('clip-path', 'url(#stockClip)'); */
});


//close if click outside
$(document).mouseup(function (e) {
  var container = $('.layer_dimmed .layer_box');
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $('.layer_dimmed').removeClass('is_active');
    $('.enlargedChartSettings').css("display", "none");
   /*  $('.stockLine').attr('clip-path', 'url(#stockClip)'); */
  }
});

//close if escape is pressed
$(document).on('keydown', function (e) {
  if (e.keyCode === 27) { // ESC
    $('.layer_dimmed').removeClass('is_active');
    $('.enlargedChartSettings').css("display", "none");
   /*  $('.stockLine').attr('clip-path', 'url(#stockClip)'); */
  }
});


// tab panel
$('.tab_panel .option_title').on('click', function () {
  $(this).parent('.tab_panel').toggleClass('is_fold');
});

// sub tab
$('.sub_tab_area .btn_tab').on('click', function () {
  $('.sub_tab_area .btn_tab').removeClass('active');
  $(this).addClass('active');
});

// datePicker
$("#date_from").datepicker({
  showOn: "button",
  buttonImage: "img/icon_calendar.png",
  buttonImageOnly: true,
  buttonText: "날짜 선택",
  currentText: "Now",
  defaultDate: "0",
  changeMonth: true,
  changeYear: true,
  numberOfMonths: 1,
  onClose: function (selectedDate) {
    $("#date_to").datepicker("option", "minDate", selectedDate);
  }
});
$("#date_to").datepicker({
  showOn: "button",
  buttonImage: "img/icon_calendar.png",
  buttonImageOnly: true,
  buttonText: "날짜 선택",
  currentText: "Now",
  defaultDate: "0",
  changeMonth: true,
  changeYear: true,
  numberOfMonths: 1,
  onClose: function (selectedDate) {
    $("#date_from").datepicker("option", "maxDate", selectedDate);
  }
});

// menu link
function linkMu(linkSeq) {
  var linkUrl = "/view";

  if (linkSeq == "0101") {
    linkUrl += "/alys/newsList.html";
  } else if (linkSeq == "0102") {
    linkUrl += "/alys/reptList.html";
  } else if (linkSeq == "0201") {
    linkUrl += "/atcl/elstTrndInfo.html";
  } else if (linkSeq == "0301") {
    linkUrl += "/atcl/ealtAnisRest.html";
  } else if (linkSeq == "0302") {
    linkUrl += "/atcl/cprnAnisRest.html";
  } else {
    linkUrl += "/main.html";
  }
  $("#mainCtir").load(linkUrl);

}

