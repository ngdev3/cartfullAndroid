<?php include 'header.php';?>

<header class="container-fluid nav-down">
	<div class="row">
		<nav class="navbar navbar-inverse">
		  <div class="container-fluid no-padding">
			<ul class="nav navbar-nav top_header">
			  <li class="menu_icon back_icon"><a href="#"  ><img src="assets/img/header/back.png" id="asdf" alt="menu icon" /></a></li>
			  <li class="logo_name"><a class="text-left back">All Categories</a></li>
			  <li class="cart_icon">
				  <a href="#"><img src="assets/img/header/user_icon.png" alt="heart icon" /></a>
				  <a href="./view_cart.php"><img src="assets/img/header/cart_icon.png" alt="cart icon" style="width: 15px;" /><span class="badge">14</span></a>
				  <a href="#"><img src="assets/img/header/search_icon.png" alt="search icon" /></a>
			  </li>
			</ul>
			<ul class="nav navbar-nav bottom_header">
			  <li class="menu_search_container"><a href="#">
				<img src="assets/img/header/search_icon.png" alt="cart icon" />
				<input type="text" class="menu_search" placeholder="Search products brands and more"/>
			  </a></li>
			</ul>
		  </div>
		</nav>
	
	</div>
	<!-- MOBILE-MENU-AREA END -->
</header>

<!-- END HEADER -->    
     
	
	<div class="container-fluid mb-15 animatedParent animateOnce" id="category_list">
	    <div class="row">
		    <div class="col-xs-6 pl-5 pr-5 mt-5 mb-5">
						<div class="animated fadeInLeft slow go">
							<a href="javascript:void(0);">
								<div class="offer-img">
									<img src="assets/img/category/catg_1.png" alt="" class="img-responsive">
									<div class="catg_overlay text-center">
										<p>Tea</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-xs-6 pl-5 pr-5 mt-5 mb-5">
						<div class="animated fadeInRight slow go">
							<a href="javascript:void(0);">
								<div class="offer-img">
									<img src="assets/img/category/catg_2.png" alt="" class="img-responsive">
									<div class="catg_overlay text-center">
										<p>Beverages</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-xs-6 pl-5 pr-5 mt-5 mb-5">
						<div class="animated fadeInLeft slow go">
							<a href="javascript:void(0);">
								<div class="offer-img">
									<img src="assets/img/category/catg_3.png" alt="" class="img-responsive">
									<div class="catg_overlay text-center">
										<p>Home &amp; Kitchen</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-xs-6 pl-5 pr-5 mt-5 mb-5">
						<div class="animated fadeInRight slow go">
							<a href="javascript:void(0);">
								<div class="offer-img">
									<img src="assets/img/category/catg_4.png" alt="" class="img-responsive">
									<div class="catg_overlay text-center">
										<p>Grocery &amp; Staples</p>
									</div>
								</div>
							</a>
						</div>
					</div>
		    <div class="col-xs-6 pl-5 pr-5 mt-5 mb-5">
						<div class="animated fadeInLeft slow go">
							<a href="javascript:void(0);">
								<div class="offer-img">
									<img src="assets/img/category/catg_1.png" alt="" class="img-responsive">
									<div class="catg_overlay text-center">
										<p>Tea</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-xs-6 pl-5 pr-5 mt-5 mb-5">
						<div class="animated fadeInRight slow go">
							<a href="javascript:void(0);">
								<div class="offer-img">
									<img src="assets/img/category/catg_2.png" alt="" class="img-responsive">
									<div class="catg_overlay text-center">
										<p>Beverages</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-xs-6 pl-5 pr-5 mt-5 mb-5">
						<div class="animated fadeInLeft slow go">
							<a href="javascript:void(0);">
								<div class="offer-img">
									<img src="assets/img/category/catg_3.png" alt="" class="img-responsive">
									<div class="catg_overlay text-center">
										<p>Home &amp; Kitchen</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="col-xs-6 pl-5 pr-5 mt-5 mb-5">
						<div class="animated fadeInRight slow go">
							<a href="javascript:void(0);">
								<div class="offer-img">
									<img src="assets/img/category/catg_4.png" alt="" class="img-responsive">
									<div class="catg_overlay text-center">
										<p>Grocery &amp; Staples</p>
									</div>
								</div>
							</a>
						</div>
					</div>
		</div>
	</div>
	
	   
<script>

	
$(document).ready(function(){
	$(".cart_icon a:last-child").click(function(){
		$(".bottom_header").slideToggle();
		//$("#banner_slider").toggleClass("search-container")
	})
	
	
	});
    </script>	

<?php include 'footer.php';?>