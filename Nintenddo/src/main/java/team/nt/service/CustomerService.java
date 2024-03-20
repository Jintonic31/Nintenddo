package team.nt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Qna;
import team.nt.dao.CustomerRepository;
import team.nt.dao.IQnaDao;


@Service
@Transactional
public class CustomerService {

	@Autowired
	IQnaDao iqdao;
	
	@Autowired
	CustomerRepository cr;

	public List<Qna> getqnalist(String email) {
		List<Qna> list = iqdao.getqnalist(email);
		return list;
	}

//	public Qna getQna(int qseq) {
//		return iqdao.getQna(qseq);
//	}


//	public Qna getqnalist(String email) {
//		return cr.findByEmail(email).get();
//		
//		
//	}
}
