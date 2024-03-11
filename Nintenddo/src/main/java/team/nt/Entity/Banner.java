package team.nt.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Banner {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer bseq;
	private String image;
	private String uri;
	private Integer priority;
	private String useyn;

}
