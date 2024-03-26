package team.nt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Admins;
import team.nt.Entity.Product;
import team.nt.dao.AdminRepository;
import team.nt.dao.IAdminDao;
import team.nt.dto.Paging;

@Service
@Transactional
public class AdminService {
	
	@Autowired
	IAdminDao iadao;
	
	@Autowired
	AdminRepository ar;

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
	

}
