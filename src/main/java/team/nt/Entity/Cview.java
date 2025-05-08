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
public class Cview {
// View를 이용할 경우 mysql에 view를 만드는게 선행되어야 하고 그 뒤에 Entity를 생성
// View를 이용한 테이블 업데이트는 권장하지 않으므로 Data 대신 Getter만(= 값을 가져오기만) 생성
	
	@Id
	private Integer cseq;
	private String email;
	private Integer pseq;
	private String pname;
	private String image;
	private String phone;
	private Integer quantity;
	private Integer price1;
	private String result;
	@CreationTimestamp
	private Timestamp indate;
	
	

}
