package com.campusdual.cd2023bfs1g3.model.core.service;


import com.campusdual.cd2023bfs1g3.api.core.service.IReservationStatesService;
import com.campusdual.cd2023bfs1g3.model.core.dao.ReservationStatesDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("ReservationStatesService")
public class ReservationStatesService implements IReservationStatesService {
    @Autowired
    private ReservationStatesDao reservationStatesDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    //Consulta el estado de las reservas utilizando el daoHelper.query() y devuelve un EntityResult.
    //Recupera los datos de las reservas según el mapa de clave y atributos proporcionados.
    @Override
    public EntityResult reservationStateQuery(Map<?, ?> keyMap, List<?> attrList) {
        return this.daoHelper.query(reservationStatesDao, keyMap, attrList);
    }

    //Consulta el estado de las reservas del cliente utilizando el daoHelper.query() y devuelve un EntityResult.
    //Recupera los datos de las reservas del cliente según el mapa de clave y atributos proporcionados.
    public EntityResult clientReservationStateQuery(Map<?, ?> keyMap, List<?> attrList) {
        return this.daoHelper.query(reservationStatesDao, keyMap, attrList, "clientReservationStateQuery");
    }


    //Inserta un nuevo estado de reserva en la base de datos.
    //Utiliza el objeto daoHelper para realizar la inserción en el ReservationStatesDao.
    @Override
    public EntityResult reservationStateInsert(Map<?, ?> attrMap) {
        return this.daoHelper.insert(reservationStatesDao, attrMap);
    }


    // Actualiza un estado de reserva existente en la base de datos.
    // Utiliza el objeto daoHelper para realizar la actualización en el ReservationStatesDao.
    @Override
    public EntityResult reservationStateUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(reservationStatesDao, attrMap, keyMap);
    }

    //Elimina un estado de reserva existente de la base de datos.
    // Utiliza el objeto daoHelper para realizar la eliminación en el ReservationStatesDao.
    @Override
    public EntityResult reservationStateDelete(Map<?, ?> keyMap) {
        return this.daoHelper.delete(this.reservationStatesDao, keyMap);
    }


}
