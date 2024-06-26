import mysql from "mysql2"
import {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT} from "./config.js"


const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT
}).promise()

// ---------------------------------- Consultas ----------------------------------

// **************** Proyectos ****************
export async function consultarProyectos() {
    const query = "SELECT P.id, P.nombreProyecto, P.recursosNecesarios, P.presupuesto, P.descripcion, \
                    P.idEstadoProyecto, E.nombreEstado, P.fechaInicio, P.fechaFin, P.idPersonaResponsable, C.nombre, C.primerApellido, C.segundoApellido \
                    FROM proyectos P inner join estadosProyectos E on P.idEstadoProyecto = E.id \
                    inner join colaboradores C on P.idPersonaResponsable = C.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarProyectoById(id) {
    const query = "SELECT P.id, P.nombreProyecto, P.recursosNecesarios, P.presupuesto, P.descripcion, \
                    P.idEstadoProyecto, E.nombreEstado, P.fechaInicio, P.fechaFin, P.idPersonaResponsable, C.nombre, C.primerApellido, C.segundoApellido \
                    FROM proyectos P inner join estadosProyectos E on P.idEstadoProyecto = E.id \
                    inner join colaboradores C on P.idPersonaResponsable = C.id \
                    WHERE P.id = ?;"
    const [rows] = await pool.query(query, [id])
    return rows
}

export async function obtenerIdProyectoByNombre(nombreProyecto) {
    const query = "SELECT id FROM proyectos WHERE nombreProyecto = ?;"
    const [rows] = await pool.query(query, [nombreProyecto])
    return rows
}
// estados de proyectos
export async function consultarEstadosProyectos() {
    try {
        const query = "SELECT id, nombreEstado FROM estadosProyectos;";
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Error al consultar estados de colaboradores:", error);
        throw error; // Propagar el error para que pueda ser manejado en otro lugar si es necesario
    }
}

// **************** Colaboradores ****************
export async function consultarColaboradores() {
    const query = "SELECT C.id, C.nombre, C.primerApellido, C.segundoApellido, C.cedula, C.nombreUsuario, \
                    C.idEstadoColaborador,E.nombreEstado, C.idDepartamento, D.nombreDepartamento, C.administrador, C.telefono \
                    FROM colaboradores C inner join estadosColaboradores E on C.idEstadoColaborador = E.id \
                    inner join departamentos D on C.idDepartamento = D.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarColaboradorById(id) {
    const query = "SELECT C.id, C.correo, C.nombre, C.primerApellido, C.segundoApellido, C.cedula, C.nombreUsuario, \
                    C.idEstadoColaborador, E.nombreEstado, C.idDepartamento, D.nombreDepartamento, C.administrador, C.telefono \
                    FROM colaboradores C inner join estadosColaboradores E on C.idEstadoColaborador = E.id \
                    inner join departamentos D on C.idDepartamento = D.id \
                    WHERE C.id = ?;"
    const [rows] = await pool.query(query, [id])
    return rows
}

export async function obtenerIdColaboradorByNombreUsuario(nombreUsuario) {
    const query = "SELECT id FROM colaboradores WHERE nombreUsuario = ?;"
    const [rows] = await pool.query(query, [nombreUsuario])
    return rows
}

export async function obtenerIdColaboradorByCorreo(correo){
    const query = "SELECT id FROM colaboradores WHERE correo = ?;"
    const [rows] = await pool.query(query, [correo])
    return rows
}

export async function obtenerIdColaboradorByCedula(cedula){
    const query = "SELECT id FROM colaboradores WHERE cedula = ?;"
    const [rows] = await pool.query(query, [cedula])
    return rows
}

export async function obtenerIdColaboradorByNombreCompleto(nombre, primerApellido, segundoApellido){
    const query = "SELECT id FROM colaboradores WHERE nombre = ? AND primerApellido = ? AND segundoApellido = ?;"
    const [rows] = await pool.query(query, [nombre, primerApellido, segundoApellido])
    return rows
}

// **************** Departamentos ****************
export async function consultarDepartamentos() {
    const query = "SELECT id, nombreDepartamento FROM departamentos;"
    const [rows] = await pool.query(query)
    return rows
}

