package com.audit.audit.auditRepo;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.audit.audit.model.Form;


@Repository
@Qualifier("ar")
public interface auditRepo extends JpaRepository<Form, Integer>{
	Form findFormByFormId(int id);
	@Transactional
	void deleteFormByFormId(int id);
}
