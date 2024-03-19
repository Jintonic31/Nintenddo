package team.nt.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import team.nt.Entity.Cart;
import team.nt.Entity.Cview;
import team.nt.Entity.Member;

public interface CartRepository extends JpaRepository<Cart, Integer>{

	
	List<Cview> findCartlistByEmail(String email);


	

}