package team.nt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Qna;
import team.nt.dao.IQnadao;


@Service
@Transactional
public class CustomerService {



	public Qna getQna(int qseq) {
		return null;
	}
}
