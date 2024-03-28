package team.nt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Admins;
import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;
import team.nt.dao.AdminRepository;
import team.nt.dao.IAdminDao;
import team.nt.dao.ProductRepository;
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

	

}
