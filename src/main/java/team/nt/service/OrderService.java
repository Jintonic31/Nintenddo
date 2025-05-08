package team.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Cart;
import team.nt.Entity.Cview;
import team.nt.Entity.Member;
import team.nt.Entity.Odetail;
import team.nt.Entity.Orders;
import team.nt.Entity.Oview;
import team.nt.dao.ICartDao;
import team.nt.dao.IMemberDao;
import team.nt.dao.IOrderDao;

@Service
@Transactional
public class OrderService {
	
	@Autowired
	IOrderDao iodao;
	
	@Autowired
	ICartDao icdao;
	
	@Autowired
	IMemberDao imdao;
	

	public String insertOrder(String email, Odetail deliveryinfo) {
		
		// #1 orders 테이블에 새로운 레코드 추가 (email만 추가 = oseq,indate는 default값이 자동입력)
		Orders orders = new Orders();
		orders.setEmail(email);
		
		iodao.insertorder(orders);
		
		// #2 방금 #1에서 추가한 oseq 조회
		int oseq = iodao.lookupMaxoseq();
		//	ㄴ lookupMaxoseq() : orders테이블에서 가장 큰 oseq를 찾는다(oseq가 큰게 최근에 추가된 것이므로)
		
		// #3 전달받은 email로 해당 email의 장바구니 목록 조회
		List<Cview> clist = icdao.getcartlist(email);
		
		// #4 조회한 장바구니 목록(clist)과 방금 추가한 주문건(oseq)을 하나씩 odetail 테이블에 반복하며 레코드 추가
		for(Cview cv : clist) {
			Odetail odetail = new Odetail();
			odetail.setOseq(oseq);
			odetail.setPseq(cv.getPseq());
			// ㄴ clist에는 pseq, quantity 등이 다 있고, 그걸 cv에 하나씩 꺼내 저장하기 때문에 cv.getPseq()가 가능
			odetail.setQuantity(cv.getQuantity());
			odetail.setResult("1");
			odetail.setOname(deliveryinfo.getOname());
			odetail.setOphone(deliveryinfo.getOphone());
			odetail.setOznum(deliveryinfo.getOznum());
			odetail.setOadd1(deliveryinfo.getOadd1());
			odetail.setOadd2(deliveryinfo.getOadd2());
			
			iodao.insertodetail(odetail);
			
			// #5 Cart 목록에서 주문완료 된 항목들을 지운다
			Cart cart = icdao.getCart(cv.getCseq());
			//	ㄴ cv(= clist)에 있는 cseq를 가져와 cart 객체에 저장
			icdao.deletecart(cart);
			//	ㄴ cv의 cseq들을 삭제
			
		}		
		return String.valueOf(oseq);
		// String.valueOf() : String으로 값을 반환하는 메서드
		// oseq : 새로 추가된 oseq에 대한 정보
	}


	public List<Oview> getordernowByOseq(int oseq) {
		return iodao.getordernowByOseq(oseq);
	}


	public List<Integer> getOseqList(String email) {
		return iodao.getOseqList(email);
	}


	public List<Integer> getOseqDoneList(String email) {
		return iodao.getOseqDoneList(email);
	}








}
