package team.nt.dao;

import java.util.List;

import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;

public interface IProductDao {

	List<Product> getMainSoftList(Integer pcseq);

	List<Product> getHardwareList(Integer pcseq);

	List<Product> getAmiiboList(Integer pcseq);

	List<Product> getAppList(Integer pcseq);

	

}
