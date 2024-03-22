package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
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
		// System.out.println("OrderDao의 Oview값 : " + list);
		return list;
	}


	@Override
	public List<Integer> getOseqList(String email) {
		String sql = "select distinct ov.oseq from Oview ov where ov.email= :email and ov.result<>'4'";
		// distinct : 중복을 제거하는 명령어 => 여러개의 4번 oseq중에서 하나의 oseq만 가져온다
		// ov.result<>4 : Oview의 result가 4가 아닌 나머지 (4는 배송완료 = 완료 이전의 값을 가져올 예정)
		
		return em.createQuery(sql, Integer.class).setParameter("email", email).getResultList();
	}


	@Override
	public List<Integer> getOseqDoneList(String email) {
		String sql = "select distinct ov.oseq from Oview ov where ov.email= :email and ov.result= :result";
		// distinct : 중복을 제거하는 명령어 => 여러개의 4번 oseq중에서 하나의 oseq만 가져온다
		
		TypedQuery query = em.createQuery(sql, Integer.class);
		query.setParameter("email", email);
		query.setParameter("result", "4");
		
		List<Integer> list = query.getResultList();
		
		return list;
	}



	
	
	

}
