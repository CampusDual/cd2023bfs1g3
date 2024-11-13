package com.campusdual.cd2023bfs1g3.model.core.TaskCron;


import com.campusdual.cd2023bfs1g3.api.core.service.IBookingService;
import com.campusdual.cd2023bfs1g3.api.core.service.IProductService;
import com.ontimize.jee.common.dto.EntityResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@EnableScheduling
public class CheckReservation {
    private static final String TIME_ZONE = "Europe/Paris";

    @Autowired
    IBookingService bookingService;
    @Autowired
    IProductService productService;

    /**
     * A B C D E F
     *
     *     A: Segundos (0 - 59).
     *
     *     B: Minutos (0 - 59).
     *
     *     C: Horas (0 - 23).
     *
     *     D: Día (1 - 31).
     *
     *     E: Mes (1 - 12).
     *
     *     F: Día de la semana (0 - 6).
     * */

    @Scheduled(cron = "0 20 14 * * *", zone = TIME_ZONE) public void
    checkBooking() {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate today = LocalDate.now();

        Map<String, Object> filterBooking = new HashMap<>();
        List<String> atributtesBooking = new ArrayList<>(Arrays.asList("id", "id_product", "units", "reservation_state", "end_date"));

        EntityResult listBooking = this.bookingService.bookingQuery(filterBooking,atributtesBooking);

        // Si esta vacio retorna
        if(listBooking.isEmpty()){
            return;
        }

        List <Map<String, Object>> listBookingFormat = new ArrayList<>();

        for (int i = 0; i < listBooking.calculateRecordNumber(); i++) {
            if(listBooking.getRecordValues(i).get("reservation_state").equals(1)){
                listBookingFormat.add(listBooking.getRecordValues(i));
            }

        }

        // Comprobamos las fechas
        listBookingFormat.forEach((booking)-> {
            String stringEndDate = booking.get("end_date").toString().split(" ")[0];
            LocalDate endDate = LocalDate.parse(stringEndDate, formatter);

             if(endDate.isBefore(today)){

                 Map<String, Object> attrMap = new HashMap<>();
                 attrMap.put("reservation_state", 4);
                 Map<String, Object> keyMap = new HashMap<>();
                 keyMap.put("id", booking.get("id"));
                 EntityResult updatedBooking = bookingService.bookingUpdate(attrMap, keyMap);

                 if(updatedBooking.getCode() != 1){
                     System.out.println("Reserva cancelada");
                 }

             }
        } );
    }

}
