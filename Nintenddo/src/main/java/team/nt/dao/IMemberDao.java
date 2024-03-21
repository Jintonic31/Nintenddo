package team.nt.dao;

import team.nt.Entity.Member;

public interface IMemberDao {

	Member getMember(String userid);

	Member updateMember(Member member);

	void deletemember(String email);



}
