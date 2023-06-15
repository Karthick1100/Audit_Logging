package com.audit.audit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.audit.audit.auditRepo.auditChange;
import com.audit.audit.auditRepo.auditRepo;
import com.audit.audit.model.Form;
import com.audit.audit.model.formChange;


@Service
public class auditService{
	
	auditRepo ar;
	auditChange ac;
	@Autowired
	auditService(@Qualifier("ar") auditRepo ar,@Qualifier("ac") auditChange ac){
		this.ar=ar;
		this.ac=ac;
	}
	
	public Form addForm(Form form) {
		return ar.save(form);
	}
	
	public Form updateForm(Form form) {
		formChange fc=new formChange();
		fc.setForm(form.toString());
		fc.setChangedAt(LocalDateTime.now().toString());
		fc.setChangedBy(form.lastEditedBy);
		fc.setFormId(form.formId);
		ac.save(fc);
		return ar.save(form);
	}
	
	public List<Form> getForms(){
		return ar.findAll();
	}
	
	public Form getFormById(int id) {
		return ar.findFormByFormId(id);
	}
	
	public void deleteForm(int formId) {
		ar.deleteFormByFormId(formId);
		ac.deleteFormChangeByFormId(formId);
	}
	
	public List<formChange> getAuditLog(int id) {
		return ac.findFormChangeByFormId(id);
	}
	
	
	
}