export async function obtenerIdDepartamentoByNombre(nombreDepartamento) {
    const query = "SELECT id FROM departamentos WHERE nombreDepartamento = ?;"
    const [rows] = await pool.query(query, [nombreDepartamento])
    return rows
}
// **************** Estados Colaboradores ****************
export async function consultarEstadosColaboradores() {
    try {
        const query = "SELECT id, nombreEstado FROM estadosColaboradores;";
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Error al consultar estados de colaboradores:", error);
        throw error; // Propagar el error para que pueda ser manejado en otro lugar si es necesario
    }
}

export async function obtenerIdEstadosColaboradoresByNombre(nombreEstado) {
    const query = "SELECT id FROM estadosColaboradores WHERE nombreEstado = ?;"
    const [rows] = await pool.query(query, [nombreEstado])
    return rows
}

// **************** Tareas ****************
export async function consultarTareas() {
    const query = "SELECT T.id, T.nombreTarea, T.idProyecto, P.nombreProyecto, T.idEstadoTarea, E.nombreEstado, \
                    T.idColaborador, C.nombre, C.primerApellido, C.segundoApellido, T.storyPoints, T.recursosEconomicos, \
                    T.tiempoEstimado, T.descripcion \
                    FROM tareas T inner join proyectos P on T.idProyecto = P.id \
                    inner join colaboradores C on T.idColaborador = C.id \
                    inner join estadosTareas E on T.idEstadoTarea = E.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarTareaById(id) {
    const query = "SELECT T.id, T.nombreTarea, T.idProyecto, P.nombreProyecto, T.idEstadoTarea, E.nombreEstado, \
                    T.idColaborador, C.nombre, C.primerApellido, C.segundoApellido, T.storyPoints, T.recursosEconomicos \
                    T.tiempoEstimado, T.descripcion \
                    FROM tareas T inner join proyectos P on T.idProyecto = P.id \
                    inner join colaboradores C on T.idColaborador = C.id \
                    inner join estadosTareas E on T.idEstadoTarea = E.id \
                    WHERE T.id = ?;"
    const [rows] = await pool.query(query, [id])
    return rows
}

export async function consultarTareasByIdProyecto(idProyecto) {
    const query = "SELECT T.id, T.nombreTarea, T.idProyecto, P.nombreProyecto, T.idEstadoTarea, E.nombreEstado, \
                    T.idColaborador, C.nombre, C.primerApellido, C.segundoApellido, T.storyPoints, T.recursosEconomicos \
                    T.tiempoEstimado, T.descripcion \
                    FROM tareas T inner join proyectos P on T.idProyecto = P.id \
                    inner join colaboradores C on T.idColaborador = C.id \
                    inner join estadosTareas E on T.idEstadoTarea = E.id \
                    WHERE T.idProyecto = ?;"
    const [rows] = await pool.query(query, [idProyecto])
    return rows
}

// **************** Publicaciones ****************

export async function consultarPublicaciones() {
    const query = "SELECT PU.id, PU.idProyecto, PR.nombreProyecto, PU.idColaborador, \
                    CO.nombre, CO.primerApellido, CO.segundoApellido, PU.fechaPublicacion, PU.contenido \
                    FROM publicaciones PU \
                    inner join proyectos PR on PU.idProyecto = PR.id \
                    inner join colaboradores CO on PU.idColaborador = CO.id"
    const [rows] = await pool.query(query)
    return rows
}

// **************** Comentarios ****************

export async function consultarComentariosByIdPublicacion(id) {
    const query = "SELECT COM.id, COM.idPublicacion, PU.idColaborador, \
                    COM.idColaborador, \
                    COL.nombre, COL.primerApellido, COL.segundoApellido, \
                    COM.fechaComentario, COM.contenido \
                    FROM comentarios COM \
                    inner join publicaciones PU on COM.idPublicacion = PU.id \
                    inner join colaboradores COL on COM.idColaborador = COL.id \
                    WHERE COM.idPublicacion = ?"
    const [rows] = await pool.query(query, [id])
    return rows
}

// **************** Informe de seguimiento ****************

