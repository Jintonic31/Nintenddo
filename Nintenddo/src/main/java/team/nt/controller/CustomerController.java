package team.nt.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import team.nt.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

	@Autowired
	CustomerService qs;
	
	@GetMapping("/getqna")
	public HashMap<String,Object> qseqsv(HttpServletRequest request){
		HashMap<String,Object> result = new HashMap<String,Object>();
		HttpSession session = request.getSession();
		String qseq = (String)session.getAttribute("qseq");
		result.put("qna",qs.getQna(Integer.parseInt(qseq)));
		return result;
	}
}
