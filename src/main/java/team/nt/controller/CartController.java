package team.nt.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	
	@GetMapping("/getcartlist")
	public HashMap<String, Object> getcartlist(HttpServletRequest request){
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		Member loginUser = (Member)session.getAttribute("loginUser");
		// System.out.println("/getcartlist의 loginUser" + loginUser);
		
		List<Cview> list = cs.getcartlist(loginUser.getEmail());
		result.put("cartList", list);
		
		
		int totalPrice = 0;
		for(Cview c : list) {
			totalPrice += ( c.getPrice1() * c.getQuantity() );
		}
		result.put("totalPrice", totalPrice);
		
		// System.out.println(list);
		// System.out.println(totalPrice);
		
		
		return result;
	}
	
	
	@DeleteMapping("/deletecart/{cseq}")
	public HashMap<String, Object> deletecart(@PathVariable("cseq") int cseq){
		cs.deletecart(cseq);
		return null;
	}
	
	@DeleteMapping("/deleteallcart")
	public HashMap<String, Object> deleteallcart(HttpServletRequest request){
		HttpSession session = request.getSession();
		Member loginUser = (Member)session.getAttribute("loginUser");
		cs.deleteallcart((String)loginUser.getEmail());
		return null;
	}
	
	
	@PostMapping("/updateqty")
	public HashMap<String, Object> updateqty(@RequestBody Cart cart){
		HashMap<String, Object> result = new HashMap<String, Object>();
		cs.updateqtyCart(cart);
		result.put("qty", cart.getQuantity());
		return result;
	}

}
