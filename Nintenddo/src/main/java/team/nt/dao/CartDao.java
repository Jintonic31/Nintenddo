package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
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

}
