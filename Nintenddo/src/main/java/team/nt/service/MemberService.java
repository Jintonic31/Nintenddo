package team.nt.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Member;
import team.nt.dao.IMemberDao;
import team.nt.dao.MemberRepository;

@Service
@Transactional
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

	public Member updateMember(Member member) {
		return mr.save(member);
	}

	public void deleteMember(String email) {
		imdao.deletemember(email);
		
	}
	
	public Member findUserEmailByPhone(String phone) {
		Optional<Member> mem = mr.findUserEmailByPhone(phone);
		if(!mem.isPresent()) {
			return null;
		}else {
			return mem.get();
		}
	}

}
