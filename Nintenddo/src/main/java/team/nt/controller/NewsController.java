package team.nt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team.nt.Entity.News;
import team.nt.service.NewsService;

@RestController
@RequestMapping("/api/news")
public class NewsController {
	
	@Autowired
	NewsService ns;
	
	@GetMapping("/getnewslist")
	public List<News> getNewsList(){
		
		List<News> list = ns.getNewsList();
		
		// System.out.println(list);
		
		return list;
	}
	
	
	

}
