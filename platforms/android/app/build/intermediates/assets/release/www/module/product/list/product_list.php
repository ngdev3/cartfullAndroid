<?php include 'header.php';?>

<header class="container-fluid nav-down">
	<div class="row">
		<nav class="navbar navbar-inverse">
		  <div class="container-fluid no-padding">
			<ul class="nav navbar-nav top_header">
			  <li class="menu_icon back_icon"><a href="#"  ><img src="assets/img/header/back.png" id="asdf" alt="menu icon" /></a></li>
			  <li class="logo_name"><a class="text-left back">Tea</a></li>
			  <li class="cart_icon mr-5">
				  <a href="./view_cart.php"><img src="assets/img/header/cart_icon.png" alt="cart icon" style="width: 16px;" /><span class="badge">14</span></a>
				  <a href="javascript:void(0);"><img src="assets/img/header/filter.png" alt="search icon"  onclick="openFilter()"/></a>
			  </li>
			</ul>
		  </div>
		</nav>
	
	</div>
	<!-- MOBILE-MENU-AREA END -->
</header>
<!-- END HEADER -->
<div id="mySidenav-right" class="sidenav-right">		
	<header id="filter-header" class="container-fluid nav-down">
		<div class="row">
			<nav class="navbar navbar-inverse">
			  <div class="container-fluid no-padding">
				<ul class="nav navbar-nav top_header">
				  <li class="menu_icon"><a href="#" ><img onclick="closeFilter()" src="assets/img/header/cross_icon.png" id="asdf" alt="menu icon" /></a></li>
				  <li class="logo_name" style="width: 100%"><a class="text-center back">Filter</a></li>
				  
				</ul>
			  </div>
			</nav>
		</div>
	</header>
	<div class="filter-body">
		<div class="filter-container">
			<button class="accordion">Categories</button>
			<div class="accordion-panel">
			  <div class="accordion-container">
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label>Fresh Fruits</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Fresh Vegetables</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Grocery Items</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Fresh Breads</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<button class="accordion">Brand</button>
			<div class="accordion-panel">
			  <div class="accordion-container">
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> BB Royal</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> BB Combo</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> orgran</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Star Lion</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<button class="accordion">Price</button>
			<div class="accordion-panel">
			  <div class="accordion-container">
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Less than rs 20</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Rs 21 to Rs 50</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Rs 51 to Rs 100</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Rs 101 to Rs 200</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Rs 201 to Rs 500</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> More than Rs 501</label>
							</div>
						</div>
					</div>
				</div>
			</div>

			<button class="accordion">Food Preference</button>
			<div class="accordion-panel">
			    <div class="accordion-container">
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Vegetarian</label>
							</div>
						</div>
					</div>
					<div class="accordion-options">
						<div class="pretty p-icon p-curve p-pulse">
							<input type="checkbox" name="">
							<div class="state p-info-o">
								<i class="icon fa fa-check"></i>
								<label> Non-Vegetarian</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<footer>
		<div class="apply_btn_container">
			<button> Cancel</button>
			<button> Apply</button>
		</div>
	</footer>
</div>

	
<!--  START listing Section -->

