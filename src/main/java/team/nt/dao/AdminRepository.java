package team.nt.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import team.nt.Entity.Admins;

public interface AdminRepository extends JpaRepository<Admins, String>{




}
