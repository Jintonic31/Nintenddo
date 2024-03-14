package team.nt.service;

import java.util.Optional;

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

	public Member getMember(String email) {
		Optional<Member> mem = mr.findById(email);
		if(!mem.isPresent()) {
			return null;
		}else {
		return mem.get();
		}
	}

}
