package com.audit.audit.auditRepo;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.audit.audit.model.formChange;


@Repository
@Qualifier("ac")
public interface auditChange extends JpaRepository<formChange, Integer> {
	List<formChange> findFormChangeByFormId(int id);
	
	@Transactional
	void deleteFormChangeByFormId(int id);
	
}
