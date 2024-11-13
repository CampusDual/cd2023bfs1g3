package com.campusdual.cd2023bfs1g3.ws.core.rest;


import com.campusdual.cd2023bfs1g3.api.core.service.IReservationStatesService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reservationStates")
public class ReservationStatesRestController extends ORestController<IReservationStatesService> {

    @Autowired
    private IReservationStatesService reservationStatesService;


    @Override
    public IReservationStatesService getService() {
         return this.reservationStatesService;
    }

}
