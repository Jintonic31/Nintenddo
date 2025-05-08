package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import team.nt.Entity.Cart;
import team.nt.Entity.Cview;

@Repository
public class CartDao implements ICartDao{
	
	@Autowired
	private EntityManager em;

	@Override
	public List<Cview> getcartlist(String email) {
		
		String sql = "select c from Cview c where c.email= :email";
		List<Cview> result = em.createQuery(sql, Cview.class).setParameter("email", email).getResultList();
		return result;
	}

	@Override
	public Cart getCart(Integer cseq) {
		Cart cart = em.find(Cart.class, cseq);
		// find(Entity 클래스, Entity의 식별자)
		// Cart Entity에서 주어진 식별자(cseq)에 해당하는 값을 가져오는 것
		return cart;
	}

	@Override
	public void deletecart(Cart cart) {
		em.remove(cart);
		// cart : OrderService에서 cv에 저장해둔 clist(장바구니 목록)들
	}

}
