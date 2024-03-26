package team.nt.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import team.nt.Entity.Member;
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
	
	
//	@PostMapping("/updatedeliveryinfo")
//	public HashMap<String, Object> updatedeliveryinfo(@RequestBody Member member, HttpServletRequest request){
//		
//		HashMap<String, Object> result = new HashMap<String, Object>();
//		HttpSession session = request.getSession();
//		
//		member.setPwd(((Member)session.getAttribute("loginUser")).getPwd());
//		member.setIndate(((Member)session.getAttribute("loginUser")).getIndate());
//		// Indate가 날라가는데.. 왜일까?
//		member.setProvider(((Member)session.getAttribute("loginUser")).getProvider());
//		member.setUseyn(((Member)session.getAttribute("loginUser")).getUseyn());
//		member.setByear(((Member)session.getAttribute("loginUser")).getByear());
//		member.setBmonth(((Member)session.getAttribute("loginUser")).getBmonth());
//		member.setBday(((Member)session.getAttribute("loginUser")).getBday());
//		member.setGender(((Member)session.getAttribute("loginUser")).getGender());
//		member.setCountry(((Member)session.getAttribute("loginUser")).getCountry());
//		Member mem = ms.updateMember(member);
//		session.setAttribute("loginUser", mem);
//		// System.out.println(mem);
//		
//		return null;
//	}
}
