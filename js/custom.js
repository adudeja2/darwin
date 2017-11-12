var products = [];
var selectedCategoryFilter;
var selectedPriceFilter = [];

$(document).ready(function(){
	$.ajax({
		url:'data.json',
		success: function(data){
			products = sortProducts(data.items);
			renderProducts(products);
		}
	});
});

function renderProducts(products){
	$("#products").html("");
	products.forEach(function(product){
		var product = '<div class="col-md-4 category-div text-center">'+
		'<div class="item">'+
		'<div class="item-img"><img src="images/' + product.img +'" class="img-responsive margin-auto" /></div>'+
		'<p class="description">'+ product.name +'</p>'+
		'<p class="item-rate">&#8377; '+ product.price +' <span class="old-rate">&#8377; '+ product.oldPrice +'</span></p>'+
		'</div>'+
		'</div>';
		$("#products").append(product);
	});
}

function getFilteredProductsByCategory(data, category){
	updateFilterClass();
	if(category){
		var filteredProducts = data.filter(function(product){
			return product.category === category;
		});
		return filteredProducts;
	}	
	return products;
}

function getFilteredProductsByPrice(data, priceRange){
	updateFilterClass();
	if(priceRange && priceRange.length > 0){
		var minPrice = priceRange[0];
		var maxPrice = priceRange[1];
		var filteredProducts= data.filter(function(product){
			return product.price > minPrice && product.price <= maxPrice;
		});
		return filteredProducts;
	}
	return products;
}

function filterByCategory(category){
	selectedCategoryFilter = category;
	var productsToFilter = getFilteredProductsByPrice(products, selectedPriceFilter);
	var filteredProducts = getFilteredProductsByCategory(productsToFilter, category);
	renderProducts(filteredProducts);
}

function filterByPrice(minPrice, maxPrice){
	selectedPriceFilter = [minPrice, maxPrice];
	var productsToFilter = getFilteredProductsByCategory(products, selectedCategoryFilter);
	var filteredProducts = getFilteredProductsByPrice(productsToFilter, [minPrice, maxPrice]);
	renderProducts(filteredProducts);
}

function clearPriceFilter(){
	selectedPriceFilter = [];
	var filteredProducts = getFilteredProductsByCategory(products, selectedCategoryFilter);
	renderProducts(filteredProducts);
}

function clearCategoryFilter(){
	selectedCategoryFilter = null;
	var filteredProducts = getFilteredProductsByPrice(products, selectedPriceFilter);
	renderProducts(filteredProducts);
}

function sortProducts(products){
	return products.sort(function(a, b){
		return a.price - b.price;
	});
}

function updateFilterClass(){
	$(".category-list li").removeClass("active");
	$(".price-list li").removeClass("active");
	$("#" + selectedCategoryFilter).addClass("active");
	if(selectedPriceFilter.length > 0){
		$("#" + selectedPriceFilter.join('')).addClass("active");
	}
}




