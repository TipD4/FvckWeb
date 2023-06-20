<?php
$code=0;
$data=[];
$msg=["编辑失败","编辑成功"];

//1、获取前端数据，panel_id
$id=$_GET["panel_id"];
$input=$_GET["input"];
$type=$_GET["type"];


//2、校验
if (empty($id) || empty($input)) {
    // 参数为空
}
if (!ctype_digit($id)) {
    // id必须为数字
}
if (strlen($input) > 1000) {
    // 内容长度不能超过1000，标题长度不能超过100
}
else{

    //3、连接数据库
    include("conn.php");
    include("functions.php");


    //4、操作数据库
    if($type=="text"){
        $sql="UPDATE panels SET panel_title = ? WHERE panel_id = ?";
    }
    else if($type=="textarea"){
        $sql="UPDATE panels SET panel_content = ? WHERE panel_id = ?";
    }
    $stmt=mysqli_prepare($conn,$sql);
    mysqli_stmt_bind_param($stmt,"si",$input,$id);
    mysqli_stmt_execute($stmt);
    if (mysqli_errno($conn) == 0) {  // 根据错误码判断更新是否成功
        $code = 1;
    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
//5、json输出
echo getApiResult($code,$data,$msg);