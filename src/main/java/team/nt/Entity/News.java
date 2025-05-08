package team.nt.Entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class News {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer nseq;
	private String title;
	private String image1;
	private String image2;
	private String image3;
	private String content1;
	private String content2;
	private String content3;
	@CreationTimestamp
	private Timestamp indate;
	

}
