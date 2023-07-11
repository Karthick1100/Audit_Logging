package com.audit.audit.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
public class formChange implements Serializable {
	public formChange() {}
	public formChange(Long changeId, int formId, LocalDateTime changedAt, String changedBy) {
		super();
		this.changeId = changeId;
		this.formId = formId;
		this.changedAt = changedAt;
		this.changedBy = changedBy;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false)
	public Long changeId;
	public LocalDateTime changedAt;
	public int formId;
	@Column(length=100)
	public String changedBy;
	
	
	@Override
	public String toString() {
		return "formChange [changeId=" + changeId + ", formId=" + formId + ", changedAt=" + changedAt + ", changedBy="
				+ changedBy+"]";
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
	public LocalDateTime getChangedAt() {
		return changedAt;
	}
	public void setChangedAt(LocalDateTime changedAt) {
		this.changedAt = changedAt;
	}
	public String getChangedBy() {
		return changedBy;
	}
	public void setChangedBy(String changedBy) {
		this.changedBy = changedBy;
	}
}
