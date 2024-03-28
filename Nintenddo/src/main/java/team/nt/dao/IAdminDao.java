package team.nt.dao;

import java.util.List;

import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;
import team.nt.dto.Paging;

public interface IAdminDao {

	List<Product> getProductList(Paging paging);

	Product getOneProduct(String pseq);

	Product updateProduct(Product product);

	List<Pcategory> getPcategory();

}
