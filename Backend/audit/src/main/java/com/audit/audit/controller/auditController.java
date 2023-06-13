package com.audit.audit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.audit.audit.model.Form;
import com.audit.audit.service.auditService;

@RestController
@RequestMapping("/audit")
public class auditController {
	
		auditService as;
		
		@Autowired
		auditController(auditService acs){
			this.as=as;
			
		}

	
		@GetMapping("/form")
		public void getLanding() {
			as.addForm(new Form());
		}
}