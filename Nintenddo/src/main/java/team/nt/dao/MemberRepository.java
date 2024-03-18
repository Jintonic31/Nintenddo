package team.nt.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import team.nt.Entity.Member;


public interface MemberRepository extends JpaRepository<Member, String>{

	Optional<Member> findUserEmailByPhone(String phone);

}
