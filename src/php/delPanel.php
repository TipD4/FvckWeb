<?php
$code=0;
$data=[];
$msg=["删除面板失败","删除面板成功"];

//1、获取前端数据，panel_id
$id=$_GET["panel_id"];
//2、校验
if (empty($id)) {
    // 参数为空
}
if (!ctype_digit($id)) {
    // id必须为数字
}
else{

    //3、连接数据库
    include("conn.php");
    include("functions.php");
    //4、操作数据库
    $sql="delete from panels where panel_id=?";
    $stmt=mysqli_prepare($conn,$sql);
    mysqli_stmt_bind_param($stmt,"i",$id);
    mysqli_stmt_execute($stmt);
    if(mysqli_stmt_affected_rows($stmt)>0) $code=1;
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
//5、json输出
echo getApiResult($code,$data,$msg);