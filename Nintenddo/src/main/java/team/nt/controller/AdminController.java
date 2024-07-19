package team.nt.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import team.nt.Entity.Admins;
import team.nt.Entity.News;
import team.nt.Entity.Odetail;
import team.nt.Entity.Oview;
import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;
import team.nt.dto.Paging;
import team.nt.service.AdminService;

@RestController
@RequestMapping("/api/admins")
@RequiredArgsConstructor
public class AdminController {
	
	@Autowired
	AdminService as;
	
	private final AmazonS3 s3;

	   @Value("${cloud.aws.s3.bucket}")
	   private String bucket;
	
	
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
			session.setAttribute("adminUser", mem);
			// System.out.println("/loginpage의 loginUser : " + mem);
			result.put("msg", "ok");
		}
		return result;
	}
	
	
	@PostMapping("/getAdminUser")
	public HashMap<String, Object> getAdminUser(HttpServletRequest request){
		HttpSession session = request.getSession();
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("adminUser", session.getAttribute("adminUser"));
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
	
	@GetMapping("/orderList/{page}")
	public HashMap<String, Object> orderList(@PathVariable("page") int page){
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		Paging paging = new Paging();
		paging.setPage(page);
		paging.cal();
	
		result.put("orderlist", as.getOrderList(paging));
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
	
	@PostMapping("/savenseq")
	public HashMap<String, Object> savenseq(@RequestParam("nseq") String nseq, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		session.setAttribute("nseq", nseq);
		
		return result;
	}
	
	
	@PostMapping("/saveoseq")
	public HashMap<String, Object> saveoseq(@RequestParam("oseq") String oseq, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		session.setAttribute("oseq", oseq);
		
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
	

	
	   
	@PostMapping("/imgup")
	public HashMap<String, Object> imgup(@RequestParam("image") MultipartFile file) throws AmazonServiceException, SdkClientException, IOException{

		HashMap<String, Object> result = new HashMap<String, Object>();
		
		String originalFilename = file.getOriginalFilename();
		String filePath = "product/productdetail/" + originalFilename;
		System.out.println("오리지널 파일 네임 : " + originalFilename);
		
		// AWS 배포용
		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(file.getSize());
		metadata.setContentType(file.getContentType());
		
		// AWS 버킷에 이미지 업로드
		s3.putObject(bucket, filePath, file.getInputStream(), metadata);
		
		result.put("filename", originalFilename);
		result.put("filesrc", s3.getUrl(bucket, filePath).toString());
		System.out.println("버킷 이미지 경로 : " + s3.getUrl(bucket, filePath).toString());
		
		
		// Local 폴더에 이미지 업로드
		// String localDirectory = "C:/Users/nilink/git/Nintenddo/Nintenddo/src/main/resources/static/images/product/productdetail/";
		//	ㄴ 회사 로컬용
		
		// String localDirectory = "/home/Nintenddo/src/main/resources/static/images/product/productdetail";
		//	ㄴ 회사 배포용
		
		// String localDirectory = "C:/Users/as/git/Nintenddo/Nintenddo/src/main/resources/static/images/product/productdetail/";
		//	ㄴ 노트북 로컬용
		
		
	    // Path localFilePath = Paths.get(localDirectory, originalFilename);
	    // System.out.println("로컬 파일 패스 : " + localFilePath.toString());
	    
	    // Files.write(localFilePath, file.getBytes());
	    
	    
	    // result.put("filename", originalFilename);
	    // result.put("filesrc", "http://localhost:8070/images/" + filePath);
	    // result.put("filesrc", "http://10.0.0.139:8070/images/" + filePath);
  
		return result;
	   
	}
	
	
	@PostMapping("/newsimgup")
	public HashMap<String, Object> newsimgup(@RequestParam("image") MultipartFile file) throws /* AmazonServiceException, SdkClientException,*/ IOException{
	// client에서 formData.append('image', e.target.files[0]);라는 코드를 통해 "image"라는 이름으로 file을 보냈으므로
	// RequestParam을 image로 받을수 있음..?
		
//		HashMap<String, Object> result = new HashMap<String, Object>();
//		
//		String path = context.getRealPath("/images");
//		// ㄴ getRealPath() :  웹 애플리케이션 컨텍스트 내에서 특정 경로에 해당하는 실제 파일 시스템 경로를 반환하는 데 사용
//		// ㄴ webbapp 바로 아래 급의 폴더에 한정해 괄호 안의 폴더 경로를 자동으로 찾아주는 듯?
//		
//		// System.out.println("path : " + path);
//		
//		String filename = file.getOriginalFilename();
//		// System.out.println("filename : " + filename);
//		
//		String fn1 = filename.substring(0, filename.indexOf("."));	// . 기준 왼쪽 파일 이름 추출
//		// System.out.println("fn1 : " + fn1);
//		
//		String fn2 = filename.substring(filename.indexOf("."));		// . 기준 오른쪽의 확장자 추출
//		// System.out.println("fn2 : " + fn2);
//		
//		String uploadPath = path + "/news/" + fn1 + fn2;
//		// System.out.println(uploadPath);
//		
//		try {
//			file.transferTo(new File(uploadPath));
//			result.put("filename", fn1 + fn2);
//			// ㄴ filename을 파일이름 + 확장자 와 함께 보냄
//		}catch(IllegalStateException | IOException e) {
//			e.printStackTrace();
//		}
		
		HashMap<String, Object> result = new HashMap<String, Object>();

		String originalFilename = file.getOriginalFilename();
		String filePath = "news/" + originalFilename;
		System.out.println("오리지널 파일 네임 : " + originalFilename);
		
		// AWS 배포용
		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(file.getSize());
		metadata.setContentType(file.getContentType());
		
		// AWS 버킷에 이미지 업로드
		s3.putObject(bucket, filePath, file.getInputStream(), metadata);
		
		result.put("filename", originalFilename);
		result.put("filesrc", s3.getUrl(bucket, filePath).toString());
		System.out.println("버킷 이미지 경로 : " + s3.getUrl(bucket, filePath).toString());
		
		// Local 폴더에 이미지 업로드
		// String localDirectory = "C:/Users/nilink/git/Nintenddo/Nintenddo/src/main/resources/static/images/product/productdetail/";
		//	ㄴ 회사 로컬용
		
		// String localDirectory = "/home/Nintenddo/src/main/resources/static/images/news";
		//	ㄴ 회사 배포용
		
		// String localDirectory = "C:/Users/as/git/Nintenddo/Nintenddo/src/main/resources/static/images/news/";
		//	ㄴ 노트북 로컬용
		
	    // Path localFilePath = Paths.get(localDirectory, originalFilename);
	    // Files.write(localFilePath, file.getBytes());
	    
	    // result.put("filename", originalFilename);
	    // result.put("filesrc", "http://localhost:8070/images/" + filePath);
	    // result.put("filesrc", "http://localhost:8070/images/" + filePath);

		return result;
		
	}
	
	
	@PostMapping("/updateproduct")
	public HashMap<String, Object> updateproduct(@RequestBody Product product){
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		Product pdt = as.updateProduct(product);
		
		return null;
	}
	
	
	@GetMapping("/getPcategory")
	public List<Pcategory> getPcategory(){
		List<Pcategory> list = as.getPcategory();
		return list;
	}
	
	
	@PostMapping("/insertproduct")
	public HashMap<String, Object> insertproduct(@RequestBody Product product){
		as.insertproduct(product);
		return null;
	}
	
	
	@PostMapping("/insertnews")
	public HashMap<String, Object> insertnews(@RequestBody News news){
		as.insertnews(news);
		return null;
	}
	
	
	
	@GetMapping("/newsList/{page}")
	public HashMap<String, Object> newsList(@PathVariable("page") int page){
		HashMap<String, Object> result = new HashMap<String, Object>();
		Paging paging = new Paging();
		paging.setPage(page);
		paging.cal();
		
		result.put("newslist", as.getnewsList(paging));
		result.put("paging", paging);
		return result;
	}
	
	
	@PostMapping("/updatenews")
	public HashMap<String, Object> updatenews(@RequestBody News news, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		// System.out.println("RequestBody로 받은 nseq : " + news.getNseq());
		HttpSession session = request.getSession();
		String nseq = (String)session.getAttribute("nseq");
		// System.out.println("Session에서 받은 nseq : " + nseq);
		
		News ns = as.updateNews(news, nseq);
		
		return null;
	}
	
	
	@PostMapping("/updatenewsimages")
	public HashMap<String, Object> updateimages(@RequestBody News news, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		HttpSession session = request.getSession();
		String nseq = (String)session.getAttribute("nseq");
		
		News ns = as.updateNewsImages(news, nseq);
		
		return null;
	}
	
	
	@DeleteMapping("/deletenews")
	public HashMap<String, Object> deletenews(HttpServletRequest request){
		HttpSession session = request.getSession();
		int nseq = Integer.parseInt((String)session.getAttribute("nseq"));
		as.deletenews(nseq);
		return null;
	}
	
	
	@DeleteMapping("/deleteproduct")
	public HashMap<String, Object> deleteproduct(HttpServletRequest request){
		HttpSession session = request.getSession();
		int pseq = Integer.parseInt((String)session.getAttribute("pseq"));
		as.deleteproduct(pseq);
		return null;
	}
	
	
	@GetMapping("/getOrderone")
	public List<Oview> getOrderone(HttpServletRequest request){
		
		HttpSession session = request.getSession();
		int oseq = Integer.parseInt((String) session.getAttribute("oseq"));		
		
		List<Oview> list = as.getOseqList(oseq);
		// System.out.println("해당 oseq의 모든 oseq : " + list);
		
		return list;
	}
	
	
	@PostMapping("/updateorder")
	public HashMap<String, Object> updateorder(@RequestBody Odetail odetail, HttpServletRequest request){
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		// System.out.println(odetail.getOname());
		HttpSession session = request.getSession();
		int oseq = Integer.parseInt((String) session.getAttribute("oseq"));
		
		List<Odetail> originalList = as.getOriginalList(oseq);
        Odetail originalDetail = originalList.get(0);
		
		if (odetail.getOname() == null || odetail.getOname().trim().isEmpty()) {
	        odetail.setOname(originalDetail.getOname());
		}
		if(odetail.getOphone() == null || odetail.getOphone().trim().isEmpty()) {
	        odetail.setOphone(originalDetail.getOphone());
		}
		if(odetail.getOznum() == null || odetail.getOznum().trim().isEmpty()) {
			odetail.setOznum(originalDetail.getOznum());
		}
		if(odetail.getOadd1() == null || odetail.getOadd1().trim().isEmpty()) {
			odetail.setOadd1(originalDetail.getOadd1());
		}
		if(odetail.getOadd2() == null || odetail.getOadd2().trim().isEmpty()) {
			odetail.setOadd2(originalDetail.getOadd2());
		}
		if(odetail.getResult() == null || odetail.getResult().trim().isEmpty()) {
			odetail.setResult(originalDetail.getResult());
		}
		
		
		Odetail od = as.updateorder(odetail, oseq);
		
		return null;
	}

	
	
}
