package com.audit.audit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


import java.lang.reflect.Field;
import java.lang.reflect.Method;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.audit.audit.auditRepo.auditChange;
import com.audit.audit.auditRepo.auditChild;
import com.audit.audit.auditRepo.auditRepo;
import com.audit.audit.model.Form;
import com.audit.audit.model.formChange;
import com.audit.audit.model.formChild;


@Service
public class auditService{
	
	auditRepo ar;
	auditChange ac;
	auditChild ach;
	

	
	@Autowired
	auditService(@Qualifier("ar") auditRepo ar,@Qualifier("ac") auditChange ac,@Qualifier("ach") auditChild ach){
		this.ar=ar;
		this.ac=ac;
		this.ach=ach;
	}
	
	public Form addForm(Form form) {
		//Saving the form in form table
		Form frm=ar.save(form);
		
		//addingInFormChange--masterTable
		formChange fc=new formChange();
		fc.setChangedAt(LocalDateTime.now().toString());
		fc.setChangedBy(form.lastEditedBy);
		fc.setFormId(frm.formId);
		formChange fchId=ac.save(fc);
		
		//addingInFormChild
		Field[] f=form.getClass().getDeclaredFields();
		for(Field fi:f) {
			
			formChild fch=new formChild();
			fch.setChangeId(fchId.getChangeId());
			fch.setColumnName(fi.getName());
			fch.setOldValue(null);
			
			try {
				fch.setNewValue(fi.get(form).toString());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			ach.save(fch);
		}
		
		return frm;
	}

	//to get the old value for updation
	public String findOldval(String columnName) {
		List<formChild> fch=ach.findFormChildByColumnName(columnName);
		int lastIndex=fch.size()-1;
		return fch.get(lastIndex).newValue;
	}
	
	
	public Form updateForm(Form form) {
		
		//updatingTheFormChanges
		formChange fc=new formChange();
		fc.setChangedAt(LocalDateTime.now().toString());
		fc.setChangedBy(form.lastEditedBy);
		fc.setFormId(form.formId);
		formChange fchId=ac.save(fc);
		
		//updatingTheChildTable
		Field[] f=form.getClass().getDeclaredFields();
		for(Field fi:f) {
			formChild fch=new formChild();
			fch.setChangeId(fchId.getChangeId());
			fch.setColumnName(fi.getName());
			fch.setOldValue(this.findOldval(fi.getName()));
			try {
				fch.setNewValue(fi.get(form).toString());
			} catch (IllegalArgumentException | IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(fch.getOldValue().equals(fch.getNewValue())) {
				continue;
			}
			ach.save(fch);
		}
		
		//savingTheForm
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
		List<formChange> fc=ac.findFormChangeByFormId(formId);
		ac.deleteFormChangeByFormId(formId);
		for(formChange frmChng:fc) {
			ach.deleteFormChildByChangeId(frmChng.changeId);
		}
	}
	
	public List<formChild> getAuditLog(int id) {
		List<formChange> al=ac.findFormChangeByFormId(id);
		List<formChild> totalList=new ArrayList<formChild>();
		for(formChange fc:al) {
			totalList.addAll(ach.findFormChildByChangeId(fc.changeId));
		}
		return totalList;
	}
	
}
