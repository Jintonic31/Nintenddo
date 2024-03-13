package team.nt.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import team.nt.Entity.Member;

@Repository
public class MemberDao implements IMemberDao{
	
	@Autowired
	private EntityManager em;
	
	
}
