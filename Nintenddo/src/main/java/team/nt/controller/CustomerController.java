package team.nt.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team.nt.Entity.Qna;
import team.nt.dto.Paging;
import team.nt.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

	@Autowired
	CustomerService qs;
	
	@PostMapping("/qnalist/{page}")
	public HashMap<String, Object> getQnalist( @RequestBody Qna qna, @PathVariable("page") int page){
		HashMap<String, Object> result = new HashMap<String, Object>();
		Paging paging = new Paging();
		paging.setPage( page );
		paging.cal();
		
		List<Qna> list = qs.getqnalist( qna.getEmail(), paging );
		result.put("qnalist", list);
		result.put("paging", paging);
		
		return result;
	}
	

	

	
}