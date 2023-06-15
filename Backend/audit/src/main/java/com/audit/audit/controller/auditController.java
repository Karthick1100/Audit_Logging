package com.audit.audit.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.audit.audit.model.Form;
import com.audit.audit.model.formChange;
import com.audit.audit.service.auditService;

@RestController
@RequestMapping("/audit")

public class auditController {
	
		auditService as;
		
		@Autowired
		auditController(auditService as){
			this.as=as;
		}
		
		
		@GetMapping("/form")
		public ResponseEntity<Form> getForm(@RequestParam(name = "formId",defaultValue ="22") int formId) {
			try {
				Form f=as.getFormById(formId);
				if(f==null) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
				return new ResponseEntity<>(f,HttpStatus.OK);
			}
			catch(Exception e){
				System.out.println(e);
			}
			
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
		
		@GetMapping("/allForms")
		public ResponseEntity<List<Form>> getAllForms(){
			try {
				List<Form> forms=as.getForms();
				if(forms==null) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
				return new ResponseEntity<>(forms,HttpStatus.OK);
			}
			catch(Exception e){
				System.out.println(e);
			}
			
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
		
		@PostMapping("/submit")
		public ResponseEntity<Form> submitData(@RequestBody Form form) {
			Form newForm= as.addForm(form);
			return new ResponseEntity<> (newForm,HttpStatus.CREATED);
		}
		
		@PutMapping("/update")
		public ResponseEntity<Form> updateData(@RequestBody Form form) {
			Form updateForm= as.updateForm(form);
			return new ResponseEntity<> (updateForm,HttpStatus.OK);
		}
		
		@DeleteMapping("/delete/{id}")
		public ResponseEntity<?> deleteData(@PathVariable("id") int id){
			as.deleteForm(id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		@GetMapping("auditLog/{id}")
		public ResponseEntity<List<formChange>> auditLog(@PathVariable("id") int id){
			try {
				List<formChange> fc=as.getAuditLog(id);
				if(fc==null) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
				return new ResponseEntity<> (fc,HttpStatus.OK);
			}
			catch(Exception e){
				System.out.println(e);
			}
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
}
