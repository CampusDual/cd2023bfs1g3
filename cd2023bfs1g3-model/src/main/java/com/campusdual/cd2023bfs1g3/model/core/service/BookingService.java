package com.campusdual.cd2023bfs1g3.model.core.service;


import com.campusdual.cd2023bfs1g3.api.core.service.IBookingService;
import com.campusdual.cd2023bfs1g3.model.core.dao.BookingDao;
import com.campusdual.cd2023bfs1g3.model.core.dao.ProductDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Clase de servicio para la tabla booking
 */
@Lazy
@Service("BookingService")
public class BookingService implements IBookingService {
    @Autowired
    private BookingDao bookingDao;
    @Autowired
    private ProductDao productDao;
    //Atributo para gestionar el stock o el estado de los productos reservados
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    private Integer years;
    //Atributo para establecer el año de las consultas en las gráficas

    public Integer getYears() {
        return years;
    }

    public void setYears(Integer years) {
        this.years = years;
    }

    @Override
    public EntityResult bookingQuery(Map<?, ?> keyMap, List<?> attrList) {
        return this.daoHelper.query(bookingDao, keyMap, attrList);
    }

    /**
     * Método para la obtención de los datos necesarios para construir las gráficas de ventas
     * y beneficios globales anuales
     *
     * @param keyMap
     * @param attrList
     * @return
     */
    @Override
    public EntityResult sellBookingQuery(Map<String, Object> keyMap, List<String> attrList) {
       return this.daoHelper.query(bookingDao, isYears(keyMap), attrList, "sellBookingQuery");
    }

    /**
     * Método para la obtención de los datos necesarios para construir las gráficas de ventas
     * y beneficios por localizadión en el período de un año concreto
     *
     * @param keyMap
     * @param attrList
     * @return
     */
    @Override
    public EntityResult locationsBookingQuery(Map<String, Object> keyMap, List<String> attrList) {
        attrList.add("name_location");
        EntityResult eRResult = this.daoHelper.query(bookingDao, isYears(keyMap), attrList, "locationsBookingQuery");
        eRResult.put("name_location_units", CustomColumn(eRResult, "name_location", ". U:"));
        return eRResult;
    }

