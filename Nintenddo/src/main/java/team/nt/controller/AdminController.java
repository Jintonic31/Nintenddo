package team.nt.controller;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import team.nt.Entity.Admins;
import team.nt.Entity.Product;
import team.nt.dto.Paging;
import team.nt.service.AdminService;

@RestController
@RequestMapping("/api/admins")
public class AdminController {
	
	@Autowired
	AdminService as;
	
	
	@PostMapping("/loginpage")
	public HashMap<String, Object> loginpage( @RequestBody Admins admins,  
			HttpServletRequest request ){
		HashMap<String, Object> result = new HashMap<String, Object>();
		Admins mem = as.getAdmin( admins.getAdminid() );
		if(mem == null ) {
			System.out.println("데이터 : " + mem);
			result.put("msg", "해당 메일이 없습니다");
		}else if( !mem.getPwd().equals( admins.getPwd() ) ) {
			System.out.println("데이터 : " + mem);
			result.put("msg", "패스워드가 틀립니다.");
		}else {
			HttpSession session = request.getSession(); 
			session.setAttribute("loginUser", mem);
			// System.out.println("/loginpage의 loginUser : " + mem);
			result.put("msg", "ok");
		}
		return result;
	}
	
	
	@GetMapping("/productList/{page}")
	public HashMap<String, Object> productlist(@PathVariable("page") int page){
		HashMap<String, Object> result = new HashMap<String, Object>();
		Paging paging = new Paging();
		paging.setPage(page);
		paging.cal();
		
		result.put("productlist", as.getProductList(paging));
		result.put("paging", paging);
		return result;
	}
	
	@PostMapping("/savepseq")
	public HashMap<String, Object> savepseq(@RequestParam("pseq") String pseq, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		session.setAttribute("pseq", pseq);
		
		// System.out.println("savepseq의 pseq : " + pseq);
		
		return result;
	}
	
	
	@PostMapping("/getoneproduct")
	public HashMap<String, Object> getOneProduct(HttpServletRequest request){
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		String pseq = (String)session.getAttribute("pseq");
		
		Product product = as.getOneProduct(pseq);
		result.put("product", product);
		result.put("pcseq", product.getPcseq());
		// System.out.println("getoneProduct의 product : " + product);
		// System.out.println("getoneProduct의 pcseq : " + product.getPcseq());
		
		return result;
	}
	
	
	@Autowired
	ServletContext context;
	
	@PostMapping("/imgup")
	public HashMap<String, Object> imgup(@RequestParam("image") MultipartFile file){
	// client에서 formData.append('image', e.target.files[0]);라는 코드를 통해 "image"라는 이름으로 file을 보냈으므로
	// RequestParam을 image로 받을수 있음..?
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		String path = context.getRealPath("/modify_product");
		// ㄴ getRealPath() :  웹 애플리케이션 컨텍스트 내에서 특정 경로에 해당하는 실제 파일 시스템 경로를 반환하는 데 사용
		// ㄴ webbapp 바로 아래 급의 폴더에 한정해 괄호 안의 폴더 경로를 자동으로 찾아주는 듯?
		
		System.out.println(path);
		
//		Calendar today = Calendar.getInstance();
//		long dt = today.getTimeInMillis();
//		System.out.println("dt : " + dt);
		
		String filename = file.getOriginalFilename();
		// System.out.println("filename : " + filename);
		
		String fn1 = filename.substring(0, filename.indexOf("."));	// . 기준 왼쪽 파일 이름 추출
		// System.out.println("fn1 : " + fn1);
		
		String fn2 = filename.substring(filename.indexOf("."));		// . 기준 오른쪽의 확장자 추출
		// System.out.println("fn2 : " + fn2);
		
		String uploadPath = path + "/" + fn1 + fn2;
		// System.out.println(uploadPath);
		
		try {
			file.transferTo(new File(uploadPath));
			result.put("filename", fn1 + fn2);
			// ㄴ filename을 파일이름 + 확장자 와 함께 보냄
		}catch(IllegalStateException | IOException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	@PostMapping("/updateproduct")
	public HashMap<String, Object> updateproduct(@RequestBody Product product){
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		Product pdt = as.updateProduct(product);
		
		return null;
	}
	

	
	
}
