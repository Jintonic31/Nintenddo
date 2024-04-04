package team.nt.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import team.nt.Entity.Banner;
import team.nt.Entity.News;
import team.nt.Entity.Odetail;
import team.nt.Entity.Oview;
import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;
import team.nt.dto.OrderViewDto;
import team.nt.dto.Paging;

@Repository
public class AdminDao implements IAdminDao{

	@Autowired
	private EntityManager em;

	@Override
	public List<Product> getProductList(Paging paging) {
		String sql = "select p from Product p order by p.pseq desc";
		List<Product> list = em.createQuery(sql, Product.class)
				.setFirstResult(paging.getStartNum()-1)
				.setMaxResults(paging.getDisplayRow())
				.getResultList();
		return list;
	}
	
	@Override
	public List<News> getNewstList(Paging paging) {
		String sql = "select n from News n order by n.nseq desc";
		List<News> list = em.createQuery(sql, News.class)
				.setFirstResult(paging.getStartNum()-1)
				.setMaxResults(paging.getDisplayRow())
				.getResultList();
		return list;
	}
	
	

	@Override
	public List<Oview> getOrderList(Paging paging) {
        String sql = "select ov from Oview ov order by ov.oseq desc";
        List<Oview> list = em.createQuery(sql, Oview.class)
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
	public News updateNews(News news, String nseq) {
		String sql = "update News n set n.title= :title, n.content1= :content1,"
				+ " n.content2= :content2, n.content3= :content3 where n.nseq= :nseq";
		
		Query query = em.createQuery(sql); // Query 객체 사용
		
		query.setParameter("title", news.getTitle());
		query.setParameter("content1", news.getContent1());
		query.setParameter("content2", news.getContent2());
		query.setParameter("content3", news.getContent3());
		query.setParameter("nseq", nseq);
		
		// 업데이트 쿼리 실행
		query.executeUpdate();
		
		return news;
	}
	
	
	@Override
	public News updateNewsImages(News news, String nseq) {
		String sql = "update News n set n.image1= :image1, n.image2= :image2, n.image3= :image3 where n.nseq= :nseq";
		
		Query query = em.createQuery(sql); // Query 객체 사용
		
		query.setParameter("image1", news.getImage1());
	    query.setParameter("image2", news.getImage2());
	    query.setParameter("image3", news.getImage3());
	    query.setParameter("nseq", nseq);
	    
	    query.executeUpdate(); // 업데이트 쿼리 실행
	    
	    return news;
	}
	
	
	@Override
	public Odetail updateorder(Odetail odetail, int oseq) {
		String sql = "update Odetail od set od.oname= :oname, od.ophone= :ophone, od.oznum= :oznum, od.oadd1= :oadd1,"
				+ " od.oadd2= :oadd2, od.result= :result where od.oseq= :oseq";
		
		Query query = em.createQuery(sql);
		
		query.setParameter("oname", odetail.getOname());
	    query.setParameter("ophone", odetail.getOphone());
	    query.setParameter("oznum", odetail.getOznum());
	    query.setParameter("oadd1", odetail.getOadd1());
	    query.setParameter("oadd2", odetail.getOadd2());
	    query.setParameter("result", odetail.getResult());
	    query.setParameter("oseq", oseq);
	    
	    query.executeUpdate(); // 업데이트 쿼리 실행
		
		return odetail;
	}


	@Override
	public List<Pcategory> getPcategory() {
		String sql = "select pc from Pcategory pc";
		return em.createQuery(sql, Pcategory.class).getResultList();
	}

	
	@Override
	public List<Oview> getOseqList(int oseq) {
		String sql = "select ov from Oview ov where ov.oseq= :oseq";
		
		TypedQuery query = em.createQuery(sql, Oview.class);
		query.setParameter("oseq", oseq);
		
		List<Oview> result = query.getResultList();
		
		return result;
	}

	@Override
	public List<Odetail> getOriginalList(int oseq) {
		String sql = "select od from Odetail od where od.oseq= :oseq";
		
		TypedQuery query = em.createQuery(sql, Odetail.class);
		query.setParameter("oseq", oseq);
		
		List<Odetail> list = query.getResultList();
		
		return list;
	}



	

	
	

}
