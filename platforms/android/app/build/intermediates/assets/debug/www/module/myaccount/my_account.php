<?php include 'header.php';?>

<header class="container-fluid nav-down">
	<div class="row">
		<nav class="navbar navbar-inverse">
		  <div class="container-fluid no-padding">
			<ul class="nav navbar-nav top_header">
			  <li class="menu_icon back_icon"><a href="#"  ><img onclick="openNav()" src="assets/img/header/back.png" id="asdf" alt="menu icon" /></a></li>
			  <li class="logo_name"><a class="text-left back">My Account</a></li>
			  
			</ul>
		  </div>
		</nav>
	
	</div>
	<!-- MOBILE-MENU-AREA END -->
</header>

<!-- END HEADER -->    
     
	
	<div class="my_profile_div mt-50">
	    <ul class="profile_menu">
		   <li>
				<a>
				   <span class="profile_type">
				        <img src="assets/img/my_profile.png">
                        <p>My Profile</p>						
				   </span>	
				   
				</a>
			  
		   </li>
		   <li>
				<a>
				   <span class="profile_type">
				        <img src="assets/img/my_order.png">
                        <p>My Orders</p>						
				   </span>	
				   
				</a>
			  
		   </li>
		   <li>
				<a href="./view_cart.php">
				   <span class="profile_type">
				        <img src="assets/img/my_address.png">
                        <p>My Address</p>						
				   </span>	
				   
				</a>
			  
		   </li>
		   <li>
				<a>
				   <span class="profile_type">
				        <img src="assets/img/change_password.png">
                        <p>Change Password</p>						
				   </span>
                   		   
				</a>
			  
		   </li>
		   <li>
				<a>
				   <span class="profile_type">
				        <img src="assets/img/log_out.png">
                        <p>Logout</p>						
				   </span>
                   		   
				</a>
			  
		   </li>
		</ul>
	</div>  
	   
	

<?php include 'footer.php';?>