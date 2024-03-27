package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import team.nt.Entity.Product;
import team.nt.dto.Paging;

@Repository
public class AdminDao implements IAdminDao{

	@Autowired
	private EntityManager em;

	@Override
	public List<Product> getProductList(Paging paging) {
		String sql = "select p from Product p order by pseq desc";
		List<Product> list = em.createQuery(sql, Product.class)
				.setFirstResult(paging.getStartNum()-1)
				.setMaxResults(paging.getDisplayRow())
				.getResultList();
		return list;
	}

	
	@Override
	public Product getOneProduct(String pseq) {
		Product product = em.find(Product.class, pseq);
		return product;
	}
	
	
	
	
	
	

}
