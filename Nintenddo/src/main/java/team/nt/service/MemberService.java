package team.nt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.nt.Entity.Member;
import team.nt.dao.IMemberDao;
import team.nt.dao.MemberRepository;

@Service	
public class MemberService {

	@Autowired
	IMemberDao imdao;
	
	@Autowired
	MemberRepository mr;
	
	public void insertMember(Member member) {
		mr.save(member);
		
	}
}
