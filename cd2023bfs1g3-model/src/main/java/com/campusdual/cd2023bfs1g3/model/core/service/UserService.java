package com.campusdual.cd2023bfs1g3.model.core.service;


import java.util.*;

import com.campusdual.cd2023bfs1g3.api.core.service.IUserService;
import com.campusdual.cd2023bfs1g3.model.core.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;


@Lazy
@Service("UserService")
public class UserService implements IUserService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	public void loginQuery(Map<?, ?> key, List<?> attr) {
	}


	//Realiza una consulta de usuarios utilizando el daoHelper.query() y devuelve un EntityResult.
	//Recupera datos de usuario según el mapa de clave y atributos proporcionados.
	public EntityResult userQuery(Map<?, ?> keyMap, List<?> attrList) {
		return this.daoHelper.query(userDao, keyMap, attrList);
	}


	//Realiza una operación de inserción utilizando el método daoHelper.insert() para agregar un nuevo usuario.
	public EntityResult userInsert(Map<?, ?> attrMap) {
		return this.daoHelper.insert(userDao, attrMap);
	}


	//Actualiza los datos del usuario utilizando el método daoHelper.update() basándose en los mapas de atributos y clave proporcionados.
	public EntityResult userUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
		return this.daoHelper.update(userDao, attrMap, keyMap);
	}


	//Eliminación de usuarios utilizando el método daoHelper.delete() basándose en el mapa de clave proporcionado.
	public EntityResult userDelete(Map<?, ?> keyMap) {
		return this.daoHelper.delete(this.userDao, keyMap);
	}


	//Genera una nueva contraseña aleatoria utilizando el método genPass().
	@Override
	public ResponseEntity newRandomPass(String username) {
		String pass = genPass();
		Map<String, Object> attrMap = new HashMap<>();
		attrMap.put("password",pass);
		Map<String, Object> keyMap = new HashMap<>();
		keyMap.put("user_",username);

		Map<String, Object> body = new HashMap<>();
		body.put("password", pass);

		//Actualiza la contraseña del usuario en la base de datos utilizando el método daoHelper.update().
		EntityResult resEntityUpdatePasss = this.daoHelper.update(this.userDao,attrMap ,keyMap);

		if (resEntityUpdatePasss.getCode() == 1) {
			return ResponseEntity.badRequest()
					.body("No ha sido posible cambiar la contraseña");
		}

		return ResponseEntity.status(HttpStatus.OK)
				.body(body);
	}

	private String genPass(){
		//Utilización de la clase Random para crear una contraseña de 16 caracteres aleatorios con códigos ASCII entre 33 y 121 (inclusive).
		String pass = new Random().ints(16, 33, 122).collect(StringBuilder::new,
						StringBuilder::appendCodePoint, StringBuilder::append)
				.toString();

		return pass;
	}

}