<div id="listing_section" class="container-fluid animatedParent animateOnce">
	
	<div class="row">
		
		<div class="col-sm-4 col-xs-6 pl-5 pr-5 animated fadeInLeft slow">
		   <div class="product_container mt-10">
			  <div class="prod_img_container">
				 <img src="assets/img/product/product_1.png" alt="product image 1" class="img-responsive"/>
			  </div>
			  <div class="prod_content">
				 <h2 class="mb-15">Catch Big Cardamom Whole/Elaichi</h2>
				 <div class="product_wgt">
					<select>
					   <option>wt</option>
					   <option>100g</option>
					   <option>250g</option>
					   <option>500g</option>
					   <option>500g</option>
					   <option>1kg</option>
					</select>
				 </div>
				 <p class="prod_price">
					Rs. 1079.40 <!--<span class="disc_price">Rs.1079.40</span>-->
				 </p>
				 <div class="add_item_container">
					<div class="add_item_button" style="display: none;">
					   <button class="less_item">-</button>
					   <input type="text" value="1" disabled="">
					   <button class="add_item">+</button>
					</div>
					<div class="add_cart_button">
					   <button class="">Add to cart</button>
					</div>
				 </div>
			  </div>
			  <div class="prod_discount">
				 <div class="disc_badge">
					<span>10%</span>
				 </div>
			  </div>
		   </div>
		</div>
		<div class="col-sm-4 col-xs-6 pl-5 pr-5 animated fadeInRight slow">
		   <div class="product_container mt-10">
			  <div class="prod_img_container">
				 <img src="assets/img/product/product_1.png" alt="product image 1" class="img-responsive"/>
			  </div>
			  <div class="prod_content">
				 <h2 class="mb-15">Tata Tea Premium </h2>
				 <div class="product_wgt">
					<select>
					   <option>wt</option>
					   <option>100g</option>
					   <option>250g</option>
					   <option>500g</option>
					   <option>500g</option>
					   <option>1kg</option>
					</select>
				 </div>
				 <p class="prod_price">
					Rs. 1079.40 <!--<span class="disc_price">Rs.1079.40</span>-->
				 </p>
				 <div class="add_item_container">
					<div class="add_item_button" style="display: none;">
					   <button class="less_item">-</button>
					   <input type="text" value="1" disabled="">
					   <button class="add_item">+</button>
					</div>
					<div class="add_cart_button">
					   <button class="">Add to cart</button>
					</div>
				 </div>
			  </div>
			  <div class="prod_discount">
				 <div class="disc_badge">
					<span>10%</span>
				 </div>
			  </div>
		   </div>
		</div>
		<div class="col-sm-4 col-xs-6 pl-5 pr-5 animated fadeInLeft slow">
		   <div class="product_container mt-10">
			  <div class="prod_img_container">
				 <img src="assets/img/product/product_1.png" alt="product image 1" class="img-responsive"/>
			  </div>
			  <div class="prod_content">
				 <h2 class="mb-15">Lipton Yellow Label Tea</h2>
				 <div class="product_wgt">
					<select>
					   <option>wt</option>
					   <option>100g</option>
					   <option>250g</option>
					   <option>500g</option>
					   <option>500g</option>
					   <option>1kg</option>
					</select>
				 </div>
				 <p class="prod_price">
					Rs. 1079.40 <!--<span class="disc_price">Rs.1079.40</span>-->
				 </p>
				 <div class="add_item_container">
					<div class="add_item_button" style="display: none;">
					   <button class="less_item">-</button>
					   <input type="text" value="1" disabled="">
					   <button class="add_item">+</button>
					</div>
					<div class="add_cart_button">
					   <button class="">Add to cart</button>
					</div>
				 </div>
			  </div>
			  <div class="prod_discount">
				 <div class="disc_badge">
					<span>10%</span>
				 </div>
			  </div>
		   </div>
		</div>
		<div class="col-sm-4 col-xs-6 pl-5 pr-5 animated fadeInRight slow">
		   <div class="product_container mt-10">
			  <div class="prod_img_container">
				 <img src="assets/img/product/product_1.png" alt="product image 1" class="img-responsive"/>
			  </div>
			  <div class="prod_content">
				 <h2 class="mb-15">Teabox English Breakfast  Black Tea</h2>
				 <div class="product_wgt">
					<select>
					   <option>wt</option>
					   <option>100g</option>
					   <option>250g</option>
					   <option>500g</option>
					   <option>500g</option>
					   <option>1kg</option>
					</select>
				 </div>
				 <p class="prod_price">
					Rs. 1079.40 <!--<span class="disc_price">Rs.1079.40</span>-->
				 </p>
				 <div class="add_item_container">
					<div class="add_item_button" style="display: none;">
					   <button class="less_item">-</button>
					   <input type="text" value="1" disabled="">
					   <button class="add_item">+</button>
					</div>
					<div class="add_cart_button">
					   <button class="">Add to cart</button>
					</div>
				 </div>
			  </div>
			  <div class="prod_discount">
				 <div class="disc_badge">
					<span>10%</span>
				 </div>
			  </div>
		   </div>
		</div>
		<div class="col-sm-4 col-xs-6 pl-5 pr-5 animated fadeInLeft slow">
		   <div class="product_container mt-10">
			  <div class="prod_img_container">
				 <img src="assets/img/product/product_1.png" alt="product image 1" class="img-responsive"/>
			  </div>
			  <div class="prod_content">
				 <h2 class="mb-15">Catch Big Cardamom Whole/Elaichi</h2>
				 <div class="product_wgt">
					<select>
					   <option>wt</option>
					   <option>100g</option>
					   <option>250g</option>
					   <option>500g</option>
					   <option>500g</option>
					   <option>1kg</option>
					</select>
				 </div>
				 <p class="prod_price">
					Rs. 1079.40 <!--<span class="disc_price">Rs.1079.40</span>-->
				 </p>
				 <div class="add_item_container">
					<div class="add_item_button" style="display: none;">
					   <button class="less_item">-</button>
					   <input type="text" value="1" disabled="">
					   <button class="add_item">+</button>
					</div>
					<div class="add_cart_button">
					   <button class="">Add to cart</button>
					</div>
				 </div>
			  </div>
			  <div class="prod_discount">
				 <div class="disc_badge">
					<span>10%</span>
				 </div>
			  </div>
		   </div>
		</div>
		<div class="col-sm-4 col-xs-6 pl-5 pr-5 animated fadeInRight slow">
		   <div class="product_container mt-10">
			  <div class="prod_img_container">
				 <img src="assets/img/product/product_1.png" alt="product image 1" class="img-responsive"/>
			  </div>
			  <div class="prod_content">
				 <h2 class="mb-15">Tata Tea Premium </h2>
				 <div class="product_wgt">
					<select>
					   <option>wt</option>
					   <option>100g</option>
					   <option>250g</option>
					   <option>500g</option>
					   <option>500g</option>
					   <option>1kg</option>
					</select>
				 </div>
				 <p class="prod_price">
					Rs. 1079.40 <!--<span class="disc_price">Rs.1079.40</span>-->
				 </p>
				 <div class="add_item_container">
					<div class="add_item_button" style="display: none;">
					   <button class="less_item">-</button>
					   <input type="text" value="1" disabled="">
					   <button class="add_item">+</button>
					</div>
					<div class="add_cart_button">
					   <button class="">Add to cart</button>
					</div>
				 </div>
			  </div>
			  <div class="prod_discount">
				 <div class="disc_badge">
					<span>10%</span>
				 </div>
			  </div>
		   </div>
		</div>
		<div class="col-sm-4 col-xs-6 pl-5 pr-5 animated fadeInLeft slow">
		   <div class="product_container mt-10">
			  <div class="prod_img_container">
				 <img src="assets/img/product/product_1.png" alt="product image 1" class="img-responsive"/>
			  </div>
			  <div class="prod_content">
				 <h2 class="mb-15">Lipton Yellow Label Tea</h2>
				 <div class="product_wgt">
					<select>
					   <option>wt</option>
					   <option>100g</option>
					   <option>250g</option>
					   <option>500g</option>
					   <option>500g</option>
					   <option>1kg</option>
					</select>
				 </div>
				 <p class="prod_price">
					Rs. 1079.40 <!--<span class="disc_price">Rs.1079.40</span>-->
				 </p>
				 <div class="add_item_container">
					<div class="add_item_button" style="display: none;">
					   <button class="less_item">-</button>
					   <input type="text" value="1" disabled="">
					   <button class="add_item">+</button>
					</div>
					<div class="add_cart_button">
					   <button class="">Add to cart</button>
					</div>
				 </div>
			  </div>
			  <div class="prod_discount">
				 <div class="disc_badge">
					<span>10%</span>
				 </div>
			  </div>
		   </div>
		</div>
		<div class="col-sm-4 col-xs-6 pl-5 pr-5 animated fadeInRight slow">
		   <div class="product_container mt-10">
			  <div class="prod_img_container">
				 <img src="assets/img/product/product_1.png" alt="product image 1" class="img-responsive"/>
			  </div>
			  <div class="prod_content">
				 <h2 class="mb-15">Teabox English Breakfast  Black Tea</h2>
				 <div class="product_wgt">
					<select>
					   <option>wt</option>
					   <option>100g</option>
					   <option>250g</option>
					   <option>500g</option>
					   <option>500g</option>
					   <option>1kg</option>
					</select>
				 </div>
				 <p class="prod_price">
					Rs. 1079.40 <!--<span class="disc_price">Rs.1079.40</span>-->
				 </p>
				 <div class="add_item_container">
					<div class="add_item_button" style="display: none;">
					   <button class="less_item">-</button>
					   <input type="text" value="1" disabled="">
					   <button class="add_item">+</button>
					</div>
					<div class="add_cart_button">
					   <button class="">Add to cart</button>
					</div>
				 </div>
			  </div>
			  <div class="prod_discount">
				 <div class="disc_badge">
					<span>10%</span>
				 </div>
			  </div>
		   </div>
		</div>
		
		

		
	</div>
</div>


<!--  END listing Section -->	


<?php include 'footer.php';?>