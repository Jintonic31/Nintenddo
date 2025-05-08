package team.nt.dto;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Data
public class OrderViewDto {
	
	private int odseq;
	private String oname;
	private int oseq;
	@CreationTimestamp
	private Timestamp indate;
	private String email;
	private String ophone;
	private String image;
	private int pseq;
	private String pname;
	private int quantity;
	private int price1;
	private String oznum;
	private String oadd1;
	private String oadd2;
	private String result;

}
