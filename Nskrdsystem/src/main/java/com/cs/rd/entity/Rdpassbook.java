package com.cs.rd.entity;
import java.time.LocalDate;
import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Rdpassbook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pid;
	private int rid;
	@Column(name = "rddate")
	private LocalDate rddate;  // This will be saved as DATE in DB
	private int rdamt;
	private int lday;
	private int famt;
	private int flag;
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public LocalDate getRddate() {
		return rddate;
	}
	public void setRddate(LocalDate rddate) {
		this.rddate = rddate;
	}
	public int getRdamt() {
		return rdamt;
	}
	public void setRdamt(int rdamt) {
		this.rdamt = rdamt;
	}
	public int getLday() {
		return lday;
	}
	public void setLday(int lday) {
		this.lday = lday;
	}
	public int getFamt() {
		return famt;
	}
	public void setFamt(int famt) {
		this.famt = famt;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	
}
