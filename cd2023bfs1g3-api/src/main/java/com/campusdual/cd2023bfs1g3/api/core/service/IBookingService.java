package com.campusdual.cd2023bfs1g3.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IBookingService {

    public EntityResult bookingQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult sellBookingQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult locationsBookingQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult stockBookingQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult usersBookingQuery(Map<String, Object> keyMap, List<String> attrList);
    public void yearBookingQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult userslimitBookingQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult gBookingQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult myBookingQuery(Map<String, Object> keyMap, List<?> attrList);
    public EntityResult reserveStockQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult bookingInsert(Map<String, Object> attrMap);
    public EntityResult bookingUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult myBookingUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
    public EntityResult gBookingUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult bookingDelete(Map<?, ?> keyMap);

}
