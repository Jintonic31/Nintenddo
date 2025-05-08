package team.nt.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
	
	
	@GetMapping("/savenseq/{nseq}")
	public HashMap<String, Object> savenseq(@PathVariable("nseq") String nseq, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		session.setAttribute("nseq", nseq);
		
		return null;
	}
	
	
	@GetMapping("/getonenews")
	public HashMap<String, Object> getonenews(HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		String nseq = (String)session.getAttribute("nseq");
		
		News news = ns.getonenews(nseq);
		result.put("news", news);
		
		// System.out.println(news);
		
		return result;
	}
	
	
	

}
