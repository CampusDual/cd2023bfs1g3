package com.campusdual.cd2023bfs1g3.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IReservationStatesService {

    public EntityResult reservationStateQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult clientReservationStateQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult reservationStateInsert(Map<?, ?> attrMap);
    public EntityResult reservationStateUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
    public EntityResult reservationStateDelete(Map<?, ?> keyMap);

}
