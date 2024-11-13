package com.campusdual.cd2023bfs1g3.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "BookingDao")
@ConfigurationFile(
        configurationFile = "dao/BookingDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class BookingDao extends OntimizeJdbcDaoSupport {

    public static final String ID = "id";
    public static final String ID_USER = "id_user";
    public static final String ID_PRODUCT = "id_product";
    public static final String UNITS = "units";
    public static final String RESERVATION_DATE = "reservation_date";
    public static final String RESERVATION_STATE = "reservation_state";
    public static final String ID_STATE = "id_state";
    public static final String NAME_RESERVATION_STATE = "name_reservation_state";
    public static final String UNIT_PRICE = "unit_price";
    public static final String TOTAL_PRICE = "total_price";
    public static final String RESERVATION_DAYS = "reservation_days";
    public static final String COLLECTION_COMPLETED = "collection_completed";
    public static final String END_DATE = "end_date";
    public static final String NAME_PRODUCT = "name";
    public static final String PHOTO_PRODUCT = "photo";
    public static final String LOCATION_PRODUCT = "id_locations";
    public static final String STATE_PRODUCT = "state";
    public static final String BODY_PRODUCT = "body";
    public static final String STATE_NAME_PRODUCT = "state_name";
    public static final String LOCATION_NAME_PRODUCT = "name_location";
    public static final String TOTAL_SALES = "total_sales";
    public static final String MONTH_ = "month_";
    public static final String N_MONTH = "n_month";
    public static final String YEAR_ = "year_";
}
