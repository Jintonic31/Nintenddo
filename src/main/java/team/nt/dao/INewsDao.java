package team.nt.dao;

import java.util.List;

import team.nt.Entity.News;

public interface INewsDao {

	List<News> getNewsList();

	News getonenews(String nseq);


}