export async function consultarInformeHorasPromedioProyectos() {
    const query = "SELECT P.nombreProyecto, AVG(T.tiempoEstimado) as tiempoEstimado \
                    FROM proyectos P \
                    inner join tareas T on P.id = T.idProyecto \
                    group by P.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarInformeHorasPromedioTodosProyectos() {
    const query = "SELECT AVG(T.tiempoEstimado) as tiempoEstimado \
                    FROM tareas T;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarInformeGastoPromedioProyectos() {
    const query = "SELECT P.nombreProyecto, AVG(T.recursosEconomicos) as recursosEconomicos \
                    FROM proyectos P \
                    inner join tareas T on P.id = T.idProyecto \
                    group by P.id;"
    const [rows] = await pool.query(query)
    return rows
}

export async function consultarInformeGastoPromedioTodosProyectos() {
    const query = "SELECT AVG(T.recursosEconomicos) as recursosEconomicos \
                    FROM tareas T;"
    const [rows] = await pool.query(query)
    return rows
}

// ---------------------------------- Inserciones ----------------------------------

// **************** Colaboradores ****************
export async function insertarColaborador(correo, contrasena, nombre, primerApellido, segundoApellido, cedula,
    nombreUsuario, idEstadoColaborador, idDepartamento, administrador, telefono) {
    const query = "INSERT INTO colaboradores (correo, contrasena, nombre, primerApellido, segundoApellido, cedula, nombreUsuario, idEstadoColaborador, idDepartamento, administrador, telefono)\
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    const [rows] = await pool.query(query, [correo, contrasena, nombre, primerApellido, segundoApellido, cedula, nombreUsuario, idEstadoColaborador, idDepartamento, administrador, telefono])
    return consultarColaboradorById(rows.insertId)
}

// **************** Proyectos ****************
export async function insertarProyecto(nombreProyecto, recursosNecesarios, presupuesto, descripcion,
     idEstadoProyecto, fechaInicio, historialCambios, idPersonaResponsable, fechaFin = null) {
    
    if (fechaFin === null) {
        const query = "INSERT INTO proyectos (nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, \
             fechaInicio, historialCambios, idPersonaResponsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        const [rows] = await pool.query(query, [nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, fechaInicio, historialCambios, idPersonaResponsable])
        return consultarProyectoById(rows.insertId)
    } else {
        const query = "INSERT INTO proyectos (nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, \
             fechaInicio, fechaFin, historialCambios, idPersonaResponsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        const [rows] = await pool.query(query, [nombreProyecto, recursosNecesarios, presupuesto, descripcion, idEstadoProyecto, fechaInicio, fechaFin, historialCambios, idPersonaResponsable])
        return consultarProyectoById(rows.insertId)
    }
}

// Esta función asigna un proyecto a un colaborador por nombre de usuario
export async function insertarIdProyectoColaborador(nombreUsuario, idProyecto) {
    const query = "UPDATE colaboradores SET idProyecto = ? WHERE nombreUsuario = ?";
    const [rows] = await pool.query(query, [idProyecto, nombreUsuario]); 
    return rows.affectedRows > 0; // Retorna true si se actualizó al menos una fila
}

// **************** Tareas ****************
export async function insertarTarea(nombreTarea, idProyecto, idEstadoTarea, idColaborador, storyPoints, recursosEconomicos, tiempoEstimado, descripcion) {
    const query = "INSERT INTO tareas (nombreTarea, idProyecto, idEstadoTarea, idColaborador, storyPoints, recursosEconomicos, tiempoEstimado, descripcion) \
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    const [rows] = await pool.query(query, [nombreTarea, idProyecto, idEstadoTarea, idColaborador, storyPoints, recursosEconomicos, tiempoEstimado, descripcion])
    return consultarTareaById(rows.insertId)
}

// **************** Publicaciones ****************

export async function insertarPublicacion(idProyecto, idColaborador, fechaPublicacion, contenido) {
    const query = "INSERT INTO publicaciones (idProyecto, idColaborador, fechaPublicacion, contenido) \
                    VALUES (?, ?, ?, ?)"
    const [rows] = await pool.query(query, [idProyecto, idColaborador, fechaPublicacion, contenido])
    return rows.affectedRows > 0
}

// **************** Comentarios ****************

