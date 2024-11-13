package com.campusdual.cd2023bfs1g3.model.core.service;


import com.campusdual.cd2023bfs1g3.api.core.service.IStateService;
import com.campusdual.cd2023bfs1g3.model.core.dao.StateDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("StateService")
public class StateService implements IStateService {
    @Autowired
    private StateDao stateDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    // Realiza una consulta en la base de datos, utilizando el objeto stateDao, la clave (keyMap) y la lista de atributos (attrList).
    // El resultado se devuelve como un objeto EntityResult.
    @Override
    public EntityResult stateQuery(Map<?, ?> keyMap, List<?> attrList) {
        return this.daoHelper.query(stateDao, keyMap, attrList);
    }


    //Realiza una operación de inserción utilizando el método daoHelper.insert() para agregar un nuevo estado en la base de datos.
    @Override
    public EntityResult stateInsert(Map<?, ?> attrMap) {
        return this.daoHelper.insert(stateDao, attrMap);
    }


    //Actualiza los datos del estado utilizando el método daoHelper.update() basándose en los mapas de atributos y clave proporcionados.
    @Override
    public EntityResult stateUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(stateDao, attrMap, keyMap);
    }

    //Eliminación de estados utilizando el método daoHelper.delete() basándose en el mapa de clave proporcionado.
    @Override
    public EntityResult stateDelete(Map<?, ?> keyMap) {
        return this.daoHelper.delete(this.stateDao, keyMap);
    }


}
