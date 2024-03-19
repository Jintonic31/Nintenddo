package team.nt.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import team.nt.Entity.Playmode;
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
	
	
	@GetMapping("/gethardlist")
	public List<Product> getHardList(){
		List<Product> list = ps.getHardList();
		// System.out.println(list);
		return list;
	}
	
	
	@GetMapping("/getmodelist")
	public List<Playmode> getModeList(){
		List<Playmode> list = ps.getModeList();
		// System.out.println(list);
		return list;
	}
	
	
	@GetMapping("/getcontrollist")
	public List<Product> getControlList(){
		return ps.getControlList();
	}
	
	@GetMapping("/getjoylist")
	public List<Product> getJoyList(){
		return ps.getJoyList();
	}
	
	@GetMapping("/getchargelist")
	public List<Product> getChargeList(){
		return ps.getChargeList();
	}
	
	
	@PostMapping("/getoneproduct/{pseq}")
	public HashMap<String, Object> getOneProduct(@PathVariable("pseq") String pseq){
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		Product product = ps.getOneProduct(pseq);
		result.put("product", product);
		// System.out.println(product);
		
		return result;
	}
	
	
	@PostMapping("/getunreleaselist")
	public List<Product> getUnreleaseList(@RequestParam("pcseq") Integer pcseq){
		
		List<Product> list = ps.getUnreleaseList(pcseq);
		// System.out.println(list);		
		return list;
	}
	
	
	
	


}
