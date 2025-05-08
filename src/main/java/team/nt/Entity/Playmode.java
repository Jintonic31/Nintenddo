package team.nt.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Playmode {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer mseq;
	
	@ManyToOne
	@JoinColumn(name = "pseq", referencedColumnName = "pseq")
	private Product pseq;
	
	private String tvmode;
	private String tabletmode;
	private String handmode;
	

}
