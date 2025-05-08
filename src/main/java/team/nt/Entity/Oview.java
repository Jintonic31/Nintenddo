package team.nt.Entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Oview {
	
	
	@Id
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
