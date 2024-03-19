package team.nt.dao;

import java.util.List;

import team.nt.Entity.Cview;

public interface ICartDao {

	List<Cview> getcartlist(String email);

}
