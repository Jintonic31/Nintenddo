package team.nt.dto;

import lombok.Data;

@Data
public class Paging {
	private int page = 1;
	private int startNum;
	private int displayRow=10;
	
	public void cal() {
		startNum = (page-1) * displayRow + 1;
	}
}
