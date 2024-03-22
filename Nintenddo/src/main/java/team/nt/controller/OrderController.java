package team.nt.controller;

import java.util.ArrayList;
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
import team.nt.dto.OrderViewDto;
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
	
	
	@GetMapping("/getOrdering")
	public List<OrderViewDto> getOrdering(HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		Member loginUser = (Member)session.getAttribute("loginUser");
		
		// 최종 리턴될 파이널 주문 list
		ArrayList<OrderViewDto> list = new ArrayList<OrderViewDto>();
		
		// #1 로그인 유저의 현재 진행중인 주문의 oseq를 중복을 제거, result가 1~3인 내역 조회
		List<Integer> oseqList = os.getOseqList(loginUser.getEmail());
		// System.out.println("중복이 제거된 oseq : " + oseqList);
		
		// #2 #1에서 조회한 oseqList를 하나씩 꺼내 oseq에 저장하면서 반복문 내 명령을 반복 실행
		for(int oseq : oseqList) {
			
			// 조회한 주문번호 중 하나로 Oview에서 주문들을 조회
			List<Oview> orderListIng = os.getordernowByOseq(oseq);
			// ㄴ 넘겨주는 oseq로 해당 oseq에 해당하는 Oview의 값들을 가져온다
			// System.out.println("orderListIng : " + orderListIng);
			
			OrderViewDto ovo = new OrderViewDto();
			// ㄴ View는 select용이기 때문에 Oview와 동일한 컬럼명을 가진 Dto를 만들어 값을 insert / update 할 것
			
			ovo.setPname(orderListIng.get(0).getPname() + " 외 " + (orderListIng.size()-1) + "건");
			// ㄴ OrderViewDto의 Pname을 Oview에서 가져온 orderListIng의 첫번째 값에서 꺼낸 pname으로 저장
			
			// #3 Dto에 저장된 것 말고 원래 view에 있던 price1, quantity, oseq, indate를 가져와
			int totalPrice = 0;
			for(Oview o : orderListIng)
				totalPrice += o.getPrice1() * o.getQuantity();
			// #4 dto의 price1에 totalPrice를 저장
			ovo.setPrice1(totalPrice);
			ovo.setImage(orderListIng.get(0).getImage());
			ovo.setOseq(orderListIng.get(0).getOseq());
			ovo.setIndate(orderListIng.get(0).getIndate());
			ovo.setResult(orderListIng.get(0).getResult());
			// System.out.println("ovo 출력 : " + ovo);
			
			// #5 Dto에 저장되어있는 값을 최종 리턴될 list에 하나씩 추가
			list.add(ovo);			
		}
		
		return list;	
		
	}
	
	
	@GetMapping("/getOrderdone")
	public List<OrderViewDto> getOrderdone(HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		Member loginUser = (Member)session.getAttribute("loginUser");
		
		// 최종 리턴될 파이널 주문 list
		ArrayList<OrderViewDto> list = new ArrayList<OrderViewDto>();
		
		// #1 로그인 유저의 현재 진행중인 주문의 oseq를 중복을 제거, result가 1~3인 내역 조회
		List<Integer> oseqList = os.getOseqDoneList(loginUser.getEmail());
		// System.out.println("중복이 제거된 oseq : " + oseqList);
		
		// #2 #1에서 조회한 oseqList를 하나씩 꺼내 oseq에 저장하면서 반복문 내 명령을 반복 실행
		for(int oseq : oseqList) {
			
			// 조회한 주문번호 중 하나로 Oview에서 주문들을 조회
			List<Oview> orderListIng = os.getordernowByOseq(oseq);
			// ㄴ 넘겨주는 oseq로 해당 oseq에 해당하는 Oview의 값들을 가져온다
			// System.out.println("orderListIng : " + orderListIng);
			
			OrderViewDto ovo = new OrderViewDto();
			// ㄴ View는 select용이기 때문에 Oview와 동일한 컬럼명을 가진 Dto를 만들어 값을 insert / update 할 것
			
			ovo.setPname(orderListIng.get(0).getPname() + " 외 " + (orderListIng.size()-1) + "건");
			// ㄴ OrderViewDto의 Pname을 Oview에서 가져온 orderListIng의 첫번째 값에서 꺼낸 pname으로 저장
			
			// #3 Dto에 저장된 것 말고 원래 view에 있던 price1, quantity, oseq, indate를 가져와
			int totalPrice = 0;
			for(Oview o : orderListIng)
				totalPrice += o.getPrice1() * o.getQuantity();
			// #4 dto의 price1에 totalPrice를 저장
			ovo.setPrice1(totalPrice);
			ovo.setImage(orderListIng.get(0).getImage());
			ovo.setOseq(orderListIng.get(0).getOseq());
			ovo.setIndate(orderListIng.get(0).getIndate());
			ovo.setResult(orderListIng.get(0).getResult());
			System.out.println("ovo 출력 : " + ovo);
			
			// #5 Dto에 저장되어있는 값을 최종 리턴될 list에 하나씩 추가
			list.add(ovo);			
		}
		
		return list;	
		
	}
	
	
	
	
	

}
