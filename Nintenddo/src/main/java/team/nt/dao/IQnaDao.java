package team.nt.dao;

import java.util.List;

import team.nt.Entity.Qna;
import team.nt.dto.Paging;

public interface IQnaDao {

	List<Qna> getQnalist(Paging paging);
	void insertQna(Qna qna);
	Qna getQna(int qseq);

}
