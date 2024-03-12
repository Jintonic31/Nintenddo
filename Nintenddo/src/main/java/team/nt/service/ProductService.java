package team.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;
import team.nt.dao.IProductDao;

@Service
public class ProductService {
	
	@Autowired
	IProductDao ipdao;

	public List<Product> getMainSoftList(Integer pcseq) {
		List<Product> list = ipdao.getMainSoftList(pcseq);
		return list;
	}

	

	
	
	

}
