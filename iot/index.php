<?php
$servername='localhost';
$username='root';
$password='vasu';
$database='vasu';

// Create connection
$conn = mysqli_connect($servername, $username, $password,$database);

// Check connection
if (!$conn) {
die("Connection failed: " . mysqli_connect_error());
}
//echo "Connected successfully";

$query='SELECT * FROM vasu_wms';

$result=mysqli_query($conn,$query);
?>
<style>
table, th, td {
border: 1px solid red;
border-collapse: collapse;
}
</style>

<table style="border:1px solid red;">
<tr>
<th>ID</th>
<th>Temperature</th>
<th>Humidity</th>
<th>Updated at</th>
</tr>

<?php

if(mysqli_num_rows($result)>0)
{
while($row=mysqli_fetch_assoc($result)){
?>
<tr>
<td><?php echo $row['id']; ?></td>
<td><?php echo $row['temp']; ?></td>
<td><?php echo $row['hum']; ?></td>
<td><?php echo $row['dataupdate']; ?></td>
</tr>

<?php
//echo 'id:'.$row['id'].' username:'.$row['username'].' password:'.$row['password'].' Created at:'. $row['createat'].'<br>';
}
?>
</table><?php

}
else
{
echo 'no data';
}
mysqli_close($con);

?>