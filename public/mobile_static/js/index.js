$(function(){

    //大人的加
    var adult_price=$(".prompt_aldut_price").text();
    var child_price=$(".prompt_child_price").text();

    var adult_num=$(".prompt_adult_val").val();
    var child_num=$(".prompt_child_val").val();

//大人的加法
    $(".prompt_adult_plus").on("click",function(event){
        event.stopPropagation();

        adult_num++;
        $(".prompt_adult_val").val(adult_num);
        $(".total").text(adult_num*adult_price+child_num*child_price);
        if(adult_num>=2){
            adult_num=2;
            $(".prompt_adult_val").val(adult_num);
            $(".total").text(adult_num*adult_price+child_num*child_price);
        }

    })

//大人的减法
    $(".prompt_adult_reduce").on("click",function(event){
        event.stopPropagation();
        adult_num--;
        $(".prompt_adult_val").val(adult_num);

        $(".total").text(adult_num*adult_price+child_num*child_price);
        if(adult_num<=1){
            adult_num=1;
            $(".prompt_adult_val").val(adult_num);
            $(".total").text(adult_num*adult_price+child_num*child_price);
        }
    })

//孩子的加法
    $(".prompt_child_plus").on("click",function(event){
        event.stopPropagation();
        child_num++;
        $(".prompt_child_val").val(child_num);

        $(".total").text(adult_num*adult_price+child_num*child_price);
        if(child_num>=2){
            child_num=2;
            $(".prompt_child_val").val(child_num);
            $(".total").text(adult_num*adult_price+child_num*child_price);
        }
    })

//孩子的减法
    $(".prompt_child_reduce").on("click",function(event){
        event.stopPropagation();
        child_num--;
        $(".prompt_child_val").val(child_num);

        $(".total").text(adult_num*adult_price+child_num*child_price);
        if(child_num<=1){
            child_num=1;
            $(".prompt_child_val").val(child_num);
            $(".total").text(adult_num*adult_price+child_num*child_price);
        }
    })


//我要报名操作

    $(".i_want").on("click",function(){
        $(".themeDetail_bottom").attr("style","display: none;");
        $("#theme_modal_box").show();
        $(".moal_div").animate({"bottom":"0px"},200);


    })

//模态框的操作
    $("#theme_modal_box").on("click",function(){
        $("#theme_modal_box").hide();
        $(".moal_div").animate({"bottom":"-100%"},200);

    })

    $(".moal_div").on("click",function(event){
        event.stopPropagation();
    })
 //收藏
$(".collect").on("click",function(){
     var aid = $(this).attr('aid');
     var _this = $(this);
     if($(this).text()=="已收藏"){
         $.post("/home/activity/collection",{ aid:aid,type:2},
            function(obj){
                if(obj.state_code != 200){
                    alert(obj.msg);
                    return false;
                }else{
                    _this.text("收藏");
                }
            }, "json");
       }
     else{
        $.post("/home/activity/collection",{ aid:aid,type:1},
            function(obj){
                if(obj.state_code != 200){
                    alert(obj.msg);
                    return false;
                }else{
                    _this.text("已收藏");
                }
            }, "json");
       }
  })
  
  
    //会员中心(tab栏转换)
    var lis = $(".lis_tab").children();
    var contents = $(".all_activityContent").children();


    lis.on("click", function() {
        var index = $(this).index();
        $(this).addClass("play_baby").siblings("li").removeClass("play_baby");
        contents.eq(index).css("display", "block").siblings().css("display", "none");
        
        var activityParts = contents.eq(index).children().children(".my_activity_part");


        if (activityParts.length > 0) {

            $(".activity_more").show();
            $(".nothing").hide();
        }
        else {
            $(".activity_more").hide();
            $(".nothing").show();
        }

    })
    $(".li_first").trigger("click");



    var leave_activity = $(".leave_activity").val();
    var leave_cause = $(".leave_cause").val();
    $(".leave_activity").on("blur", function() {
        if ($(this).val() == "") {
            $(".activity_warn").show();
        }
        else {
            $(".activity_warn").hide();
        }
    })

    $(".leave_cause").on("blur", function() {
        if ($(this).val() == "") {
            $(".cause_warn").show();
        }
        else {
            $(".cause_warn").hide();
        }
    })

//点击取消收藏
    $(".cancel_collect").on("click", function() {
        var aid = $(this).attr('aid');
        var _this = $(this);
        $.post("/home/activity/collection",{ aid:aid,type:2},
            function(obj){
                if(obj.state_code != 200){
                    alert(obj.msg);
                    return false;
                }else{
                    _this.parent().parent().parent().parent(".activity_part").css("display", "none");
                }
            }, "json");
          
    })
    
    //点击提问按钮
$(".my_quiz").on("click",function(){
	var quiz_content=$(".quiz").val();
	if(quiz_content==""){
		$(".quiz_warn").show();
		return false;
	}
	else{
		$(".modal_box").show();
	}
	
})

$(".quiz").on("blur",function(){
	var quiz_content=$(".quiz").val();
	if(quiz_content==""){
		$(".quiz_warn").show();
		return false;
	}
	else{
		$(".quiz_warn").hide();
	}
})

$(".cancel").on("click",function(){
	$(".modal_box").hide();
})
//生日插件
$(".birthdayContainer").selectDate();
})
