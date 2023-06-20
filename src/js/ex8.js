const MENU_NUMS=4; 
const LIKEIT_STR="likeitNums";

let objContainer=document.getElementsByClassName('container')[0];


/**
 * 
 * @param {Object} panel - 一块面板数据对象
 * @returns 一块面板的html字符串
 */
function addOnePanel(panel){
    let author=panel.user;
    let datetime=panel.date;
    let title=panel.title,
        essence=panel.essencePanels,
        content=panel.content;
    let panelNo=panel.id;
    let likeitNums=panel.likeitNums;
    makeSessionNums(panelNo,likeitNums);
    return panelComponent.appendPanel(panelNo,author,datetime,title,essence,content,likeitNums);
    //return panelComponent.appendPanel(panelNo,author,datetime,title,content,likeitNums);
    
}

/**
 * 将面板的点赞数离线缓存
 * @param {Number} i - 面板id号
 * @param {Number} likeitNums  - 面板点赞数
 */
function makeSessionNums(i,likeitNums){
    let keyName=LIKEIT_STR+i;
    sessionStorage.setItem(keyName,likeitNums);
   
}

/**
 * 初始化
 */
function initData(){
    $(objContainer).empty();
    displayErrors(objContainer,"");
}

/**
 * 生成页面的面板，并注册对应的事件
 * @param {Object} panels - 多块面板数据对象
 */
function createPanels(panels){
    let strHtml="";
    let panelNums=panels.length;
    
    initData();

    for(let i=0;i<panelNums;i++){
        strHtml+=addOnePanel(panels[i]);   
    }
    $(objContainer).empty();
    addHtmlIntoDoc(objContainer,strHtml);
    panelComponent.likeitClick(panelNums,LIKEIT_STR);
    panelComponent.toppingClick(objContainer,panelNums,MENU_NUMS);
    panelComponent.delClick(panelNums,MENU_NUMS);
    panelComponent.editClick(panelNums,MENU_NUMS);
    panelComponent.setEssenceClick(panelNums,MENU_NUMS);
}

/**
 * 生成页面的登录框，并且注册登录事件
 */
function createLogin(){
    loginForm=new LoginComponent(LOGIN_SETTINGS);
    let strHtml=loginForm.appendLogin();
    addHtmlIntoDoc(objContainer,strHtml);
    loginForm.blurClick();
    loginForm.loginClick(createPanels);
}

/**
 * 主程序入口
 */
function init(){ 
   createLogin();  //从登录框开始
}

init();