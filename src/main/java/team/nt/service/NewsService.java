package team.nt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.News;
import team.nt.dao.INewsDao;
import team.nt.dao.NewsRepository;

@Service
@Transactional
public class NewsService {
	
	@Autowired
	INewsDao indao;
	
	@Autowired
	NewsRepository nr;

	public List<News> getNewsList() {
		List<News> list = indao.getNewsList();
		return list;
	}

	public News getonenews(String nseq) {
		return indao.getonenews(nseq);
	}

	
	
	

}
