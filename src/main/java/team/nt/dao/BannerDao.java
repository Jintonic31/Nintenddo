package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import team.nt.Entity.Banner;

@Repository
public class BannerDao implements IBannerDao{
// XML로 Mapping되는게 아니라 Dao클래스를 만들어서 인터페이스를 implements하여 함수 정의로 사용

	
	@Autowired
	private EntityManager em;
	

	@Override
	public List<Banner> getMainBenner() {
		
		String sql = "select b from Banner b where b.uri= :uri";
		
		TypedQuery query = em.createQuery(sql, Banner.class);
		
		query.setParameter("uri", "banner/main");
		// 변수 :uri 에 들어갈 값 지정
		
		List<Banner> result = query.getResultList();		
		return result;
	}



	
	
	

}
