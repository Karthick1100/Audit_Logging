package com.audit.audit.auditRepo;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.audit.audit.model.Form;


@Repository

public interface auditRepo extends JpaRepository<Form, Integer>{
//	Form findFormById(int id);
//	void deleteFormById(int id);
}