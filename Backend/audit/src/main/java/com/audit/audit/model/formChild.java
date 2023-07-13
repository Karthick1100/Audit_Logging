package com.audit.audit.model;

import java.io.Serializable;
import javax.persistence.*;

@Entity
public class formChild implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable = false)
	public Long id;
	public Long changeId;
	@Column(length=50)
	public String columnName;
	@Column(columnDefinition = "CLOB")
	public String oldValue;
	@Column(columnDefinition = "CLOB")
	public String newValue;

	
	public formChild() {}
	
	public formChild(Long id, Long changeId, String columnName, String oldValue, String newValue) {
		super();
		this.id = id;
		this.changeId = changeId;
		this.columnName = columnName;
		this.oldValue = oldValue;
		this.newValue = newValue;
		
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getChangeId() {
		return changeId;
	}
	public void setChangeId(Long changeId) {
		this.changeId = changeId;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getOldValue() {
		return oldValue;
	}
	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}
	public String getNewValue() {
		return newValue;
	}
	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}
	@Override
	public String toString() {
		return "formChild [id=" + id + ", changeId=" + changeId + ", columnName=" + columnName + ", oldValue="
				+ oldValue + ", newValue=" + newValue + "]";
	}
	
	
}
