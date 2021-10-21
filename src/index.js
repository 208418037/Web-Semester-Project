import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from 'jquery';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  
);
// JavaScript Document
$(function () {
  // btn toggle
  $('#nav .toggle').click(function (e) {
      $(this).toggleClass('active');
      $('#nav .nav-block').slideToggle();
  });
  // close
  $('#nav .close').click(function (e) {
      $('#nav .nav-block').slideUp();
      $('#nav .toggle').removeClass('active');
  });

  $("#people .up").click(function (e) {
      $("#header .sr-only-focusable").focus();
  });

  $("#official .up").click(function (e) {
      $("#header .sr-only-focusable").focus();
  });

  $("#personnel .up").click(function (e) {
      $("#header .sr-only-focusable").focus();
  });

});

// index block
$('#people .under').click(function () {
  var $dirFocus = $(this).index();
  if ($dirFocus == 0) {
      $('html , body').animate({ scrollTop: $('#people').offset().top }, 500);
  }
});
$('#official .under').click(function () {
  var $dirFocus = $(this).index();
  if ($dirFocus == 0) {
      $('html , body').animate({ scrollTop: $('#official').offset().top }, 500);
  }
});
$('#personnel .under').click(function () {
  var $dirFocus = $(this).index();
  if ($dirFocus == 0) {
      $('html , body').animate({ scrollTop: $('#personnel').offset().top }, 500);
  }
});

// official sub menu
$(window).bind('load , resize', function () {
  if ($(this).width() > 768) {
      //$('#official dl').hover(function () {
      //    $(this).find('ul').addClass('hover').end().children('ul').css({
      //        visibility: 'visible'
      //    }).show();
      //}, function () {
      //    $(this).find('ul').removeClass('hover').end().children('ul').hide();
      //});
      //$('#personnel dl').hover(function () {
      //    $(this).find('ul').addClass('hover').end().children('ul').css({
      //        visibility: 'visible'
      //    }).show();
      //}, function () {
      //    $(this).find('ul').removeClass('hover').end().children('ul').hide();
      //});
      /*a�˻`����ֱ������dl����Ԫ��*/
      $('#official dl').hover(function () {
          $(this).find('ul').addClass('hover').end().find('ul').css({
              visibility: 'visible'
          }).show();
      }, function () {
          $(this).find('ul').removeClass('hover').end().find('ul').hide();
      });
      $('#personnel dl').hover(function () {
          $(this).find('ul').addClass('hover').end().find('ul').css({
              visibility: 'visible'
          }).show();
      }, function () {
          $(this).find('ul').removeClass('hover').end().find('ul').hide();
      });

  } else {
      $('#official dl').hover(function () {
          $('#official ul').hide();
      })
      $('#personnel dl').hover(function () {
          $('#personnel ul').hide();
      })

  }
});

// nav



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
