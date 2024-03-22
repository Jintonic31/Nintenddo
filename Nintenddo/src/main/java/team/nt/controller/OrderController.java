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

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import team.nt.Entity.Member;
import team.nt.Entity.Odetail;
import team.nt.Entity.Oview;
import team.nt.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	@Autowired
	OrderService os;
	
	@PostMapping("/insertorder")
	public HashMap<String, Object> insertorder(HttpServletRequest request, @RequestBody Odetail deliveryinfo){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		Member member = (Member)session.getAttribute("loginUser");
		String oseq = os.insertOrder(member.getEmail(), deliveryinfo );
		
		
		result.put("oseq", oseq);
		
		return result;
	}
	
	
	@GetMapping("/saveoseq/{oseq}")
	public HashMap<String, Object> saveoseq(@PathVariable("oseq") int oseq, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		session.setAttribute("oseq", oseq);
		// System.out.println("saveoseq의 oseq : " + oseq);
		
		result.put("oseq", oseq);
		
		return result;		
	}
	
	
	// /saveoseq에서 세션에 저장한 oseq를 가지고 orderList를 구성한다
	@GetMapping("/getordernow")
	public HashMap<String, Object> getordernow(HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		Integer oseq = (Integer)session.getAttribute("oseq");
		// System.out.println("세션의 oseq : " + oseq);
		
		List<Oview> list = os.getordernowByOseq(oseq);
		
		int totalPrice = 0;
		for(Oview o : list) {
			totalPrice += (o.getPrice1() * o.getQuantity());
		}
		
		result.put("list", list);
		// System.out.println("getordernow의 list : " + list);
		result.put("totalPrice", totalPrice);
		
		return result;		
	}
	
	
//	@GetMapping("/getOrdering")
//	public List<Oview> getOrdering(HttpServletRequest request){
//		HashMap<String, Object> result = new HashMap<String, Object>();
//		
//		HttpSession session = request.getSession();
//		Member loginUser = (Member)session.getAttribute("loginUser");
//		
//		
//	}
	

}
