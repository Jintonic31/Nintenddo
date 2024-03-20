package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import team.nt.Entity.Odetail;
import team.nt.Entity.Orders;
import team.nt.Entity.Oview;

@Repository
public class OrderDao implements IOrderDao{
	
	@Autowired
	private EntityManager em;
	
	
	@Override
	public void insertorder(Orders orders) {
		em.persist(orders);		
	}
	

	@Override
	public int lookupMaxoseq() {
		String sql = "select max(o.oseq) from Orders o";
		// max(o.oseq) : orders 테이블에서 가장 큰 oseq
		int result = (Integer)em.createQuery(sql).getSingleResult();
		// getSingleResult() : 단 하나의 쿼리 결과만 가져올 때 사용(여러개면 에러)
		return result;
	}

	@Override
	public void insertodetail(Odetail odetail) {
		em.persist(odetail);		
	}


	@Override
	public List<Oview> getordernowByOseq(int oseq) {
		String sql = "select ov from Oview ov where ov.oseq= :oseq";
		List<Oview> list = em.createQuery(sql, Oview.class).setParameter("oseq", oseq).getResultList();
		return list;
	}

	
	
	

}
