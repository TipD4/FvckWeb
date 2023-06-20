const ERRORS={
    "panelError":"面板生成错误",
    "loginError":"登录失败"
};
const LOGIN_SETTINGS={
    "formName":"loginForm",
    "handleUrl":"src/php/loginCheck.php",
    "method":"get",
    "userName":"userName",
    "userPwd":"userPwd",
    "btnLogin":"btnLogin",
    "imageUrl":"static/images/images.jpg",
    "dataUrl":"src/php/getPanels.php", 
    "errors":ERRORS  
};

const PANEL_OPTIONS={
    "delUrl":"src/php/delPanel.php", //删除面板处理脚本
    "addUrl":"src/php/addComment.php", //新增回复处理脚本
    "likeitNumsUrl":"src/php/addLikeitnums.php", //点赞处理脚本
    "editUrl":"src/php/updatePanel.php", //编辑处理脚本
    "topUrl":"src/php/setTop.php", //置顶处理脚本
    "essenceUrl":"src/php/setEssence.php" //加精处理脚本
};
