package team.nt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team.nt.Entity.Qna;
import team.nt.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

	@Autowired
	CustomerService qs;
	
	@PostMapping("/qnalist")
	public List<Qna> qnalist(@RequestBody Qna qna ){
		
		List<Qna> list = qs.getqnalist(qna.getEmail());
		return list;
	}
	
	
	
//	@GetMapping("/getqna")
//	public HashMap<String,Object> qseqsv(HttpServletRequest request){
//		HashMap<String,Object> result = new HashMap<String,Object>();
//		HttpSession session = request.getSession();
//		String qseq = (String)session.getAttribute("qseq");
//		result.put("qna",qs.getQna(Integer.parseInt(qseq)));
//		return result;
//	}
	
}