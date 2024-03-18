package team.nt.dao;

import java.util.List;

import team.nt.Entity.Pcategory;
import team.nt.Entity.Playmode;
import team.nt.Entity.Product;

public interface IProductDao {

	List<Product> getMainSoftList(Integer pcseq);

	List<Product> getHardList();

	List<Playmode> getModeList();

	List<Product> getControlList();

	Product getOneProduct(String pseq);

	List<Product> getJoyList();

	List<Product> getChargeList();

	List<Product> getUnreleaseList(Integer pcseq);

	


	

}
