package com.campusdual.cd2023bfs1g3.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface ILocationService {

    public EntityResult locationQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult locationInsert(Map<?, ?> attrMap);
    public EntityResult locationUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
    public EntityResult locationDelete(Map<?, ?> keyMap);

}
