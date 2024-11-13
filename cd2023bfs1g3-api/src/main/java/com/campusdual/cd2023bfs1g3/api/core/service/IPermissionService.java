package com.campusdual.cd2023bfs1g3.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;


public interface IPermissionService {

	public EntityResult permissionQuery(Map<String, Object> keyMap, List<String> attrList)
			throws OntimizeJEERuntimeException;
}
