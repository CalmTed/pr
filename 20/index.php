<!DOCTYPE html >
<html lang="en-ru">
<head>
	<meta charset="utf-8">
	<title>Заезды на роликах</title>
	<meta name="copyright" Content="TeddyFrost2016">
	<meta name=viewport content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<style>
		#blue{
			color:rgb(70,89,290);
		}
		#copy{
			font-family:inset,Helvetica;
			font-size:19px;
			padding:20px;
			position: fixed;
		}
	</style>
</head>
<body>
<bg i="<?php echo rand(1,7) ?>"></bg>
<div id="content">
	<span id="name">On the skates</span>
	<div id="table">
	<div class="goodday">
		<span class="date">Дата</span>
		<span class="distance">Дистанция</span>
		<span class="time">Время</span>
		<span class="path">Путь</span>
	</div>
		<?php 
			require("db.php");
			$con = mysqli_connect($servername,$username,$db_password,$dbname);
			$query = "SELECT * FROM `skates` ORDER BY `id` DESC LIMIT 0, 150";
			$result = $con->query($query) or die($con->error.__LINE__);
			mysqli_close($con);
			$i = 0;
			$n = 0;
			$t = 0;
			while ($row = $result->fetch_assoc()) {
				echo '<div class="goodday" id="d'.$row['id'].'">'.
					'<span class="date">'.$row['date'].'</span>'.
					'<span class="distance">'.$row['distance'].'</span>'.
					'<span class="time">'.$row['time'].'</span>'.
					'<span class="path"><a target="_blank" href="'.$row['path'].'">посмотреть</a></span>'.
				'</div>';
				$n += $row['distance'];
				$t += $row['time'];
				$i++;
			}
			echo '<div class="goodday border"></div>';
			echo '<div class="goodday results">'.
					'<span class="date">'.$i.' дней</span>'.
					'<span class="distance">'.$n.' ('. round($n/1000).' км)</span>'.
					'<span class="time"> '.$t.'ч</span>'.
					'<span class="path"></span>'.
					'</div>';
		?>
	</div>
</div>
<footer>
	<div id="copy" style="color:#333;font-weight:bold;">Ted<span id="blue">Frost</span></div>
</footer>
</body>
<script src="js/jquery.js"></script>
<script src="js/script.js"></script>
</html>