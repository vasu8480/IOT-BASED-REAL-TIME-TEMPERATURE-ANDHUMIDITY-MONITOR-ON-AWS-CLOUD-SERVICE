<?php
  session_start();
  $var=$_GET['r'];
  
  
  $servername='localhost';
$username='root';
$password='vasu';
$database='vasu';

// Create connection
$con = mysqli_connect($servername, $username, $password,$database);

// Check connection
if (!$con) {
die("Connection failed: " . mysqli_connect_error());
}


//execute query
 $query="select dataupdate,".$var." from vasu_wms ORDER BY id DESC LIMIT 0, 10";
        $result=mysqli_query($con,$query);
        $rowcount=mysqli_num_rows($result);

$data = array();
while($row = mysqli_fetch_array($result)) {
	
	$data[] = $row;
}

// print_r($data);
$tdata = array();
foreach ($data as $key => $row)
{
    $tdata[$key] = $row['dataupdate'];
}
array_multisort($tdata, SORT_ASC, $data);
// print_r($data);
//print_r($tdata);

//free memory associated with result


//now print the data
 print json_encode($data);
?>