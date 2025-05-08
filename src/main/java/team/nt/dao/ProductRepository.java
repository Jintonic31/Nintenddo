package team.nt.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import team.nt.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

}
