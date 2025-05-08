package team.nt.dao;

import java.util.List;

import team.nt.Entity.Odetail;
import team.nt.Entity.Orders;
import team.nt.Entity.Oview;

public interface IOrderDao {

	int lookupMaxoseq();

	void insertodetail(Odetail odetail);

	void insertorder(Orders orders);

	List<Oview> getordernowByOseq(int oseq);

	List<Integer> getOseqList(String email);

	List<Integer> getOseqDoneList(String email);



}
