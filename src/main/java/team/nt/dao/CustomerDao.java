package team.nt.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import team.nt.Entity.Qna;
import team.nt.dto.Paging;

@Repository
public class CustomerDao implements IQnaDao{

	@Autowired
	private EntityManager em;


	@Override
	public List<Qna> getqnalist(String email, Paging paging) {
		List<Qna> list
			= em.createQuery("select q from Qna q where q.email= :email order by q.qseq desc", Qna.class)
			.setParameter("email", email)
			.setFirstResult(paging.getStartNum()-1)
			.setMaxResults(paging.getDisplayRow())
			.getResultList();
		return list;
	
	}


	@Override
	public void insertQna(Qna qna) {
		em.persist(qna);
		
	}


	@Override
	public Qna getQna(int qseq) {
		return em.find(Qna.class, qseq);
	}


	
//	@Override
//	public List<Qna> getQnalist(Paging paging) {
//		List<Qna> list
//		= em.createQuery("select q from Qna q order by q.qseq desc", Qna.class)
//		.setFirstResult(paging.getStartNum()-1)
//		.setMaxResults(paging.getDisplayRow())
//		.getResultList();
//		return list;
//	}
//
//	@Override
//	public void insertQna(Qna qna) {
//		em.persist(qna);
//		
//	}
//
//	@Override
//	public Qna getQna(int qseq) {
//		return em.find(Qna.class, qseq); 
//	}

}
