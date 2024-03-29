package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import team.nt.Entity.News;

@Repository
public class NewsDao implements INewsDao{
	

	@Autowired
	private EntityManager em;
	
	
	
	@Override
	public List<News> getNewsList() {
		String sql = "select n from News n order by n.indate desc";
		
		TypedQuery query = em.createQuery(sql, News.class);
		
		List<News> result = query.getResultList();
		return result;
	}



	@Override
	public News getonenews(String nseq) {
		String sql = "select n from News n where n.nseq= :nseq";
		TypedQuery query = em.createQuery(sql, News.class);
		query.setParameter("nseq", nseq);
		
		News news = (News) query.getSingleResult(); 
		return news;
	}


}
