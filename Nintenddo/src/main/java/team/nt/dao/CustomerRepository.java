package team.nt.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import team.nt.Entity.Qna;

public interface CustomerRepository extends JpaRepository<Qna, Integer>{

	// Optional<Qna> findByEmail(String email);

}


