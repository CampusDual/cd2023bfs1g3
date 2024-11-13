package com.campusdual.cd2023bfs1g3.ws.core.rest;


import com.campusdual.cd2023bfs1g3.api.core.service.IStateService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/states")
public class StateRestController extends ORestController<IStateService> {

    @Autowired
    private IStateService stateService;


    @Override
    public IStateService getService() {
         return this.stateService;
    }

}
