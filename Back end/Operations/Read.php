<?php
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: GET'); 
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Credentials: true");
    header('Content-Type:application/json; charset=UTF-8');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once("./../Database/Database.php");

    $db=new Database();
    $con=$db->Connection();

    if($_SERVER["REQUEST_METHOD"] != "GET"):
        $db->Message(0,"Page Not Found !");

    elseif(!isset($_GET["id"]) || empty($_GET["id"]) || !is_numeric($_GET["id"])):
        $db->Message(0,"Id is Required !");

    else:
        
        $id=$_GET["id"];
        $stmt=$db->SelectById($id);
        if($stmt->rowCount()):
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success"=>1,
                "data"=>$row
            ));
        endif;

    endif;
?>