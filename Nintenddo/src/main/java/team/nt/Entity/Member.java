package team.nt.Entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Member {

	@Id
	private String userid;
	private String  pwd;
	private String  email;
	private Timestamp indate;
	private String  znum;
	private String  add1;
	private String  add2 ;
	private String  add3 ;
	private String  provider;
	private String  useyn;
	private String gender;
	private String bmonth;
	private String byear;
	private String bday;
	private String country;
}
