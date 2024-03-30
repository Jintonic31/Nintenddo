package team.nt.dao;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import team.nt.Entity.Playmode;
import team.nt.Entity.Product;

@Repository
public class ProductDao implements IProductDao{
	
	
	@Autowired
	private EntityManager em;

	@Override
	public List<Product> getMainSoftList(Integer pcseq) {
		
		String sql = "select p from Product p where p.pcseq= :pcseq AND p.useyn= :useyn order by indate desc";
		// p. : Product 엔티티의
		// pcseq. : pcseq이고 이 pcseq는
		// pcseq : Pcategory 엔티티의 식별자(pk)이다
		
		TypedQuery<Product> query = em.createQuery(sql, Product.class);
		
		query.setParameter("pcseq", pcseq);
		query.setParameter("useyn", "Y");
		
		List<Product> result = query.getResultList();
		
		return result;
	}

	@Override
	public List<Product> getHardList() {
		String sql = "select p from Product p where p.pcseq= :pcseq AND p.useyn= :useyn";
		TypedQuery<Product> query = em.createQuery(sql, Product.class);
		query.setParameter("pcseq", "1");
		query.setParameter("useyn", "Y");
		List<Product> result = query.getResultList();
		return result;
	}

	@Override
	public List<Playmode> getModeList() {
		String sql = "select pl from Playmode pl";
		TypedQuery<Playmode> query = em.createQuery(sql, Playmode.class);
		List<Playmode> result = query.getResultList();
		return result;
	}

	@Override
	public List<Product> getControlList() {
		String sql = "select p from Product p where p.pcseq= :pcseq AND p.useyn= :useyn";
		TypedQuery<Product> query = em.createQuery(sql, Product.class);
		query.setParameter("pcseq", "5");
		query.setParameter("useyn", "Y");
		List<Product> result = query.getResultList();
		return result;
	}

	@Override
	public Product getOneProduct(String pseq) {
		Product product = em.find(Product.class, pseq);
		// ㄴ 기본키만 가지고 product 검색시 (추가적인 파라미터가 필요없고)
		return product;
	}

	@Override
	public List<Product> getJoyList() {
		String sql = "select p from Product p where p.pcseq= :pcseq AND p.useyn= :useyn";
		TypedQuery<Product> query = em.createQuery(sql, Product.class);
		query.setParameter("pcseq", "6");
		query.setParameter("useyn", "Y");
		return query.getResultList();
	}

	@Override
	public List<Product> getChargeList() {
		String sql = "select p from Product p where p.pcseq= :pcseq AND p.useyn= :useyn";
		TypedQuery<Product> query = em.createQuery(sql, Product.class);
		query.setParameter("pcseq", "7");
		query.setParameter("useyn", "Y");
		return query.getResultList();
	}

	@Override
	public List<Product> getUnreleaseList(Integer pcseq) {
		String sql = "select p from Product p where p.pcseq= :pcseq AND p.useyn= :useyn";
		
		TypedQuery<Product> query = em.createQuery(sql, Product.class);
		
		query.setParameter("pcseq", pcseq);
		query.setParameter("useyn", "N");
		
		List<Product> result = query.getResultList();
		
		return result;
	}

	






	

}
