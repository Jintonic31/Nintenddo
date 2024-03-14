package team.nt.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import team.nt.Entity.Member;

@Repository
public class MemberDao implements IMemberDao{ //implements를 사용하면 class부분에 재정의 필요
	
	@Autowired
	private EntityManager em;


	@Override
	public Member getMember(String userid) {
		Member member = em.find(Member.class, userid);
		return member;
	}

	
	
}
