package team.nt.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import team.nt.Entity.Member;


public interface MemberRepository extends JpaRepository<Member, String>{

}