export async function insertarComentario(idPublicacion, idColaborador, fechaComentario, contenido) {
    const query = "INSERT INTO comentarios (idPublicacion, idColaborador, fechaComentario, contenido) \
                    VALUES (?, ?, ?, ?)"
    const [rows] = await pool.query(query, [idPublicacion, idColaborador, fechaComentario, contenido])
    return rows.affectedRows > 0
}

// ---------------------------------- Inicio de Sesión ----------------------------------
// Función para validar el inicio de sesión y obtener los datos del usuario
export async function validarInicioSesion(nombreUsuario, contrasena) {
    const query = "SELECT id, administrador FROM colaboradores WHERE nombreUsuario = ? AND contrasena = ?;";
    const [rows] = await pool.query(query, [nombreUsuario, contrasena]);
    return rows.length > 0 ? rows[0] : null; // Devuelve los datos del primer usuario encontrado o null si no se encontró ningún usuario
}

// ---------------------------------- Actualizaciones ----------------------------------
// **************** Colaboradores ****************
export async function modificarCorreoPorNombreUsuario(nombreUsuario, nuevoCorreo) {
    try {
        // Realizar la consulta para actualizar el correo electrónico basándose en el nombre de usuario
        const query = "UPDATE colaboradores SET correo = ? WHERE nombreUsuario = ?";
        await pool.query(query, [nuevoCorreo, nombreUsuario]);

        // Verificar si se realizó la actualización correctamente
        const [updatedRows] = await pool.query("SELECT * FROM colaboradores WHERE nombreUsuario = ?", [nombreUsuario]);
        if (updatedRows.length > 0) {
            // Se encontró el colaborador y se actualizó el correo electrónico correctamente
            return { success: true, message: "Correo electrónico actualizado correctamente." };
        } else {
            // No se encontró el colaborador con el nombre de usuario proporcionado
            return { success: false, message: "No se encontró el colaborador con el nombre de usuario especificado." };
        }
    } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema durante la consulta
        console.error("Error al actualizar el correo electrónico:", error);
        return { success: false, message: "Ocurrió un error al actualizar el correo electrónico." };
    }
}

export async function modificarEstadoPorNombreUsuario(nombreUsuario, nuevoEstado) {
    try {
        // Realizar la consulta para actualizar el correo electrónico basándose en el nombre de usuario
        const query = "UPDATE colaboradores SET idEstadoColaborador = ? WHERE nombreUsuario = ?";
        await pool.query(query, [nuevoEstado, nombreUsuario]);

        // Verificar si se realizó la actualización correctamente
        const [updatedRows] = await pool.query("SELECT * FROM colaboradores WHERE nombreUsuario = ?", [nombreUsuario]);
        if (updatedRows.length > 0) {
            // Se encontró el colaborador y se actualizó el correo electrónico correctamente
            return { success: true, message: "Estado actualizado correctamente." };
        } else {
            // No se encontró el colaborador con el nombre de usuario proporcionado
            return { success: false, message: "No se encontró el colaborador con el nombre de usuario especificado." };
        }
    } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema durante la consulta
        console.error("Error al actualizar el Estado:", error);
        return { success: false, message: "Ocurrió un error al actualizar el Estado." };
    }
}

export async function modificarDepartamentoPorNombreUsuario(nombreUsuario, nuevoDepartamento) {
    try {
        // Realizar la consulta para actualizar el correo electrónico basándose en el nombre de usuario
        const query = "UPDATE colaboradores SET idDepartamento = ? WHERE nombreUsuario = ?";
        await pool.query(query, [nuevoDepartamento, nombreUsuario]);

        // Verificar si se realizó la actualización correctamente
        const [updatedRows] = await pool.query("SELECT * FROM colaboradores WHERE nombreUsuario = ?", [nombreUsuario]);
        if (updatedRows.length > 0) {
            // Se encontró el colaborador y se actualizó el correo electrónico correctamente
            return { success: true, message: "Departamento actualizado correctamente." };
        } else {
            // No se encontró el colaborador con el nombre de usuario proporcionado
            return { success: false, message: "No se encontró el colaborador con el nombre de usuario especificado." };
        }
    } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema durante la consulta
        console.error("Error al actualizar el Departamento:", error);
        return { success: false, message: "Ocurrió un error al actualizar el Departamento." };
    }
}

