package team.nt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import team.nt.Entity.Banner;
import team.nt.dao.IBannerDao;

@Service
@Transactional
public class BannerService {
	
	@Autowired
	IBannerDao ibdao;

	public List<Banner> getMainBenner() {
		List<Banner> list = ibdao.getMainBenner();
		return list;
	}


	
	

}
