$(document).ready(function(){

// signup 다음단계 클릭 이벤트
$("button.signup").click(function(){
	var chk_list = $('input[name="mb"]:checked').val();
	if(chk_list == null){
		alert("회원종류를 선택해 주세요.");
	}else if(chk_list != null){
		var mb2_select = $("#mb2_select option:selected").val();
		var mb3_select = $("#mb3_select option:selected").val();
		if(chk_list == "개업공인중개사"){
			//alert("회원종류 : " + chk_list);
			chk_list = "b1";
			location.href = "./signup_b1.php?chk_list="+chk_list;
		}else if(chk_list == "사업자"){
			//alert("\n회원종류 : " + chk_list + "\n사업자 : " + mb2_select);
			chk_list = "b2";
			var chk_mb2 = $("select[name=mb2]").val();
			location.href = "./signup_b2.php?chk_list="+chk_list+"&chk_mb2="+chk_mb2;
		}else if(chk_list == "부동산회사"){
			//alert("\n회원종류 : " + chk_list + "\n부동산회사 : " + mb3_select);
			chk_list = "c0";
			var chk_mb3 = $("select[name=mb3]").val();
			location.href = "./signup_c0.php?chk_list="+chk_list+"&chk_mb3="+chk_mb3;
		}else if(chk_list == "개인회원"){
			//alert("회원종류 : " + chk_list);
			chk_list = "c1";
			location.href = "./signup_c1.php?chk_list="+chk_list;
		}
	}
});

// signup_b1 개업공인중개사 다음단계 클릭 이벤트
$("button.signup_b1").click(function(){
	var chk_list = $("#chk_list").val();
	var chk_a_len = $("input:checkbox[name=aa]:checked").length;
	var chk_b_len = $("input:checkbox[name=bb]:checked").length;
	var chk_c_len = $("input:checkbox[name=cc]:checked").length;
	
	var chk_a = $("input[name=aa]:checked").map(function(){
					return this.value;
				}).get().join(",");
	
	var chk_b = $("input[name=bb]:checked").map(function(){
					return this.value;
				}).get().join(",");
	
	var chk_c = $("input[name=cc]:checked").map(function(){
					return this.value;
				}).get().join(",");
	
	if(chk_a_len == 0){
		alert("물건 분야에서 1개 이상 선택해 주세요.");
	}else if(chk_b_len == 0){
		alert("거래 분야에서 1개 이상 선택해 주세요.");
	}else if(chk_c_len == 0){
		alert("서비스 분야에서 1개 이상 선택해 주세요.");
	}else if(chk_a_len > 0 && chk_b_len > 0 && chk_c_len > 0){
		location.href = "./signup_c0.php?chk_list="+chk_list+"&chk_a="+chk_a+"&chk_b="+chk_b+"&chk_c="+chk_c;
	}
});

// signup_b2 사업자 다음단계 클릭 이벤트
$("button.signup_b2").click(function(){
	var chk_list = $("#chk_list").val();
	var chk_a_len = $("input:checkbox[name=aa]:checked").length;
	var chk_a = $("input[name=aa]:checked").map(function(){
					return this.value;
				}).get().join(",");
	var chk_etc_b2 = $("#chk_etc_b2").val();
	
	if(chk_a_len == 0){
		alert("단체를 선택해 주세요.");
	}else if(chk_a_len > 0 || chk_etc_b2 != ""){
		if(chk_etc_b2 == ""){
			chk_a = chk_a;
			location.href = "./signup_c0.php?chk_list="+chk_list+"&chk_a="+chk_a;
		}else{
			chk_a = chk_a + "," + chk_etc_b2;
			chk_a = chk_a.replace(/,,,,/g,",");
			chk_a = chk_a.replace(/,,,/g,",");
			chk_a = chk_a.replace(/,,/g,",");
			location.href = "./signup_c0.php?chk_list="+chk_list+"&chk_a="+chk_a;
		}
	}
});

// 전체약관동의
$("#agree_all").click(function(){
	if($("#agree_all").prop("checked")){
		$("input[name=agree]").prop("checked",true);
	}else{
		$("input[name=agree]").prop("checked",false);
	}
})



// signup_c0 회원가입 완료 클릭 이벤트
$("button.signup_c0").click(function(){
	var chk_list = $("#chk_list").val();
	var chk_a = $("#chk_a").val();
	var chk_b = $("#chk_b").val();
	var chk_c = $("#chk_c").val();
	
	var email = $("#email").val();
	var pw = $("#pw").val();
	var pw_confirm = $("#pw_confirm").val();
	var company = $("#company").val();
	var company_no = $("#company_no").val();
	var ceo = $("#ceo").val();
	var phone = $("#phone").val();
	
	var ag1 = $("#ag1").prop("checked");
	var ag2 = $("#ag2").prop("checked");
	var ag3 = $("#ag3").prop("checked");
	
	var thumbnail = "";
	
	
	
	if(email == ""){
		alert("이메일을 입력해 주세요.");
	}else if(pw == ""){
		alert("비밀번호를 입력해 주세요.");
	}else if(pw_confirm == ""){
		alert("비밀번호를 입력해 주세요.");
	}else if(company == ""){
		alert("사업자명을 입력해 주세요.");
	}else if(company_no == ""){
		alert("사업자번호를 입력해 주세요.");
	}else if(ceo == ""){
		alert("대표자명을 입력해 주세요.");
	}else if(phone == ""){
		alert("휴대폰번호를 입력해 주세요.");
	}else if(pw != pw_confirm){
		alert("비밀번호가 다릅니다.");
	}else{
		
		if(email != ""){
		$.ajax({
			type: "POST", // POST형식으로 폼 전송
			url: "./signup/email_chk.php", // 목적지
			timeout: 0,
			data: {
				email: email
			},
			cache: false,
			dataType: "text",
			error: function(xhr, textStatus, errorThrown) { // 전송 실패
				if(textStatus==="timeout"){
					alert("통신 시간이 초과 되었습니다.");
				} else {
					alert("오류가 발생했습니다." + "\nxhr : "+xhr + "\ntextStatus : "+textStatus + "\nerrorThrown : "+errorThrown );
				}
			},
			beforeSend: function(){
				//$("html").css("cursor","wait");
			},
			success: function(data) {
				if(data == "중복"){
					alert("중복되는 이메일 입니다.");
				}else if(data == "사용가능"){
					if(fnCheckPassword(pw)==true){
						if(ag1 == true && ag2 == true && ag3 == true){
							$.ajax({
								type: "POST", // POST형식으로 폼 전송
								url: "./signup/signup.php", // 목적지
								timeout: 0,
								data: {
									chk_list: chk_list,
									chk_a: chk_a,
									chk_b: chk_b,
									chk_c: chk_c,
									email: email,
									pw: pw,
									company: company,
									company_no: company_no,
									ceo: ceo,
									phone: phone,
									thumbnail: thumbnail
								},
								cache: false,
								dataType: "text",
								error: function(xhr, textStatus, errorThrown) { // 전송 실패
									if(textStatus==="timeout"){
										alert("통신 시간이 초과 되었습니다.");
									} else {
										alert("오류가 발생했습니다." + "\nxhr : "+xhr + "\ntextStatus : "+textStatus + "\nerrorThrown : "+errorThrown );
									}
								},
								beforeSend: function(){
									//$("html").css("cursor","wait");
								},
								success: function(data) {
									//alert("success : "+data);
								},
								complete: function(data) {
									//$("html").css("cursor","auto");
									toggleLayer($('#pop_layer'), 'on');
								}
							});
						}else{
							alert("약관에 동의해 주세요.");
						}
					}
				}
			},
			complete: function() {
				//$("html").css("cursor","auto");
			}
		});
	}
		
		
	}
	//alert(chk_list+"|"+chk_a+"|"+chk_b+"|"+chk_c);
	//alert("\nemail: "+email + "\n pw: "+pw + "\npw_confirm: "+pw_confirm + "\ncompany : "+company + "\ncompany_no : "+company_no + "\nceo : "+ceo + "\nphone : "+phone);
});

// signup_c1 회원가입 완료 클릭 이벤트
$("button.signup_c1").click(function(){
	var chk_list = $("#chk_list").val();
	
	var email = $("#email").val();
	var pw = $("#pw").val();
	var pw_confirm = $("#pw_confirm").val();
	var ceo = $("#ceo").val();
	var phone = $("#phone").val();
	
	var ag1 = $("#ag1").prop("checked");
	var ag2 = $("#ag2").prop("checked");
	var ag3 = $("#ag3").prop("checked");
	
	var thumbnail = "";
	
	if(email == ""){
		alert("이메일을 입력해 주세요.");
	}else if(pw == ""){
		alert("비밀번호를 입력해 주세요.");
	}else if(pw_confirm == ""){
		alert("비밀번호를 입력해 주세요.");
	}else if(ceo == ""){
		alert("이름을 입력해 주세요.");
	}else if(phone == ""){
		alert("휴대폰번호를 입력해 주세요.");
	}else if(pw != pw_confirm){
		alert("비밀번호가 다릅니다.");
	}else{
		
		if(email != ""){
		$.ajax({
			type: "POST", // POST형식으로 폼 전송
			url: "./signup/email_chk.php", // 목적지
			timeout: 0,
			data: {
				email: email
			},
			cache: false,
			dataType: "text",
			error: function(xhr, textStatus, errorThrown) { // 전송 실패
				if(textStatus==="timeout"){
					alert("통신 시간이 초과 되었습니다.");
				} else {
					alert("오류가 발생했습니다." + "\nxhr : "+xhr + "\ntextStatus : "+textStatus + "\nerrorThrown : "+errorThrown );
				}
			},
			beforeSend: function(){
				//$("html").css("cursor","wait");
			},
			success: function(data) {
				if(data == "중복"){
					alert("중복되는 이메일 입니다.");
				}else if(data == "사용가능"){
					if(fnCheckPassword(pw)==true){
						if(ag1 == true && ag2 == true && ag3 == true){
							$.ajax({
								type: "POST", // POST형식으로 폼 전송
								url: "./signup/signup.php", // 목적지
								timeout: 0,
								data: {
									chk_list: chk_list,
									email: email,
									pw: pw,
									ceo: ceo,
									phone: phone,
									thumbnail: thumbnail
								},
								cache: false,
								dataType: "text",
								error: function(xhr, textStatus, errorThrown) { // 전송 실패
									if(textStatus==="timeout"){
										alert("통신 시간이 초과 되었습니다.");
									} else {
										alert("오류가 발생했습니다." + "\nxhr : "+xhr + "\ntextStatus : "+textStatus + "\nerrorThrown : "+errorThrown );
									}
								},
								beforeSend: function(){
									//$("html").css("cursor","wait");
								},
								success: function(data) {
									//alert("success : "+data);
								},
								complete: function(data) {
									//$("html").css("cursor","auto");
									toggleLayer($('#pop_layer'), 'on');
								}
							});
						}else{
							alert("약관에 동의해 주세요.");
						}
					}
				}
			},
			complete: function() {
				//$("html").css("cursor","auto");
			}
		});
	}
		
		
	}
});

// 비밀번호 체크
function fnCheckPassword(upw){
    if(!/^[a-zA-Z0-9]{6,20}$/.test(upw))
    {
        alert('비밀번호는 숫자와 영문자 조합으로 6~12자리를 사용해야 합니다.'); 
        return false;
    }
    var chk_num = upw.search(/[0-9]/g); 
    var chk_eng = upw.search(/[a-z]/ig);
    if(chk_num < 0 || chk_eng < 0)
    {
        alert('비밀번호는 숫자와 영문자를 혼용하여야 합니다.'); 
        return false;
    }
    if(/(\w)\1\1\1/.test(upw))
    {
        alert('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.'); 
        return false;
    }
    return true;
}

// signup_cpr 버튼 클릭 이벤트 (협력 중개업소 등록)
$("button.signup_cpr").click(function(){
	
	var company = $("#company").val();
	var ceo = $("#ceo").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var pw = $("#pw").val();
	var pw_confirm = $("#pw_confirm").val();
	
	var ag1 = $("#ag1").prop("checked");
	var ag2 = $("#ag2").prop("checked");
	var ag3 = $("#ag3").prop("checked");
	
	var thumbnail = "";
	
	if(company == ""){
		alert("중개업소를 입력해 주세요.");
	}else if(ceo == ""){
		alert("대표 공인중개사를 입력해 주세요.");
	}else if(phone == ""){
		alert("휴대폰번호를 입력해 주세요.");
	}else if(email == ""){
		alert("이메일을 입력해 주세요.");
	}else if(pw == ""){
		alert("비밀번호를 입력해 주세요.");
	}else if(pw != pw_confirm){
		alert("비밀번호가 다릅니다.");
	}else{
		
		if(email != ""){
		$.ajax({
			type: "POST", // POST형식으로 폼 전송
			url: "./signup/email_chk.php", // 목적지
			timeout: 0,
			data: {
				email: email
			},
			cache: false,
			dataType: "text",
			error: function(xhr, textStatus, errorThrown) { // 전송 실패
				if(textStatus==="timeout"){
					alert("통신 시간이 초과 되었습니다.");
				} else {
					alert("오류가 발생했습니다." + "\nxhr : "+xhr + "\ntextStatus : "+textStatus + "\nerrorThrown : "+errorThrown );
				}
			},
			beforeSend: function(){
				//$("html").css("cursor","wait");
			},
			success: function(data) {
				if(data == "중복"){
					alert("중복되는 이메일 입니다.");
				}else if(data == "사용가능"){
					if(fnCheckPassword(pw)==true){
						if(ag1 == true && ag2 == true && ag3 == true){
							$.ajax({
								type: "POST", // POST형식으로 폼 전송
								url: "./signup/signup_cpr.php", // 목적지
								timeout: 0,
								data: {
									company: company,
									ceo: ceo,
									phone: phone,
									email: email,
									pw: pw,
									thumbnail: thumbnail
								},
								cache: false,
								dataType: "text",
								error: function(xhr, textStatus, errorThrown) { // 전송 실패
									if(textStatus==="timeout"){
										alert("통신 시간이 초과 되었습니다.");
									} else {
										alert("오류가 발생했습니다." + "\nxhr : "+xhr + "\ntextStatus : "+textStatus + "\nerrorThrown : "+errorThrown );
									}
								},
								beforeSend: function(){
									//$("html").css("cursor","wait");
								},
								success: function(data) {
									//alert("success : "+data);
								},
								complete: function(data) {
									//$("html").css("cursor","auto");
									toggleLayer($('#pop_midan'), 'off');
									
									var pw_first = pw.substring(0,2);
									var pw_last = pw.substring(2,pw.length);
									var pw_last_len = pw_last.length;
									var star = "";
									
									for (var m=0; m<pw_last_len; m++) {
										star += "*";
									}

									pw = pw_first+star;
									
									$("#email_cpr").text("이메일 : "+email);
									$("#pw_cpr").text("비밀번호 : "+pw);
									
									toggleLayer($('#pop_midan2'), 'on');
								}
							});
						}else{
							alert("약관에 동의해 주세요.");
						}
					}
				}
			},
			complete: function() {
				//$("html").css("cursor","auto");
			}
		});
	}
		
		
	}
	
});











});