package team.nt.service;

import org.springframework.beans.factory.annotation.Autowired;

import team.nt.IQnadao.IQnadao;

public class CustomerService {

	@Autowired
	IQnadao iqdao;
	
	public Object getQna(int qseq) {
		return iqdao.getQna(qseq);
	
	}

}
