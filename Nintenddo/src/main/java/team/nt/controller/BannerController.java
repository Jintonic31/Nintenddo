package team.nt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import team.nt.Entity.Banner;
import team.nt.service.BannerService;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

	@Autowired
	BannerService bs;
	
	@GetMapping("/mainbanner")
	public List<Banner> getMainBenner(){
	// Banner 형식의 List형 메서드 getMainBenner()
		
		List<Banner> list = bs.getMainBenner();
		
		// System.out.println(list);
		
		return list;		
	}
	
	
	
	
	
}
