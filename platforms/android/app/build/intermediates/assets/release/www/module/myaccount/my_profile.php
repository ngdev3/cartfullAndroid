<?php include 'header.php';?>

<header class="container-fluid nav-down">
	<div class="row">
		<nav class="navbar navbar-inverse">
		  <div class="container-fluid no-padding">
			<ul class="nav navbar-nav top_header">
			  <li class="menu_icon back_icon"><a href="#"  ><img onclick="openNav()" src="assets/img/header/back.png" id="asdf" alt="menu icon" /></a></li>
			  <li class="logo_name"><a class="text-left back">My Profile</a></li>
			  <li class="cart_icon mr-5">
				  <a href="javascript:void(0);"><img src="assets/img/edit_profile.png" alt="search icon"/></a>
			  </li>
			</ul>
		  </div>
		</nav>
	
	</div>
	<!-- MOBILE-MENU-AREA END -->
</header>

<!-- END HEADER -->    
     
	
	 <div class="my_profile mt-70 mb-30">
	   <div class="edit-profile pb-10">
	       <div class="profile_pic_container">
			   <div class="profile_pic">
				   <img  id="blah" src="assets/img/profile_image.png">
			   </div>
			   <div class="edit-button">
	             <a><img src="assets/img/edit-button.png"></a>
		         <div class="overlay">
			      <input id="imgInp" type="file">
			      <p>Edit</p>
		         </div>
			   </div>
		   </div>
	   </div>
	   
	</div>
    
	<div class="input-container pr-20 pl-20" id="sign_up">
      <div class="sign-up-form mb-20">
        <input type="text" value="" placeholder="Full Name">
		<img src="assets/img/name.png">
      </div>
	  <div class="sign-up-form mb-20">
        <input type="text" value="" placeholder="Email Address">
		<img src="assets/img/email.png">
      </div>
	  <div class="sign-up-form mb-20">
        <input type="text" value="" placeholder="Mobile Number">
		<img src="assets/img/phone.png" class="mobile_img">
      </div>
	  <div class="sign-up-form mb-20">
        <input type="text" value="" placeholder="Date Of Birth">
		<img src="assets/img/dob.png">
		<img class="calender" src="assets/img/calender.png">
      </div>
	  <div class="sign-up-form mb-20" style="box-shadow: none;">
		 <label class="radio-inline gender">
           Gender
         </label>
         <div class="pretty p-icon p-round p-pulse">
          <input type="radio" name="icon" />
           <div class="state p-info-o">
             <i class="icon fa fa-check"></i>
             <label>Male</label>
           </div>
        </div>
         <div class="pretty p-icon p-round p-pulse">
          <input type="radio" name="icon" />
           <div class="state p-info-o">
             <i class="icon fa fa-check"></i>
             <label>Female</label>
           </div>
        </div>
	  </div>
	  
    </div>
	
	

    <div class="sign-up-button mt-35">
    	<a href="#"><button class="btn">
    		Submit
    	</button></a>
    </div>
	   
	

<?php include 'footer.php';?>