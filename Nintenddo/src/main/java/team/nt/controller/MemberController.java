package team.nt.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import team.nt.Entity.Member;
import team.nt.dto.KakaoProfile;
import team.nt.dto.KakaoProfile.KakaoAccount;
import team.nt.dto.KakaoProfile.KakaoAccount.Profile;
import team.nt.dto.OAuthToken;
import team.nt.service.MemberService;

@RestController
@RequestMapping("/api/members")
public class MemberController {

	@Autowired
	MemberService ms;
	
	
	@PostMapping("/join")
	public HashMap<String, Object> join( @RequestBody Member member ){
		ms.insertMember( member );
		return null;
	}
	
	@PostMapping("/loginpage")
	public HashMap<String, Object> loginpage( @RequestBody Member member,  
			HttpServletRequest request ){
		HashMap<String, Object> result = new HashMap<String, Object>();
		Member mem = ms.getMember( member.getEmail() );
		if(mem == null ) {
			System.out.println("데이터 : " + mem);
			result.put("msg", "해당 메일이 없습니다");
		}else if( !mem.getPwd().equals( member.getPwd() ) ) {
			System.out.println("데이터 : " + mem);
			result.put("msg", "패스워드가 틀립니다.");
		}else {
			HttpSession session = request.getSession(); 
			session.setAttribute("loginUser", mem);
			// System.out.println("/loginpage의 loginUser : " + mem);
			result.put("msg", "ok");
		}
		return result;
	}
	
	@PostMapping("/getLoginUser")
	public HashMap<String, Object> getLoginUser( HttpServletRequest request  ){
		HttpSession session = request.getSession(); 
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("loginUser", session.getAttribute("loginUser") );
		// System.out.println("/getLoginUser 의 result : " + result);
		
		return result;
	}
	
	@GetMapping("/logout")
	public HashMap<String,Object> logout(HttpServletRequest request){
		HttpSession session = request.getSession();
		session.removeAttribute("loginUser");
		return null;
	}
	
	@PostMapping("/update")
	public HashMap<String,Object> update(@RequestBody Member member,
			HttpServletRequest request){
		Member mem = ms.updateMember(member);
		HttpSession session = request.getSession();
		session.setAttribute("loginUser", mem);
		// System.out.println(mem);
		
		return null;
	}
	
	@PostMapping("/deletemember")
	public HashMap<String,Object> deletemember(@RequestParam("email")String email){
		HashMap<String,Object> result = new HashMap<String, Object>();
		
		ms.deleteMember(email);
		
		return result;
	}
	
	@PostMapping("/idcheck")
	public HashMap<String,Object> idcheck(@RequestParam("email") String email){
		HashMap<String,Object> result = new HashMap<String,Object>();
		Member mem = ms.getMember(email);
		if(mem == null) {
			result.put("res", "1");
		}else {
			result.put("res", "0");
		}
		return result;
	}
	
	@PostMapping("/findUserEmailByPhone")
	public HashMap<String,Object> findUserEmailByPhone(@RequestParam("phone") String phone){
		HashMap<String,Object> result = new HashMap<String,Object>();
		Member mem = ms.findUserEmailByPhone(phone);
		if(mem != null) {
			result.put("email", mem.getEmail());
			result.put("res", "0");
		}else {
			result.put("res", "1");
		}
		return result;
	}
	

	
	@RequestMapping("/kakaostart")
	public @ResponseBody String kakaostart() {
		String a = "<script type='text/javascript'>" 
				+ "location.href='https://kauth.kakao.com/oauth/authorize?"
				+ "client_id=6e91b24177969a60174c9f6cf610b8f6&"
				+ "redirect_uri=http://3.37.250.214:8070/api/members/kakaoLogin&"
//				+ "redirect_uri=http://localhost:8070/api/members/kakaoLogin&"
//				+ "redirect_uri=http://10.0.0.139:8070/api/members/kakaoLogin&"
				+ "response_type=code';" + "</script>";
		return a;
	}
	
	@RequestMapping("/kakaoLogin")
	public void loginKakao(
			HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException, IOException {
		
		  String code = request.getParameter("code");
	      String endpoint = "https://kauth.kakao.com/oauth/token";
	      URL url = new URL(endpoint); // import java.net.URL;
	      String bodyData = "grant_type=authorization_code&";
	      bodyData += "client_id=6e91b24177969a60174c9f6cf610b8f6&";
	      bodyData += "redirect_uri=http://3.37.250.214:8070/api/members/kakaoLogin&";
//	      bodyData += "redirect_uri=http://localhost:8070/api/members/kakaoLogin&";
//	      bodyData += "redirect_uri=http://10.0.0.139:8070/api/members/kakaoLogin&";
	      bodyData += "code=" + code;
	      
	      HttpURLConnection conn = (HttpURLConnection) url.openConnection(); // import java.net.HttpURLConnection;
	      conn.setRequestMethod("POST");
	      conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	      conn.setDoOutput(true);
	      BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream(), "UTF-8"));
	      bw.write(bodyData);
	      bw.flush();
	      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
	      String input = "";
	      StringBuilder sb = new StringBuilder(); // 조각난 String 을 조립하기위한 객체
	      while ((input = br.readLine()) != null) {
	         sb.append(input);
	         System.out.println(input); // 수신된 토큰을 콘솔에 출력합니다
	      }
	      Gson gson = new Gson();
	      OAuthToken oAuthToken = gson.fromJson(sb.toString(), OAuthToken.class);
	      String endpoint2 = "https://kapi.kakao.com/v2/user/me";
	      URL url2 = new URL(endpoint2);
	      
	      HttpsURLConnection conn2 = (HttpsURLConnection) url2.openConnection();
	      conn2.setRequestProperty("Authorization", "Bearer " + oAuthToken.getAccess_token());
	      conn2.setDoOutput(true);
	      BufferedReader br2 = new BufferedReader(new InputStreamReader(conn2.getInputStream(), "UTF-8"));
	      String input2 = "";
	      StringBuilder sb2 = new StringBuilder();
	      while ((input2 = br2.readLine()) != null) {
	         sb2.append(input2);
	         System.out.println(input2);
	      }
	      
	      Gson gson2 = new Gson();
	      KakaoProfile kakaoProfile = gson2.fromJson(sb2.toString(), KakaoProfile.class);
	      KakaoAccount ac = kakaoProfile.getAccount();
	      Profile pf = ac.getProfile();
	      
	      // System.out.println("id : " + kakaoProfile.getId());
	      // System.out.println("email : " + ac.getEmail());
	      // System.out.println("nickname : " + pf.getNickname());
	      
	      
	      Member member = ms.getMember(kakaoProfile.getId());
	      if(member == null) {
	      // 해당 카카오 계정이 member 테이블에 없다면 회원가입 진행
	    	  member = new Member();
	    	  member.setUserid(kakaoProfile.getId());
	    	  member.setEmail(ac.getEmail());
	    	  member.setProvider("kakao");
	    	  ms.insertMember(member);

	      }else {
	    	  
	      }
	      
	      HttpSession session = request.getSession();
	      session.setAttribute("loginUser", member);

	      
	      // response.sendRedirect("http://localhost:3000/kakaosaveinfo");
	      response.sendRedirect("http://3.37.250.214:3000/kakaosaveinfo");
	      // response.sendRedirect("http://10.0.0.139:3000/kakaosaveinfo");
	}
	
	
}
