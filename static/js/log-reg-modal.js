$(function() {
  /////// 注册和登录验证
  var $modal_reg = $('#modal-register form'),
    $modal_login = $('#modal-login form'),
    err_text = {
      need_username: 'User name is required!',
      need_password: 'Password is required!',
      need_email: 'Email address is required!',
      user_existed: 'User name existed!',
      email_existed: 'Email address existed!',
      email_format_err: 'Incorrect format!',
      psw_format_err: 'Incorrect format!',
      login_wrong: 'Password or user name is not corrent!',
      psw_not_match: 'The two password does not match each other!'
    };

  $.validator.addMethod('need_pro', function( value, element ) {
    return $(element).attr('checked') === 'checked';
  }, 'You must agree with the Terms!');

  //设置validate参数
  $modal_reg.validate({
    //debug: true,
    rules: {
      username: {
        required: true,
        rangelength: [1, 30],
        remote: {
          url: $modal_reg.attr('action'),
          type: 'post',
          data: {
            username: function() {
              return $('#username').val();
            },
            field: 'username'
          }
        }
      },
      email: {
        required: true,
        email: true,
        remote: {
          url: $modal_reg.attr('action'),
          type: 'post',
          data: {
            email: function() {
              return $('#email').val();
            },
            field: 'email'
          }
        }
      },
      password: {
        required: true,
        rangelength: [6, 30]
      },
      password2: {
        required: true,
        equalTo: '#password'
      },
      agree_terms: {
        need_pro: true
      }
    },
    messages: {
      username: {
        required: err_text.need_username,
        rangelength: 'Your username must be between 1 and 30 characters long.',
        remote: err_text.user_existed
      },
      email: {
        required: err_text.need_email,
        email: err_text.email_format_err,
        remote: err_text.email_existed
      },
      password: {
        required: err_text.need_password,
        rangelength: 'Your password must be between 6 and 30 characters long.',
      },
      password2: {
        required: err_text.need_password,
        equalTo: err_text.psw_not_match
      }
    }
  });
  var log_v = $modal_login.validate({
    //debug: true,
    rules: {
      username: {
        required: true,
        rangelength: [1, 30]
      },
      password: {
        required: true,
        rangelength: [6, 30]
      }

    },
    messages: {
      username: {
        required: err_text.need_email,
        rangelength: 'Your email address must be between 1 and 30 characters long.'
      },
      password: {
        required: err_text.need_password,
        rangelength: 'Your password must be between 6 and 30 characters long.'
      }
    }
  });
  /////// 注册和登录验证结束

  //登录ajax提交
  $modal_login.submit(function () {
    if ( !log_v.errorList.length ) {
      var $submit_btn = $('#modal-login .submit');
      $modal_login.ajaxSubmit(function (data) {
        var next_url = $('#modal-login').attr('data-next');

        if ( data.success === 0 ) {
          $submit_btn.next().css('display', 'inline');
        } else {
          if (next_url) {
            window.location.assign(next_url);
          } else {
            window.location.reload();
          }
        }
      });
    }
    return false;
  });

  //切换登录和注册模态框
  $('[data-toggle="modal-to"]').click(function() {
    var $this = $(this);
    var $src = $($this.attr('data-src'));
    var $target = $($this.attr('data-target'));
    var next= $this.attr('data-next');

    if ( $src[0] ) {
        $src.modal('hide');
    }

    if ( $target[0] ) {
      $target.modal('show').attr('data-next', next);
      /*var $focus_input = $target.find('form input:visible').eq(0);
      if ( $focus_input.length > 0) {
        setTimeout( function () {
          $focus_input.focus();
        }, 0);
    }
*/      return false;
    } else {
      return true;
    }

  });

  $('.modal').on('shown', function () {
    var $form = $(this).find('form');
    if ( $form.length ) {
      $form.find('input:visible').eq(0).focus();
    }
  }).on('hidden', function () {
    var $form = $('body').find('form:visible');
    if ( $form.length ) {
      $form.find('input:visible').eq(0).focus();
    }
  });
});
