package team.nt.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
			result.put("msg", "해당 메일이 없습니다");
		}else if( !mem.getPwd().equals( member.getPwd() ) ) {
			result.put("msg", "패스워드가 틀립니다.");
		}else {
			HttpSession session = request.getSession(); 
			session.setAttribute("loginUser", mem);
			result.put("msg", "ok");
		}
		return result;
	}
}
