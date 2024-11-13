package com.campusdual.cd2023bfs1g3.model.core.service;


import com.campusdual.cd2023bfs1g3.api.core.service.IProductService;
import com.campusdual.cd2023bfs1g3.model.core.dao.ProductDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("ProductService")
public class ProductService implements IProductService {
    @Autowired
    private ProductDao productDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    // Realiza una consulta de productos utilizando el daoHelper.query() y devuelve un EntityResult.
    // Recupera datos del producto según el mapa de clave y atributos proporcionados.
    @Override
    public EntityResult productQuery(Map<String, Object> keyMap, List<String> attrList) {
            return this.daoHelper.query(productDao, keyMap, attrList);
    }


    //Modifica keyMap para agregar una condición para que el atributo ACTIVE sea verdadero,
    //y luego realiza una operación de consulta en la entidad Product utilizando daoHelper.
    @Override
    public EntityResult activeProductQuery(Map<String, Object> keyMap, List<String> attrList) {
        keyMap.put(ProductDao.ACTIVE, true);
        return this.daoHelper.query(productDao, keyMap, attrList);
    }


    //Realiza una operación de inserción utilizando el método daoHelper.insert() para agregar un nuevo producto.
    @Override
    public EntityResult productInsert(Map<String, Object> attrMap) {
        return this.daoHelper.insert(productDao, attrMap);
    }

    //Actualiza los datos del producto utilizando el método daoHelper.update() basándose en los mapas de atributos y clave proporcionados.
    @Override
    public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return this.daoHelper.update(productDao, attrMap, keyMap);
    }

    //Eliminación de productos utilizando el método daoHelper.delete() basándose en el mapa de clave proporcionado.
    @Override
    public EntityResult productDelete(Map<?, ?> keyMap) {
        return this.daoHelper.delete(this.productDao, keyMap);
    }

}
