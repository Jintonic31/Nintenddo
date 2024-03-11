package team.nt.Entity;

import java.sql.Timestamp;

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
	private String image;
	private String content;
	private Timestamp indate;
	

}
