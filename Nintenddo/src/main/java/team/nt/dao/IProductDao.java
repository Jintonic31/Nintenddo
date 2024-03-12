package team.nt.dao;

import java.util.List;

import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;

public interface IProductDao {

	List<Product> getMainSoftList(Integer pcseq);

	

}
