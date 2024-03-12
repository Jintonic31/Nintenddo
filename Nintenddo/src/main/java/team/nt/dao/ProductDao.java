package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import team.nt.Entity.Product;

@Repository
public class ProductDao implements IProductDao{
	
	
	@Autowired
	private EntityManager em;

	@Override
	public List<Product> getMainSoftList(Integer pcseq) {
		
		String sql = "select p from Product p where p.pcseq.pcseq= :pcseq";
		// p. : Product 엔티티의
		// pcseq. : pcseq이고 이 pcseq는
		// pcseq : Pcategory 엔티티의 식별자(pk)이다
		
		TypedQuery<Product> query = em.createQuery(sql, Product.class);
		
		query.setParameter("pcseq", pcseq);
		
		List<Product> result = query.getResultList();
		
		return result;
	}


	

}
