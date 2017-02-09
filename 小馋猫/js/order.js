$(function(){
	getTotal();
	var storage = [];
	var li = "";	
	if(localStorage.data){
		storage = JSON.parse(localStorage.data);
		for(var i=0;i<storage.length;i++){
			if(storage[i].num==0){
				i++;
			}
			li += '<li><h4>'+ storage[i].name+'</h4><p>￥'+ storage[i].price+'<span> / '+storage[i].unit+'</span></p><div><button class="sub" data-id="'+storage[i].id+'">-</button><input type="text" value="'+storage[i].num+'"/><button class="add" data-id="'+storage[i].id+'">+</button></div></li>';
		}
		$(".orderList").append(li);
		add(storage);
	}	
	function add(caiData){
//		加加
		$("#orderList").on("click","li .add",function(){
			//把菜品数据插入到storage中去
			var content = $(this).siblings("input");
			function pushDanner(){
				for(var i=0;i<caiData.length;i++){
					if(caiData[i].id == dannerId){
						++caiData[i].num;					
						storage.push(caiData[i]);
						localStorage.data = JSON.stringify(storage);
					}
				}
			}	
			var dannerId = $(this).data("id");			
			if(localStorage.data){
				var temp = false;
				storage = JSON.parse(localStorage.data);
				for(var i=0;i<storage.length;i++){
//					$(content).val(storage[i].num);
						if(storage[i].id==dannerId){
							temp = true;							
							storage[i].num++;
							$(content).val(storage[i].num);
							localStorage.data = JSON.stringify(storage);
						}
					}
				
				if(!temp){
					/*如果数据不在storage中，存入数据*/
					pushDanner();
				}
			}
			else{
				pushDanner();
			}
			getTotal();
		})
		
//		减减
		$("#orderList").on("click","li .sub",function(){
			//把菜品数据插入到storage中去
			var content = $(this).siblings("input");
			for(var i=0;i<caiData.length;i++){
				if(caiData[i].id == dannerId){					
					if(caiData[i].num==0){
//						console.log($(content).parent().parent());
//						$(content).parent().parent().remove();
						alert("数量不能再减少了");
						caiData[i].num=0;
					}
					else{
						caiData[i].num--;
					}
					storage.push(caiData[i]);
					localStorage.data = JSON.stringify(storage);
				}
			}	
			var dannerId = $(this).data("id");			
			storage = JSON.parse(localStorage.data);
			for(var i=0;i<storage.length;i++){
//				$(content).val(storage[i].num);
				if(storage[i].id==dannerId){
					temp = true;
					if(storage[i].num==1){
//						console.log($(content).parent().parent());
						var nums = getTotal();
						if(nums==1){
							$(".orderList").remove();
							localStorage.clear();
						}
						else{
							$(content).parent().parent().remove();
							storage.splice(i,1);
							localStorage.data = JSON.stringify(storage);
						}
												
					}
					else{
						storage[i].num--;
						$(content).val(storage[i].num);
						localStorage.data = JSON.stringify(storage);
					}
					
					
				}
			}				
			getTotal();
		})
	}
	
//	传送厨房
	$(".fr").on("click",function(){
		if(getTotal()>=1){
			$(".bg").show();
		}
	})
	$(".back").on("click",function(){
		window.location.href = "index.html";
	})
	$(".cancel").on("click",function(){
		$(".bg").hide();
	})
	$(".sure").on("click",function(){
		localStorage.clear();
		window.location.href="made.html";
	})
	function getTotal(){				
		if(localStorage.data){	
			var total = 0;
			storage = JSON.parse(localStorage.data);
			for(var i=0;i<storage.length;i++){
				total += storage[i].num;
			}
			$("#fl").html(total);
//					console.log(total);
			}else{
				$("#fl").html("0");
		}
			return total;
	}
})