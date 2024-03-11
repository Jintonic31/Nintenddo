package team.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.nt.Entity.News;
import team.nt.dao.INewsDao;

@Service
public class NewsService {
	
	@Autowired
	INewsDao indao;

	public List<News> getNewsList() {
		List<News> list = indao.getNewsList();
		return list;
	}
	
	

}
