package team.nt.dao;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import team.nt.Entity.Member;

@Repository
public class MemberDao implements IMemberDao{ //implements를 사용하면 class부분에 재정의 필요
	
	@Autowired
	private EntityManager em;


	
	
}
