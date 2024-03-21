package team.nt.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Odetail {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer odseq;
	private Integer oseq;
	private Integer pseq;
	private Integer quantity;
	private String result;
	private String oname;
	private String ophone;
	private String oznum;
	private String oadd1;
	private String oadd2;

}
