let panelComponent = (function () {
  function appendPanel(
    panelNo,
    author,
    datetime,
    title,
    essence,
    content,
    likeitNums
  ) {
    let headerHtml = makePanelHeader(author, datetime, essence);
    //let contentHtml=makePanelContent(title,content);
    let contentHtml = makePanelContent(title, essence, content);
    let opsHtml = makePanelOps(panelNo, likeitNums);
    let retPanel = makePanel(panelNo, headerHtml, contentHtml, opsHtml);

    return retPanel;
  }

  function makePanel(panelNo, headerHtml, contentHtml, opsHtml) {
    let bOk = false;
    let str = "";
    str = "<div class='panel' data-no='" + panelNo + "'>"; //panel
    str += "<img src='static/images/woman.png' alt='photo' class='photo'>"; //photo
    str += "<div class='main'>"; //main
    if (headerHtml !== "") str += headerHtml;
    else return bOk;

    if (contentHtml) str += contentHtml;
    else return bOk;

    if (opsHtml !== "") str += opsHtml;
    else return bOk;

    str += "</div>"; //main end
    str += "</div>"; //panel end

    return str;
  }

  function makePanelHeader(author, datetime, essence) {
    let str = "";
    str += '<div class="main_header">'; //header
    str += '<ul class="person_info"> ';
    str += "<li>" + author + "</li>";
    str += "<li>" + datetime + "</li>";
    str += "</ul>";
    str += '<div class="toolbar">'; //头部右边菜单
    str += '<img src="static/images/list.png" alt="toolbar"/>';
    str += '<ul class="dropdown-content">';
    if (essence == 0)
      str += "<li>置顶</li><li>加精</li><li>编辑</li><li>删除</li>";
    else str += "<li>置顶</li><li>取消加精</li><li>编辑</li><li>删除</li>";
    str += "</ul>";
    str += "</div>"; // 头部靠右菜单 end
    str += "</div>"; //主体头部 end

    return str;
  }

  function makePanelContent(title, essence, content) {
    let str = "";
    str += '<div class="content">'; // <!-- 课程要点 -->
    if (essence == 1)
      str += '<h1><span class="essence">加精</span>' + title + "</h1>";
    else str += "<h1>" + title + "</h1>";
    str += "<p>";
    str += content;
    str += "</p>";
    str += "</div>"; //<!-- 课程要点 end -->

    return str;
  }

  function makePanelOps(panelNo, likeitNums) {
    let str = "";
    str += '<div class="buttons" data-no=\'' + panelNo + "'>"; //<!-- 操作区 -->
    str += '<div class="like_it">';
    str += '<img src="static/images/likeit.png" alt="likeit">';
    str += '<span class="btn-likeit">赞' + likeitNums + "</span>";
    str += "</div>"; //likeit end
    str += '<div class="chat">'; //chat
    str += '<img src="static/images/chat.png" alt="chat">';
    str += '<span class="btn-reply">回复</span>';
    str += "</div>"; //chat end
    str += "</div>"; // <!-- 操作区 end -->

    return str;
  }

  //点赞
  function likeitClick(panelNums, strKey) {
    for (let index = 1; index <= panelNums; index++) {
      $(".btn-likeit")
        .eq(index - 1)
        .on("click", function (e) {
          let panelNo = $(this).parent().parent().attr("data-no");
          let keyName = strKey + panelNo;
          let likeitNums = parseInt(sessionStorage.getItem(keyName));
          likeitNums += 1;
          sessionStorage.setItem(keyName, likeitNums);
          let _this = this;
          $.get(
            PANEL_OPTIONS.likeitNumsUrl,
            { panel_id: panelNo },
            function (res) {
              let code = res[0].code;
              let msg = res[0].msg;
              if (code == 1) {
                $(_this).text("赞" + likeitNums);
              } else {
                displayErrors(objContainer, msg);
              }
            },
            "json"
          );
        });
    }
  }

  //删除面板
  function delClick(panelNums, liLen) {
    for (let index = 0; index < panelNums; index++) {
      $("ul.dropdown-content li")
        .eq(index * liLen + 3)
        .on("click", function (e) {
          let panel = $(this).parents().eq(4);
          let panelNo = panel.attr("data-no");
          console.log(panelNo);
          $.get(
            PANEL_OPTIONS.delUrl,
            { panel_id: panelNo },
            function (res) {
              let code = res[0].code;
              let msg = res[0].msg;
              if (code == 1) {
                panel.remove();
              } else {
                displayErrors(objContainer, msg);
              }
            },
            "json"
          );
        });
    }
  }

  //编辑标题和内容===完成参考=========================================

  function essenceHandle(isEssence, content, isTextarea) {
    let h1Str = content;
    let spanStr = "";
    if (isEssence) spanStr = '<span class="essence">加精</span>';
    if (!isTextarea) h1Str = '<input type="text" value=\'' + content + "'/>";
    return spanStr + h1Str;
  }
  //变成输入框
  function editHtml(obj, content, type, isEssence) {
    obj.empty();
    if (type == "text") {
      obj.html(essenceHandle(isEssence, content, 0));
      obj.children("input").focus().on("blur", onInputBlur);
    } else if (type == "textarea") {
      let str = '<textarea rows="4">' + content + "</textarea>";
      obj.append(str);
      obj.children("textarea").focus().on("blur", onTextareaBlur);
    }
  }

  //重新写入标题的文字（重新加精）
  function onInputBlur(e) {
    let inputValue = $(this).val();
    let content = $(this).parent().next();
    let h1 = $(this).parent();
    let isEssence = h1.children("span").text() === "加精";

    let panel = $(this).parent().parent().next();
    let panelNo = panel.attr("data-no");

    $.get(
      PANEL_OPTIONS.editUrl,
      { panel_id: panelNo, input: inputValue, type: "text" },
      function (res) {
        let code = res[0].code;
        let msg = res[0].msg;
        if (code == 1) {
          h1.html(essenceHandle(isEssence, inputValue, 1));
        } else {
          displayErrors(objContainer, msg[0]);
        }
      },
      "json"
    );
    editHtml(content, content.html(), "textarea", 0);
  }

  //重新写入内容的文字
  function onTextareaBlur(e) {
    let inputValue = $(this).val();
    let panel = $(this).parent().parent().next();
    let panelNo = panel.attr("data-no");
    let _this = this;
    console.log("rtr" + panelNo + inputValue);
    $.get(
      PANEL_OPTIONS.editUrl,
      { panel_id: panelNo, input: inputValue, type: "textarea" },
      function (res) {
        console.log("rtr" + panelNo + inputValue);
        let code = res[0].code;
        let msg = res[0].msg;
        if (code == 1) {
          $(_this).parent().empty().append("p").html(inputValue);
        } else {
          //回溯content
          displayErrors(objContainer, msg[0]);
        }
      },
      "json"
    );
  }

  function editClick(panelNums, liLen) {
    for (let index = 0; index < panelNums; index++) {
      $("ul.dropdown-content li")
        .eq(index * liLen + 2)
        .on("click", function (e) {
          let contentParent = $(this)
            .parents()
            .eq(3)
            .children()
            .eq(1)
            .children();
          let title = contentParent.eq(0);
          let content = $(this).parent().next();
          let isEssence = title.children("span").text() === "加精";
          let h1Text = title.text();

          if (isEssence) h1Text = h1Text.substring(2);
          //开始修改
          editHtml(title, h1Text, "text", isEssence);
        });
    }
  }
  //编辑标题和内容===完成====end=======================================

  function toppingClick(container, panelNums, liLen) {
    for (let index = 0; index < panelNums; index++) {
      $("ul.dropdown-content li")
        .eq(index * liLen)
        .on("click", function (e) {
          let panel = $(this).parents().eq(4);
          let panelNO = panel.attr("data-no");
          $.get(
            PANEL_OPTIONS.topUrl,
            { panel_id: panelNO },
            function (res) {
              let code = res[0].code;
              let msg = res[0].msg;
              if (code == 1) {
                $(container).prepend(panel);
              } else {
                displayError(objContainer, msg);
              }
            },
            "json"
          );
        });
    }
  }

  //加精===完成参考==================================================
  const ESSENCE_TIPS = ["加精", "取消加精"];
  function setEssence(obj, liInfo) {
    let str = "";
    let contentParent = obj.parents().eq(3).children().eq(1).children().eq(0);
    if (liInfo == ESSENCE_TIPS[0]) {
      obj.text(ESSENCE_TIPS[1]);
      str = '<span class="essence">加精</span>';
      contentParent.prepend(str);
    } else {
      obj.text(ESSENCE_TIPS[0]);
      contentParent.children().eq(0).remove();
    }
  }

  function setEssenceClick(panelNums, liLen) {
    for (let index = 0; index < panelNums; index++) {
      $("ul.dropdown-content li")
        .eq(index * liLen + 1)
        .on("click", function (e) {
          let panel = $(this).parents().eq(4);
          let panelNo = panel.attr("data-no");
          console.log(panelNo);
          let _this = this;
          $.get(
            PANEL_OPTIONS.essenceUrl,
            { panel_id: panelNo },
            function (res) {
              let code = res[0].code;
              let msg = res[0].msg;
              if (code == 1) {
                setEssence($(_this), $(_this).text());
              } else {
                displayErrors(objContainer, msg);
              }
            },
            "json"
          );
        });
    }
  }
  //加精===完成====end==============================================

  return {
    appendPanel: appendPanel,
    likeitClick: likeitClick,
    delClick: delClick,
    editClick: editClick,
    toppingClick: toppingClick,
    setEssenceClick: setEssenceClick,
  };
})();
