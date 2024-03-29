package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import team.nt.Entity.Pcategory;
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


	@Override
	public Product updateProduct(Product product) {
		String sql = "update Product p Set p.pname= :pname, p.content= :content, "
				+ "p.includes= :includes, p.price1= :price1, p.price2= :price2, p.price3= :price3, "
				+ "p.useyn= :useyn, p.bestyn= :bestyn, p.image= :image where p.pseq= :pseq";
		
		Query query = em.createQuery(sql); // Query 객체 사용
		
		query.setParameter("pname", product.getPname());
		query.setParameter("content", product.getContent());
		query.setParameter("includes", product.getIncludes());
		query.setParameter("price1", product.getPrice1());
		query.setParameter("price2", product.getPrice2());
		query.setParameter("price3", product.getPrice3());
		query.setParameter("useyn", product.getUseyn());
		query.setParameter("bestyn", product.getBestyn());
		query.setParameter("image", product.getImage());
		query.setParameter("pseq", product.getPseq());
		
		// 업데이트 쿼리 실행
		query.executeUpdate();
		
		// 업데이트된 product 객체 return
		return product;
	}


	@Override
	public List<Pcategory> getPcategory() {
		String sql = "select pc from Pcategory pc";
		return em.createQuery(sql, Pcategory.class).getResultList();
	}
	
	
	
	
	
	

}
