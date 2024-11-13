package com.campusdual.cd2023bfs1g3.api.core.service;


import java.util.List;
import java.util.Map;

import com.ontimize.jee.common.dto.EntityResult;
import org.springframework.http.ResponseEntity;


public interface IUserService {

	public EntityResult userQuery(Map<?, ?> keyMap, List<?> attrList);
	public EntityResult userInsert(Map<?, ?> attrMap);
	public EntityResult userUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
	public EntityResult userDelete(Map<?, ?> keyMap);
	public ResponseEntity newRandomPass(String username);
}
