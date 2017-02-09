$(function(){
	var storage = [];
	var inputs;
	var caiItems = [];
	$.ajax({
		type:"get",
		url:"js/groups.json",
		success:function(data){
			$.each(data,function(k,val){
				var h2 = "<h2 id='i"+val.id+"'>"+val.name+"</h2>";
				$("#menuList").append(h2);
				var cai = val.items;
				
				var oLi = "";
				for(var i=0;i<cai.length;i++){
					caiItems.push(cai[i]);
					oLi += '<li><img src='+ cai[i].pic +'><h4>'+ cai[i].name+'</h4><p>￥'+ cai[i].price+'<span> / '+cai[i].unit+'</span></p><div><button class="sub" data-id="'+cai[i].id+'">-</button><input type="text" value="'+cai[i].num+'"/><button class="add" data-id="'+cai[i].id+'">+</button></div></li>';
//					console.log(cai[i].id);
				}
				$('#menuList').append(oLi);
				
//				
				
			})
			inputs = $("#menuList li input");
//			console.log(inputs.length);
			add(caiItems);
			getTotal();
		}
	});
	function add(caiData){
//		加加
		$("#menuList").on("click","li .add",function(){
			//把菜品数据插入到storage中去
			$(this).siblings("button").show();
			$(this).siblings("input").show();
			var content = $(this).siblings("input");
//			var caiName = $(this).parent().parent().prev("h2").html();
//			console.log(caiName);
			function pushDanner(){
				for(var i=0;i<caiData.length;i++){
//					console.log(caiData[i].id);
					if(caiData[i].id == dannerId){
//						console.log(caiData[i]);
						++caiData[i].num;					
						storage.push(caiData[i]);
						
						$(content).val(caiData[i].num);
						localStorage.data = JSON.stringify(storage);
//						console.log(storage);
					}
				}
			}	
			var dannerId = $(this).data("id");			
			if(localStorage.data){
				var temp = false;
				storage = JSON.parse(localStorage.data);
				for(var i=0;i<storage.length;i++){
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
		$("#menuList").on("click","li .sub",function(){
			//把菜品数据插入到storage中去
			var content = $(this).siblings("input");
			for(var i=0;i<caiData.length;i++){
				if(caiData[i].id == dannerId){					
					if(caiData[i].num==0){
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
					if(storage[i].num==0){						
						storage[i].num=0;
					}
					else{					
						storage[i].num--;
					}
					if(storage[i].num<1){
						$(this).siblings("input").hide();
						$(this).hide();
					}else{
						$(this).siblings("input").show();
						$(this).show();
					}
					
					$(content).val(storage[i].num);
					localStorage.data = JSON.stringify(storage);
				}
			}				
			getTotal();
		})
	}
//	点击跳转到订单页面
	$(".fr").click(function(){
		var nums = getTotal();
		if(nums>=1){			
			window.location.href="order.html";
		}
	})
//	菜单列表点击跳到指定位置
	var aLength = $(".menu a");
	for(var i=0;i<aLength.length;i++){
		$(aLength[i]).on("click",function(){
			$(".menu a").removeClass("on").siblings("p").removeClass("on1");
			$(aLength[i]).addClass("on").siblings("p").addClass("on1");
			$(".angle").css("top",(70+i*150)+"px");
		});
	}
	
//	滑动跳动指定位置
	$(".food").scroll(function(){
		var scrollTop = $(".food").scrollTop();
		var tmp = parseInt(scrollTop/1500);
		$(".menu a").removeClass("on").siblings("p").removeClass("on1");
		$(".angle").css("top",(70+tmp*150)+"px");
		$(".menu a").eq(tmp).addClass("on").siblings("p").addClass("on1");
	})
//计算总数			
	function getTotal(){				
		if(localStorage.data){	
			var total = 0;
			storage = JSON.parse(localStorage.data);
//			console.log(storage);
			for(var i=0;i<storage.length;i++){
				total += storage[i].num;
				var id = storage[i].id;
//				console.log(storage[i].num);
				inputs.eq(id-1).val(storage[i].num);
				if(storage[i].num<1){
					inputs.eq(id-1).siblings(".sub").hide();
					inputs.eq(id-1).hide();
				}else{
					inputs.eq(id-1).siblings(".sub").show();
					inputs.eq(id-1).show();
				}
			}
			$("#fl").html(total);
			if(total==0){
				$(".fr").css("background","#6b615e");
				$(".fr").css("color","#999");						
			}
			else{
				$(".fr").css("background","#F34336");
				$(".fr").css("color","#fff");
			}
			}else{
				$("#fl").html("0");
			}
			return total;
		}
			
})
	