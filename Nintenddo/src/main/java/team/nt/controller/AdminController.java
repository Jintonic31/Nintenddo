package team.nt.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import team.nt.Entity.Admins;
import team.nt.service.AdminService;

@RestController
@RequestMapping("/api/admins")
public class AdminController {
	
	@Autowired
	AdminService as;
	
	
	@PostMapping("/loginpage")
	public HashMap<String, Object> loginpage( @RequestBody Admins admins,  
			HttpServletRequest request ){
		HashMap<String, Object> result = new HashMap<String, Object>();
		Admins mem = as.getAdmin( admins.getAdminid() );
		if(mem == null ) {
			System.out.println("데이터 : " + mem);
			result.put("msg", "해당 메일이 없습니다");
		}else if( !mem.getPwd().equals( admins.getPwd() ) ) {
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
	

	
	
}
