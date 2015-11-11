/**
 * spa.shell.js
 * shell module for spa
 * Created by apple on 11/7/15.
 */
/*jslint browser:true,continue:true,
 devel:true,indent:2,maxerr:50,
 newcap:true,nomen:true,plusplus:true,
 regexp:true,sloppy:true,vars:false,
 white:true
  */

/* global $,spa */
spa.shell = (function() {
  //----------------BEGIN MODULE SCOPE VARIABLES -------------------//
  var
      configMap = {
        main_html:String()
          + '<div class="spa-shell-head">'
            + '<div class="spa-shell-head-logo"></div>'
            + '<div class="spa-shell-head-acct"></div>'
            + '<div class="spa-shell-head-search"></div>'
          + '</div>'
          + '<div class="spa-shell-main">'
            +'<div class="spa-shell-main-nav"></div>'
            +'<div class="spa-shell-main-content"></div>'
          + '</div>'
          + '<div class="spa-shell-foot"></div>'
          + '<div class="spa-shell-chat"></div>'
          + '<div class="spa-shell-modal"></div>',
        chat_extend_time:600,
        chat_retract_time:300,
        chat_extend_height:450,
        chat_retract_height:15,
        chat_extend_title:"点击收起",
        chat_retract_title:"双击展开"
      },
      stateMap = {
        $container:null,
        is_chat_retracted:true
      },
      jqueryMap = {},
      setJqueryMap,toogleChat,initModule;
  //----------------END MODULE SCOPE VARIABLES -------------------//

  //----------------BEGIN UTILITY METHODS ------------------------//
  //----------------END UTILITY METHODS --------------------------//

  //----------------BEGIN DOM METHODS ----------------------------//
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container:$container,
      $chat:$container.find('.spa-shell-chat')
    };
  };
  //----------------END DOM METHODS ------------------------------//
  toogleChat = function (do_extend,callback) {
    var
        px_chat_ht = jqueryMap.$chat.height(),
        is_open = px_chat_ht === configMap.chat_extend_height,
        is_closed = px_chat_ht === configMap.chat_retract_height,
        is_sliding = !is_open && !is_closed;
    // avoid race condition
    if (is_sliding) {
      return false;
    }
    //begin extend chat slider
    if (do_extend) {
      jqueryMap.$chat.animate(
          {height:configMap.chat_extend_height},
          configMap.chat_extend_time,
          function () {
            jqueryMap.$chat.attr(
                'title',configMap.chat_extend_title
            );
            stateMap.is_chat_retracted = false;
            if (callback) {
              callback(jqueryMap.$chat);
            }
          }
      );
      return true;
    }

    jqueryMap.$chat.animate(
        {height:configMap.chat_retract_height},
        configMap.chat_retract_time,
        function() {
          jqueryMap.$chat.attr(
            'title',configMap.chat_retract_title
          );
          stateMap.is_chat_retracted = true;
          if (callback) {
            callback(jqueryMap.$chat);
          }
        }
    );
    return true;
  }
  //----------------BEGIN EVENT HANDLERS -------------------------//
  onClickChat = function (e) {
    toogleChat(stateMap.is_chat_retracted);
    return false;
  }
  //----------------END EVENT HANDLERS ---------------------------//

  //----------------BEGIN PUBLIC METHODS--------------------------//
  //Begin Public method /initModule/
  initModule = function ($c) {
    stateMap.$container = $c;
    $c.html(configMap.main_html);
    setJqueryMap();
    stateMap.is_chat_retracted = true;
    jqueryMap.$chat
        .attr('title',configMap.chat_retract_title)
        .click(onClickChat);
  };
  //End Public method /initModule/
  return {initModule:initModule};
  //----------------END PUBLIC METHODS----------------------------//

}());
