package team.nt.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;

@Repository
public class CartDao implements ICartDao{
	
	@Autowired
	private EntityManager em;

}
