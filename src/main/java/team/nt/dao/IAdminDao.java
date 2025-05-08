package team.nt.dao;

import java.util.List;

import team.nt.Entity.News;
import team.nt.Entity.Odetail;
import team.nt.Entity.Oview;
import team.nt.Entity.Pcategory;
import team.nt.Entity.Product;
import team.nt.dto.OrderViewDto;
import team.nt.dto.Paging;

public interface IAdminDao {

	List<Product> getProductList(Paging paging);

	Product getOneProduct(String pseq);

	Product updateProduct(Product product);

	List<Pcategory> getPcategory();

	List<News> getNewstList(Paging paging);

	News updateNews(News news, String nseq);

	News updateNewsImages(News news, String nseq);
	
	List<Oview> getOrderList(Paging paging);

	List<Oview> getOseqList(int oseq);

	Odetail updateorder(Odetail odetail, int oseq);

	List<Odetail> getOriginalList(int oseq);

	




}
