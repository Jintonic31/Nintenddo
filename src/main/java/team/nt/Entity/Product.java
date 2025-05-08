package team.nt.Entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Product {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer pseq;
	

	private Integer pcseq;	
	private String pname;
	private String content;
	private String image;
	private Integer price1;
	private Integer price2;
	private Integer price3;
	private String bestyn;
	private String useyn;
	@CreationTimestamp
	private Timestamp indate;
	private String includes;
	

}
