(function() {
  "use strict";

  // Define your library strictly...

})();

$(document).ready(function() {
  $(".file-photo").change(function() {
    var filename = $(this)
      .val()
      .replace(/.*\\/, "");
    $(".file-photo-place").html(filename);
  });

  $(".file-resume").change(function() {
    var filename = $(this)
      .val()
      .replace(/.*\\/, "");
    $(".file-resume-place").html(filename);
  });

  $(".file-test").change(function() {
    var filename = $(this)
      .val()
      .replace(/.*\\/, "");
    $(".file-test-place").html(filename);
  });
  //=================================

  $(".content__btn_btnAdd, .delete").on("click", function() {
    $(".overlay").toggleClass("overlay-Open");
    $(".container").toggleClass("fix");

  });

  $("#mail-2_add, #mail-2_del").on("click", function() {
    $(".mailHidden").toggleClass("Open");
    $(".mail-2_add").addClass("mailHidden");
  });
  $("#phone-2_add, #phone-2_del").on("click", function() {
    $(".phoneHidden").toggleClass("Open");
    $(".phone-2_add").addClass("phoneHidden");
  });

 /*  $(".subtitleAdd").on("click", function() {
    $(this)
      .parent()
      .children(".titleAdd")
      .addClass("Open");
    $(this).addClass("off");
  });
  $(".titleAdd").on("click", function() {
    $(this).removeClass("Open");
    $(this)
      .parent().children(".subtitleAdd")
      .removeClass("off");
  });
 */
  
  $(".subtitleAdd").on("click", function() {
    $(this)
      .parent()
      .children(".titleAdd")
      .addClass("Open");
    $(this).addClass("off");
  });
  $(".titleAdd").on("click", function() {
    $(this).removeClass("Open");
    $(this)
      .parent().children(".subtitleAdd")
      .removeClass("off");
  });



  $("#sendForm")[0].reset();

  //=============================================================

  $("[value='1']").click(function() {
    $(this)
      .parent()
      .css("color", "#ff5d00");
  });

  $("[value='2']").click(function() {
    $(this)
      .parent()
      .css("color", "#ffa800");
  });
  $("[value='3']").click(function() {
    $(this)
      .parent()
      .css("color", "#dae700");
  });

  $("[value='4']").click(function() {
    $(this)
      .parent()
      .css("color", "#a7ce23");
  });

  $(".reset").click(function() {
    $(".star-rating").css("color", "#ddd");
  });
  
});



