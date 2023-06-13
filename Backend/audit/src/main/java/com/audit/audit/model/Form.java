package com.audit.audit.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.*;

@Entity
public class Form implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(updatable = false, nullable = false)
	public int formId;
	public String formName;
	public String[] formFeilds;
	public String createdAt;

	
		
	public Form() {
		
	}
	
	public Form(int formId, String formName, String[] formFeilds, String createdAt) {
		super();
		this.formId = formId;
		this.formName = formName;
		this.formFeilds = formFeilds;
		this.createdAt = createdAt;
	}
//	LocalDateTime currentDateTime = LocalDateTime.now();
//    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//    String formattedDateTime = currentDateTime.format(formatter);

	@Override
	public String toString() {
		return "Form [formId=" + formId + ", formName=" + formName + ", formFeilds=" + formFeilds + ", createdAt="
				+ createdAt + "]";
	}

	public int getFormId() {
		return formId;
	}

	public void setFormId(int formId) {
		this.formId = formId;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}

	public String[] getFormFeilds() {
		return formFeilds;
	}

	public void setFormFeilds(String[] formFeilds) {
		this.formFeilds = formFeilds;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

}
