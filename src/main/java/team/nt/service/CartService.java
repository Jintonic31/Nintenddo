package team.nt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Cart;
import team.nt.Entity.Cview;
import team.nt.Entity.Member;
import team.nt.dao.CartRepository;
import team.nt.dao.ICartDao;

@Service
@Transactional
public class CartService {
	
	@Autowired
	ICartDao icdao;
	
	@Autowired
	CartRepository cr;

	public void insertCart(Cart cart) {
		// 1) icdao.insertCart(cart); 를 쓰거나,
		cr.save(cart);	// 2) save()를 쓰거나
	}

	public List<Cview> getcartlist(String email) {
		return icdao.getcartlist(email);
	}

	public void deletecart(int cseq) {
		cr.deleteByCseq(cseq);
	}
	
	public void deleteallcart(String loginUser) {
		cr.deleteByEmail(loginUser);
	}

	public void updateqtyCart(Cart cart) {
		cr.save(cart);		
	}

	




}
