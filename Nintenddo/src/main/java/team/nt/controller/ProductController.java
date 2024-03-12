package team.nt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import team.nt.Entity.Product;
import team.nt.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	
	@Autowired
	ProductService ps;
	
	
	@PostMapping("/getsoftlist")
	public List<Product> getMainSoftList(@RequestParam("pcseq") Integer pcseq){
		
		List<Product> list = ps.getMainSoftList(pcseq);
		
		// System.out.println(list);
		
		return list;
		
	}
	
	
	@PostMapping("/gethardwarelist")
	public List<Product> getHardwareList(@RequestParam("pcseq") Integer pcseq){
		
		List<Product> list = ps.getHardwareList(pcseq);
		
		System.out.println(list);
		
		return list;
	}
	
	
	@PostMapping("/getamiibolist")
	public List<Product> getAmiiboList(@RequestParam("pcseq") Integer pcseq){
		
		List<Product> list = ps.getAmiiboList(pcseq);
		
		System.out.println(list);
		
		return list;
	}
	
	
	@PostMapping("/getapplist")
	public List<Product> getAppList(@RequestParam("pcseq") Integer pcseq){
		
		List<Product> list = ps.getAppList(pcseq);
		
		System.out.println(list);
		
		return list;
	}

}
