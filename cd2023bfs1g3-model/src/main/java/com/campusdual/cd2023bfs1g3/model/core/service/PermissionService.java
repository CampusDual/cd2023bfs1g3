package com.campusdual.cd2023bfs1g3.model.core.service;


import com.campusdual.cd2023bfs1g3.api.core.service.IPermissionService;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Clase para otorgar permisos a los distintos tipos de usuarios, users, mantenimiento y seguridad.
 */
@Service("PermissionService")
@Lazy
public class PermissionService implements IPermissionService {

	public static final String PLANNER_PERMISSION_USER =
			"{\"routes\": [{ \"permissionId\": \"users-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"home-permissions\", \"enabled\": true }," +
					"{ \"permissionId\": \"global-bookings-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"booking-charts-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"products-permissions\", \"enabled\": false }]," +
			"\"menu\": [{ \"attr\": \"users\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"global-bookings\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"booking-charts\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"products\", \"visible\": false, \"enabled\": false }]}";
	public static final String PLANNER_PERMISSION_SECURITY =
			"{\"routes\": [{ \"permissionId\": \"users-permissions\", \"enabled\": true }," +
					"{ \"permissionId\": \"global-bookings-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"booking-charts-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"products-permissions\", \"enabled\": false }]," +
					"\"menu\": [{ \"attr\": \"users\", \"visible\": true, \"enabled\": true }, " +
					"{ \"attr\": \"global-bookings\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"booking-charts\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"products\", \"visible\": false, \"enabled\": false }]}";
	public static final String PLANNER_PERMISSION_MAINTENANCE =
			"{\"routes\": [{ \"permissionId\": \"users-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"global-bookings-permissions\", \"enabled\": true }," +
					"{ \"permissionId\": \"booking-charts-permissions\", \"enabled\": true }," +
					"{ \"permissionId\": \"products-permissions\", \"enabled\": true }]," +
					"\"menu\": [{ \"attr\": \"users\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"global-bookings\", \"visible\": true, \"enabled\": true }, " +
					"{ \"attr\": \"booking-charts\", \"visible\": true, \"enabled\": true }, " +
					"{ \"attr\": \"products\", \"visible\": true, \"enabled\": true }]}";
	public static final String PLANNER_PERMISSION_DEFAULT =
			"{\"routes\": [{ \"permissionId\": \"users-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"home-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"global-bookings-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"booking-charts-permissions\", \"enabled\": false }," +
					"{ \"permissionId\": \"products-permissions\", \"enabled\": false }]," +
					"\"menu\": [{ \"attr\": \"users\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"global-bookings\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"booking-charts\", \"visible\": false, \"enabled\": false }, " +
					"{ \"attr\": \"products\", \"visible\": false, \"enabled\": false }]}";

	@Override
	public EntityResult permissionQuery(Map<String, Object> keyMap, List<String> attrList)
			throws OntimizeJEERuntimeException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		EntityResult e = new EntityResultMapImpl();
		Map<String, String> map = new HashMap<>();
		String role = null;
		if (authentication.getAuthorities().toArray().length > 0){
			role = authentication.getAuthorities().toArray()[0].toString();
		}

		if("security".equals(role)){
			map.put("permission", PermissionService.PLANNER_PERMISSION_SECURITY);
		} else if("maintenance".equals(role)){
			map.put("permission", PermissionService.PLANNER_PERMISSION_MAINTENANCE);
		} else if("user".equals(role)){
			map.put("permission", PermissionService.PLANNER_PERMISSION_USER);
		} else {
			map.put("permission", PermissionService.PLANNER_PERMISSION_DEFAULT);
		}

		e.addRecord(map);
		return e;
	}
}
