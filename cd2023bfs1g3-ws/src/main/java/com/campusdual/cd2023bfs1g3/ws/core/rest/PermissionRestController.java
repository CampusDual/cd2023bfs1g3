package com.campusdual.cd2023bfs1g3.ws.core.rest;


import com.campusdual.cd2023bfs1g3.api.core.service.IPermissionService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/permissions")
public class PermissionRestController extends ORestController<IPermissionService> {

	@Autowired
	private IPermissionService permissionService;

	@Override
	public IPermissionService getService() {
		return this.permissionService;
	}
}