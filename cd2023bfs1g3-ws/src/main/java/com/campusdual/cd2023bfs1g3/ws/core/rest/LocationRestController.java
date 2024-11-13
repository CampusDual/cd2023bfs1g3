package com.campusdual.cd2023bfs1g3.ws.core.rest;


import com.campusdual.cd2023bfs1g3.api.core.service.ILocationService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/locations")
public class LocationRestController extends ORestController<ILocationService> {

    @Autowired
    private ILocationService locationService;


    @Override
    public ILocationService getService() {
         return this.locationService;
    }

}