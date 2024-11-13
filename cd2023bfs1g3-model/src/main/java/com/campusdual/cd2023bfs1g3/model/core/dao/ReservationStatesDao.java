package com.campusdual.cd2023bfs1g3.model.core.dao;


import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


@Lazy
@Repository(value = "ReservationStatesDao")
@ConfigurationFile(
	configurationFile = "dao/ReservationStatesDao.xml",
	configurationFilePlaceholder = "dao/placeholders.properties")
public class ReservationStatesDao extends OntimizeJdbcDaoSupport {

    public static final String ID_STATE = "id_state";
    public static final String NAME_RESERVATION_STATE = "name_reservation_state";

}
