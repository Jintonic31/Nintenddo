package team.nt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Admins;
import team.nt.Entity.News;
import team.nt.Entity.Odetail;
import team.nt.Entity.Oview;
import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;
import team.nt.dao.AdminRepository;
import team.nt.dao.IAdminDao;
import team.nt.dao.NewsRepository;
import team.nt.dao.ProductRepository;
import team.nt.dto.OrderViewDto;
import team.nt.dto.Paging;

@Service
@Transactional
public class AdminService {
	
	@Autowired
	IAdminDao iadao;
	
	@Autowired
	AdminRepository ar;
	
	@Autowired
	ProductRepository pr;
	
	@Autowired
	NewsRepository nr;
	


	public Admins getAdmin(String adminid) {
		Optional<Admins> mem = ar.findById(adminid);
		if(!mem.isPresent()) {
			return null;
		}else {
			return mem.get();
		}
		
	}

	public List<Product> getProductList(Paging paging) {
		return iadao.getProductList(paging);
	}

	public Product getOneProduct(String pseq) {
		return iadao.getOneProduct(pseq);
	}

	public Product updateProduct(Product product) {
		return iadao.updateProduct(product);
	}

	public List<Pcategory> getPcategory() {
		return iadao.getPcategory();
	}

	public void insertproduct(Product product) {
		pr.save(product);		
	}
	
	public void insertnews(News news) {
		nr.save(news);
	}

	public List<News> getnewsList(Paging paging) {
		return iadao.getNewstList(paging);
	}
	
	public List<Oview> getOrderList(Paging paging) {
		return iadao.getOrderList(paging);
	}
	

	public News updateNews(News news, String nseq) {
		return iadao.updateNews(news, nseq);
	}

	public News updateNewsImages(News news, String nseq) {
		return iadao.updateNewsImages(news, nseq);
	}

	public void deletenews(int nseq) {
		nr.deleteById(nseq);
	}

	public void deleteproduct(int pseq) {
		pr.deleteById(pseq);		
	}

	public List<Oview> getOseqList(int oseq) {
		return iadao.getOseqList(oseq);
	}

	public Odetail updateorder(Odetail odetail, int oseq) {
		return iadao.updateorder(odetail, oseq);
	}

	public List<Odetail> getOriginalList(int oseq) {
		return iadao.getOriginalList(oseq);
	}

	

	
	
	
	

}
