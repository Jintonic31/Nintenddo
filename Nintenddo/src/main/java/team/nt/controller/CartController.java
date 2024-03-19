package team.nt.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import team.nt.Entity.Cart;
import team.nt.Entity.Cview;
import team.nt.Entity.Member;
import team.nt.service.CartService;

@RestController
@RequestMapping("/api/carts")
public class CartController {
	
	@Autowired
	CartService cs;
	
	
	@PostMapping("/insertcart")
	public HashMap<String, Object> insertCart(@RequestBody Cart cart){
		HashMap<String, Object> result = new HashMap<String, Object>();
		cs.insertCart(cart);
		return null;
	}
	
	
//	@GetMapping("/getcartlist")
//	public HashMap<String, Object> getcartlist(HttpServletRequest request, @RequestBody Cart cart){
//		
//		HashMap<String, Object> result = new HashMap<String, Object>();
//		
//		HttpSession session = request.getSession();
//		Member loginUser = (Member)session.getAttribute("loginUser");
//		
//		List<Cview> list = cs.getcartlist(loginUser.getEmail());
//		result.put("cartList", list);
//		
//		
//		int totalPrice = 0;
//		for(Cview c : list) {
//			totalPrice += ( c.getPrice1() * c.getQuantity() );
//		}
//		result.put("totalPrice", totalPrice);
//		
//		System.out.println(list);
//		System.out.println(totalPrice);
//		
//		
//		return result;
//	}

}
