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


	@Override
	public Member updateMember(Member member) {
		Member mem = em.find(Member.class, member.getEmail());
		mem.setEmail(member.getEmail() );
		mem.setPwd(member.getPwd() );
		mem.setZnum(member.getZnum());
		mem.setAdd1(member.getAdd1());
		mem.setAdd2(member.getAdd2());
		mem.setAdd3(member.getAdd3());
		
		
		return mem;
	}


	@Override
	public void deletemember(String email) {
		Member member = em.find(Member.class, email);
		em.remove(member);
		
	}



	
	
}
