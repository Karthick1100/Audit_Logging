package com.audit.audit.model;

import java.io.Serializable;

import javax.persistence.*;

@Entity
public class formChange implements Serializable {
	public formChange() {}
	public formChange(Long changeId, int formId, String changedAt, String changedBy, String form) {
		super();
		this.changeId = changeId;
		this.formId = formId;
		this.changedAt = changedAt;
		this.changedBy = changedBy;
		this.form = form;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO 	)
	@Column(nullable = false)
	public Long changeId;
	public String changedAt;
	public int formId;
	public String changedBy;
	@Column(columnDefinition = "CLOB")
	public String form;
	
	@Override
	public String toString() {
		return "formChange [changeId=" + changeId + ", formId=" + formId + ", changedAt=" + changedAt + ", changedBy="
				+ changedBy + ", form=" + form + "]";
	}
	public Long getChangeId() {
		return changeId;
	}
	public void setChangeId(Long changeId) {
		this.changeId = changeId;
	}
	public int getFormId() {
		return formId;
	}
	public void setFormId(int formId) {
		this.formId = formId;
	}
	public String getChangedAt() {
		return changedAt;
	}
	public void setChangedAt(String changedAt) {
		this.changedAt = changedAt;
	}
	public String getChangedBy() {
		return changedBy;
	}
	public void setChangedBy(String changedBy) {
		this.changedBy = changedBy;
	}
	public String getForm() {
		return form;
	}
	public void setForm(String form) {
		this.form = form;
	}
	
	
}