    /**
     * Método para la obtención de los datos necesarios para construir las gráficas de rotación de stock
     * en el período de un año concreto
     *
     * @param keyMap
     * @param attrList
     * @return
     */
    @Override
    public EntityResult stockBookingQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(bookingDao, isYears(keyMap), attrList, "stockBookingQuery");
    }

    /**
     * Método para la obtención de los datos necesarios para construir las gráficas de los usuarios
     * que no recogen sus reservas en el período de un año concreto
     *
     * @param keyMap
     * @param attrList
     * @return
     */
    @Override
    public EntityResult usersBookingQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(bookingDao, isYears(keyMap), attrList, "usersBookingQuery");
    }

    /**
     * Método para la obtención de los datos necesarios para construir las gráficas de los usuarios con
     * límite en 7 que no recogen sus reservas en el período de un año concreto y mostrarlas en la página
     * de incio de las gráficas
     *
     * @param keyMap
     * @param attrList
     * @return
     */
    @Override
    public EntityResult userslimitBookingQuery(Map<String, Object> keyMap, List<String> attrList) {
        if(getYears() != null){
            keyMap.put("year_", getYears());
            setYears((null));
        }
        attrList.add("name");
        EntityResult eRResult = this.daoHelper.paginationQuery(bookingDao, keyMap, attrList, 7,1,new ArrayList<>(),"usersBookingQuery");
        eRResult.put("name_user", CustomColumn(eRResult, "name", ". U:"));
        return eRResult;
    }

    /**
     * Método para construir una columna al vuelo que devuelva un valor concatenado con un mensaje a mostrar en
     * las gráficas de la página principal
     *
     * @param eRResult
     * @param nameColumn
     * @param sms
     * @return
     */
    private List<String> CustomColumn(EntityResult eRResult, String nameColumn, String sms){
        List<String> list = new ArrayList<>();
        for(int i =0; i < eRResult.calculateRecordNumber(); i++){
            String name_user = (String) eRResult.getRecordValues(i).get(nameColumn) + sms;
            list.add(name_user);

        }
        return list;
    }

    /**
     * Método que establece el año de consulta de las peticiones realizadas para la construcción de gráficas
     *
     * @param keyMap
     * @param attrList
     */
    @Override
    public void yearBookingQuery(Map<String, Object> keyMap, List<String> attrList) {
        if(keyMap.containsKey("year_")){
            setYears((Integer) keyMap.get("year_"));
        }

    }

    /**
     * Método auxiliar para establecer el año de la consulta
     *
     * @param keyMap
     * @return
     */
    private Map<String, Object> isYears(Map<String, Object> keyMap){
        if(this.years != null){
            keyMap.put("year_", getYears());
            setYears(null);
        }
        return keyMap;
    }

    /**
     * Método que devuelve la consulta para la gestion de reservas
     *
     * @param keyMap
     * @param attrList
     * @return
     */
    @Override
    public EntityResult gBookingQuery(Map<?, ?> keyMap, List<?> attrList) {
        return this.daoHelper.query(bookingDao, keyMap, attrList);
    }

    /**
     * Método que devuelve el el stock de los productos que han sido reservados
     *
     * @param keyMap
     * @param attrList
     * @return
     */
    @Override
    public EntityResult reserveStockQuery(Map<?, ?> keyMap, List<?> attrList) {
        return this.daoHelper.query(bookingDao, keyMap, attrList, "reserveStockQuery");
    }

    /**
     * Método que devuelve las reservas de un usuario concreto para ser mostradas a ese usuario
     *
     * @param keyMap
     * @param attrList
     * @return
     */
    @Override
    public EntityResult myBookingQuery(Map<String, Object> keyMap, List<?> attrList) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        keyMap.put("id_user", auth.getName());
        return this.daoHelper.query(bookingDao, keyMap, attrList);
    }

    /**
     * Hace la inserción de la reserva en la base de datos estableciendo la finalización de la misma
     * casteada a timestamp
     *
     * @param attrMap
     * @return
     */
    @Override
    public EntityResult bookingInsert(Map<String, Object> attrMap) {
        Map<String, Object> keyMap = Collections.singletonMap("id", attrMap.get("id_product"));
        EntityResult entityResult = this.daoHelper.query(productDao, keyMap, new ArrayList<String>(Arrays.asList("active")));
        if(otherQuerys(entityResult) != null){
            return entityResult;
        }
        if(entityResult.getRecordValues(0).get("active").equals(false)){
            return entityResult;
        }
        Calendar endDate = Calendar.getInstance();
        endDate.setTimeInMillis((long) attrMap.get("end_date"));
        Timestamp timestamp = new Timestamp(endDate.getTime().getTime());
        attrMap.put("end_date", timestamp);
        return this.daoHelper.insert(bookingDao, attrMap);
    }

    /**
     * Método para actualizar las reservas teniendo en cuenta el estado cancelado
     *
     * @param attrMap
     * @param keyMap
     * @return
     */
    @Override
    public EntityResult bookingUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        //Si el estado es cancelado
        if (attrMap.get("reservation_state").equals(2)){
            Timestamp timestamp = new Timestamp(Calendar.getInstance().getTime().getTime());
            attrMap.put("collection_completed", timestamp);

            EntityResult entityResult = this.daoHelper.query(bookingDao, keyMap, new ArrayList<String>(Arrays.asList("id_product")));
            if(otherQuerys(entityResult) != null){
                return entityResult;
            }

            Integer id_product = (Integer) entityResult.getRecordValues(0).get("id_product");
            Map<String, Object> keyMapProduct = Collections.singletonMap("id", id_product);
            Map<String, Object> productMap = new HashMap<>();
            productMap.putAll(this.activeBookingUpdate(productMap, keyMapProduct));

            EntityResult eProductActive = daoHelper.update(productDao, productMap, keyMapProduct);
        }
        return this.daoHelper.update(bookingDao, attrMap, keyMap);
    }

    /**
     * Acutaliza las reservas del usuario en uso
     *
     * @param attrMap
     * @param keyMap
     * @return
     */
    @Override
    public EntityResult myBookingUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(bookingDao, attrMap, keyMap);
    }

    /**
     * Actualiza las reservas seleccionadas teniendo en cuenta el estado cancelado o recogido
     *
     * @param attrMap
     * @param keyMap
     * @return
     */
    @Override
    //@Secured({ PermissionsProviderSecured.SECURED })
    public EntityResult gBookingUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        //Si la reserva es recogida
        if (attrMap.get("reservation_state").equals(3)){
            //Sacar datos producto
            List<String> attrListBooking = new ArrayList<String>(Arrays.asList("id_product", "units"));
            EntityResult eRProductUnits = daoHelper.query(bookingDao, keyMap, attrListBooking);
            if(otherQuerys(eRProductUnits) != null){
                return eRProductUnits;
            }

            Integer id_product = (Integer) eRProductUnits.getRecordValues(0).get("id_product");
            Integer units = (Integer) eRProductUnits.getRecordValues(0).get("units");
            Map<String, Object> keyMapStock = Collections.singletonMap("id", id_product);
            List<String> stockList = new ArrayList<>(Arrays.asList("stock"));

            EntityResult eRProductStock = daoHelper.query(productDao, keyMapStock, stockList);
            if(otherQuerys(eRProductStock) != null){
                return eRProductStock;
            }

            Integer stock = (Integer) eRProductStock.getRecordValues(0).get("stock");
            Integer stockUpdated = stock - units;
            Map attrProduct = new HashMap<String, Object>();
            attrProduct.put("stock", stockUpdated);
            if(stockUpdated == 0){
                attrProduct.put("active", false);
            }
            daoHelper.update(productDao, attrProduct, keyMapStock);

            //Estampar la fecha de recogida en bookings
            Timestamp timestamp = new Timestamp(Calendar.getInstance().getTime().getTime());
            attrMap.put("collection_completed", timestamp);
            //Ahora, si la reserva es cancelada
        } else if (attrMap.get("reservation_state").equals(2)){
            Timestamp timestamp = new Timestamp(Calendar.getInstance().getTime().getTime());
            attrMap.put("collection_completed", timestamp);
        }
        return this.daoHelper.update(bookingDao, attrMap, keyMap);
    }

    /**
     * Actulización automática de la reserva si no es recogida al vencimiento de la fecha de recogida
     *
     * @param attrMap
     * @param keyMap
     * @return
     */
    private Map<String, Object> activeBookingUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        List<String> stateList = new ArrayList<>(Arrays.asList("state"));
        EntityResult eRProductState = daoHelper.query(productDao, keyMap, stateList);
        if(otherQuerys(eRProductState) != null){
            return eRProductState.getRecordValues(0);
        }
    Integer state= (Integer) eRProductState.getRecordValues(0).get("state");
        //Si el estado es "no recogida"
        if(state != 4){
            attrMap.put("active", true);
        }
        return attrMap;
    }

    /**
     * Método auxiliar para dar un mensage de error si una consulta falla
     *
     * @param entityResult
     * @return
     */
    private EntityResult otherQuerys(EntityResult entityResult){
        if(entityResult.isWrong()){
            return entityResult;
        }
        if(entityResult.isEmpty()){
            EntityResult notFoundERPS = new EntityResultMapImpl();
            notFoundERPS.setCode(EntityResult.OPERATION_WRONG);
            notFoundERPS.setMessage("Product not found");
            return notFoundERPS;
        }
        return null;
    }

    @Override
    //@Secured({ PermissionsProviderSecured.SECURED })
    public EntityResult bookingDelete(Map<?, ?> keyMap) {
        return this.daoHelper.delete(this.bookingDao, keyMap);
    }


}
