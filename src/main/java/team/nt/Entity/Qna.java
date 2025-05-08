package team.nt.Entity;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor //생성자만들때 빈거()
@AllArgsConstructor //생성자에만들때
public class Qna{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer qseq;
	private String email;
	private String title;
	private String content;
	private String reply;
	@CreationTimestamp
	private Timestamp indate;
}