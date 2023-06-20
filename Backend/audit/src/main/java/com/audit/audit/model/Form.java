package com.audit.audit.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.*;

@Entity
public class Form implements Serializable {
	public Form(int formId, String firstName, String lastName, String email, String phone, String jobTitle,
			String address, String gender, String dob, String lastEditedBy) {
		super();
		this.formId = formId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.phone = phone;
		this.jobTitle = jobTitle;
		this.address = address;
		this.gender = gender;
		this.dob = dob;
		this.lastEditedBy = lastEditedBy;
	}

	public Form() {}

	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(updatable = false, nullable = false)
	public int formId;
	public String firstName;
	public String lastName;
	public String email;
	public String phone;
	public String jobTitle;
	@Column(columnDefinition = "CLOB")
	public String address;
	public String gender;
	public String dob;
	public String lastEditedBy;
	public int getFormId() {
		return formId;
	}

	public void setFormId(int formId) {
		this.formId = formId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getLastEditedBy() {
		return lastEditedBy;
	}

	public void setLastEditedBy(String lastEditedBy) {
		this.lastEditedBy = lastEditedBy;
	}

	@Override
	public String toString() {
		return "Form [formId=" + formId + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", phone=" + phone + ", jobTitle=" + jobTitle + ", address=" + address + ", gender=" + gender
				+ ", dob=" + dob + "]";
	}
	
	
	

	
	
	
	
}
