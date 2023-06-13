package com.audit.audit.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.audit.audit.auditRepo.auditRepo;
import com.audit.audit.model.Form;

@Service
public class auditService  {
	
	auditRepo ar;
	@Autowired
	auditService(auditRepo ar){
		this.ar=ar;
	}
	
	
	public void addForm(Form form) {
		form.setCreatedAt(LocalDate.now().toString());
		form.setFormName("Good form");
		form.setFormFeilds(new String[] {"karthick","Subramanian"});
		ar.save(form);
	}
	
	public List<Form> getForms(){
		return ar.findAll();
	}
	
//	public Form getFormById(int id) {
//		return ar.findFormById(id);
//	}
	
//	public void eraseFormById(int id) {
//		ar.deleteFormById(id);
//	}
	
	

}
