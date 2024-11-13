package com.campusdual.cd2023bfs1g3.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IStateService {

    public EntityResult stateQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult stateInsert(Map<?, ?> attrMap);
    public EntityResult stateUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
    public EntityResult stateDelete(Map<?, ?> keyMap);

}
