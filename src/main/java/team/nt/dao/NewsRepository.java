package team.nt.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import team.nt.Entity.News;

public interface NewsRepository extends JpaRepository<News, Integer>{

}