export async function modificarTelefonoPorNombreUsuario(nombreUsuario, nuevoTelefono) {
    try {
        // Realizar la consulta para actualizar el correo electrónico basándose en el nombre de usuario
        const query = "UPDATE colaboradores SET telefono = ? WHERE nombreUsuario = ?";
        await pool.query(query, [nuevoTelefono, nombreUsuario]);

        // Verificar si se realizó la actualización correctamente
        const [updatedRows] = await pool.query("SELECT * FROM colaboradores WHERE nombreUsuario = ?", [nombreUsuario]);
        if (updatedRows.length > 0) {
            // Se encontró el colaborador y se actualizó el correo electrónico correctamente
            return { success: true, message: "Teléfono actualizado correctamente." };
        } else {
            // No se encontró el colaborador con el nombre de usuario proporcionado
            return { success: false, message: "No se encontró el colaborador con el nombre de usuario especificado." };
        }
    } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema durante la consulta
        console.error("Error al actualizar el teléfono:", error);
        return { success: false, message: "Ocurrió un error al actualizar el teléfono." };
    }
}

// **************** Tareas ****************

export async function modificarEstadoTareaPorId(idTarea, nuevoEstado) {
    try {
        
        // Verificar si el id de la tarea existe
        const [updatedRows] = await pool.query("SELECT id FROM tareas WHERE id = ?", [idTarea]);
        if (updatedRows.length > 0) {
            // Se encontró la tarea y se actualizó el estado correctamente
            // Realizar la consulta para actualizar el estado de la tarea basándose en su ID
            const query = "UPDATE tareas SET idEstadoTarea = ? WHERE id = ?";
            await pool.query(query, [nuevoEstado, idTarea]);
            return { success: true, message: "Estado de la tarea actualizado correctamente." };
        } else {
            // No se encontró la tarea con el ID proporcionado
            return { success: false, message: "No se encontró la tarea con el ID especificado." };
        }
    } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema durante la consulta
        console.error("Error al actualizar el estado de la tarea:", error);
        return { success: false, message: "Ocurrió un error al actualizar el estado de la tarea." };
    }
}

// ---------------------------------- Eliminaciones ----------------------------------

// **************** Colaboradores ****************

export async function eliminarColaboradorDeProyecto(nombreUsuario) {
    try {
        // Realizar la consulta para actualizar el correo electrónico basándose en el nombre de usuario
        const query = "UPDATE colaboradores SET idProyecto = NULL WHERE nombreUsuario = ?";
        await pool.query(query, [nombreUsuario]);

        // Verificar si se realizó la actualización correctamente
        const [updatedRows] = await pool.query("SELECT * FROM colaboradores WHERE nombreUsuario = ?", [nombreUsuario]);
        if (updatedRows.length > 0) {
            // Se encontró el colaborador y se actualizó el correo electrónico correctamente
            return { success: true, message: "Colaborador eliminado del proyecto correctamente." };
        } else {
            // No se encontró el colaborador con el nombre de usuario proporcionado
            return { success: false, message: "No se encontró el colaborador con el nombre de usuario especificado." };
        }
    } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema durante la consulta
        console.error("Error al eliminar colaborador del proyecto:", error);
        return { success: false, message: "Ocurrió un error al eliminar colaborador del proyecto." };
    }
}

// **************** Tareas ****************

export async function eliminarTareaPorId(idTarea) {
    try {
        
        // Verificar si el id de la tarea existe
        const [deletedRows] = await pool.query("SELECT id FROM tareas WHERE id = ?", [idTarea]);
        if (deletedRows.length > 0) {
            // Realizar la consulta para eliminar la tarea basándose en su ID
            const query = "DELETE FROM tareas WHERE id = ?";
            await pool.query(query, [idTarea]);
            // La tarea se eliminó correctamente
            return { success: true, message: "Tarea eliminada correctamente." };
        } else {
            // La tarea no se eliminó correctamente
            return { success: false, message: "No se pudo eliminar la tarea." };
        }
    } catch (error) {
        // Manejo de errores en caso de que ocurra algún problema durante la consulta
        console.error("Error al eliminar la tarea:", error);
        return { success: false, message: "Ocurrió un error al eliminar la tarea." };
    }
}