import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa el middleware cors
import {PORT} from "./config.js"
import { 
    consultarProyectos, consultarProyectoById, obtenerIdProyectoByNombre,
    consultarColaboradores, consultarColaboradorById, obtenerIdColaboradorByNombreUsuario, obtenerIdColaboradorByCorreo, obtenerIdColaboradorByCedula, obtenerIdColaboradorByNombreCompleto,
    consultarDepartamentos, obtenerIdDepartamentoByNombre,
    consultarTareas, consultarTareaById, consultarTareasByIdProyecto, 
    consultarEstadosProyectos,
    consultarEstadosColaboradores,
    consultarInformeHorasPromedioProyectos,
    consultarInformeHorasPromedioTodosProyectos,
    consultarInformeGastoPromedioProyectos,
    consultarInformeGastoPromedioTodosProyectos,

    insertarColaborador,
    insertarProyecto,
    insertarTarea,
    insertarIdProyectoColaborador,
    validarInicioSesion,

    modificarCorreoPorNombreUsuario,
    modificarEstadoPorNombreUsuario,
    modificarDepartamentoPorNombreUsuario,
    modificarTelefonoPorNombreUsuario,
    modificarEstadoTareaPorId,

    eliminarColaboradorDeProyecto,
    eliminarTareaPorId
 } from './database.js'

 const app = express();
 // Configura body-parser como middleware
 app.use(bodyParser.json());
 
 // Habilita CORS para todas las rutas
 app.use(cors());
// ---------------------------------- Consultas ----------------------------------

// **************** Proyectos ****************
app.get('/consultarProyectos', async (req, res) => {
    const proyectos = await consultarProyectos()
    res.send(proyectos)
})

app.get('/consultarProyectoById/:id', async (req, res) => {
    const idProyecto = req.params.id
    const proyecto = await consultarProyectoById(idProyecto)
    res.send(proyecto)
})

app.get('/obtenerIdProyectoByNombre/:nombreProyecto', async (req, res) => {
    const nombreProyecto = req.params.nombreProyecto
    const idProyecto = await obtenerIdProyectoByNombre(nombreProyecto)
    res.send(idProyecto)
})

app.get('/consultarEstadosProyectos', async (req, res) => {
    const estados = await consultarEstadosProyectos()
    res.send(estados)
})

// **************** Colaboradores ****************
app.get('/consultarColaboradores', async (req, res) => {
    const colaboradores = await consultarColaboradores()
    res.send(colaboradores)
})

app.get('/consultarColaboradorById/:id', async (req, res) => {
    const idColaborador = req.params.id
    const colaborador = await consultarColaboradorById(idColaborador)
    res.send(colaborador)
})

app.get('/obtenerIdColaboradorByNombreUsuario/:nombreUsuario', async (req, res) => {
    const nombreUsuario = req.params.nombreUsuario
    const idColaborador = await obtenerIdColaboradorByNombreUsuario(nombreUsuario)
    res.send(idColaborador)
})

app.get('/obtenerIdColaboradorByCorreo/:correo', async (req, res) => {
    const correo = req.params.correo
    const idColaborador = await obtenerIdColaboradorByCorreo(correo)
    res.send(idColaborador)
})

app.get('/obtenerIdColaboradorByCedula/:cedula', async (req, res) => {
    const cedula = req.params.cedula
    const idColaborador = await obtenerIdColaboradorByCedula(cedula)
    res.send(idColaborador)
})

app.get('/obtenerIdColaboradorByNombreCompleto/:nombreCompleto', async (req, res) => {
    const nombreCompleto = req.params.nombreCompleto
    const idColaborador = await obtenerIdColaboradorByNombreCompleto(nombreCompleto)
    res.send(idColaborador)
})

// **************** Departamentos ****************
app.get('/consultarDepartamentos', async (req, res) => {
    const departamentos = await consultarDepartamentos()
    res.send(departamentos)
})

app.get('/obtenerIdDepartamentoByNombre/:nombreDepartamento', async (req, res) => {
    const nombreDepartamento = req.params.nombreDepartamento
    const idDepartamento = await obtenerIdDepartamentoByNombre(nombreDepartamento)
    res.send(idDepartamento)
})

// **************** Estados Colaboradores ****************
app.get('/consultarEstadosColaboradores', async (req, res) => {
    const estados = await consultarEstadosColaboradores()
    res.send(estados)
})

app.get('/obtenerIdEstadosColaboradoresByNombre/:nombreEstado', async (req, res) => {
    const nombreEstado = req.params.nombreEstado
    const idEstado = await obtenerIdEstadosColaboradoresByNombre(nombreEstado)
    res.send(idEstado)
})

// **************** Tareas ****************
app.get('/consultarTareas', async (req, res) => {
    const tareas = await consultarTareas()
    res.send(tareas)
})

app.get('/consultarTareaById/:id', async (req, res) => {
    const idTarea = req.params.id
    const tarea = await consultarTareaById(idTarea)
    res.send(tarea)
})

app.get('/consultarTareasByIdProyecto/:id', async (req, res) => {
    const idProyecto = req.params.id
    const tareas = await consultarTareasByIdProyecto(idProyecto)
    res.send(tareas)
})

// **************** Publicaciones ****************

app.get('/consultarPublicaciones', async (req, res) => {
    const publicaciones = await consultarPublicaciones()
    res.send(publicaciones)
})

// **************** Comentarios ****************

app.get('/consultarComentariosByIdPublicacion', async (req, res) => {
    const idPublicacion = req.params.idPublicacion
    const comentarios = await consultarComentariosByIdPublicacion(idPublicacion)
    res.send(comentarios)
})

// **************** Informe de seguimiento ****************

app.get('/consultarInformeHorasPromedioProyectos', async (req, res) => {
    const informe = await consultarInformeHorasPromedioProyectos()
    res.send(informe)
})

app.get('/consultarInformeHorasPromedioTodosProyectos', async (req, res) => {
    const informe = await consultarInformeHorasPromedioTodosProyectos()
    res.send(informe)
})

app.get('/consultarInformeGastoPromedioProyectos', async (req, res) => {
    const informe = await consultarInformeGastoPromedioProyectos()
    res.send(informe)
})

app.get('/consultarInformeGastoPromedioTodosProyectos', async (req, res) => {
    const informe = await consultarInformeGastoPromedioTodosProyectos()
    res.send(informe)
})

// ---------------------------------- Inserción ----------------------------------

// **************** Proyectos ****************
app.post('/insertarProyecto', async (req, res) => {
    const bodyJson = req.body
    const result = await insertarProyecto(bodyJson['nombreProyecto'], bodyJson['recursosNecesarios'], bodyJson['presupuesto'],
        bodyJson['descripcion'], bodyJson['idEstadoProyecto'], bodyJson['fechaInicio'], bodyJson['historialCambios'],
        bodyJson['idPersonaResponsable'], bodyJson['ffechaFin'])
    res.send(result)
})
// Ruta para asignar un proyecto a un colaborador por nombre de usuario
app.put('/asignarProyectoAColaborador/:nombreUsuario/:idProyecto', async (req, res) => {
    const { nombreUsuario, idProyecto } = req.params;
    try {
        const result = await insertarIdProyectoColaborador(nombreUsuario, idProyecto);
        res.json({ success: true, message: "Proyecto asignado correctamente al colaborador." });
    } catch (error) {
        console.error("Error al asignar proyecto al colaborador:", error);
        res.status(500).json({ success: false, message: "Ocurrió un error al asignar proyecto al colaborador." });
    }
});
// **************** Colaboradores ****************
app.post('/insertarColaborador', async (req, res) => {
    const bodyJson = req.body
    const result = await insertarColaborador(bodyJson['correo'], bodyJson['contrasena'], bodyJson['nombre'], bodyJson['primerApellido'],
        bodyJson['segundoApellido'], bodyJson['cedula'], bodyJson['nombreUsuario'], bodyJson['idEstadoColaborador'],
        bodyJson['idDepartamento'], bodyJson['administrador'], bodyJson['telefono'])
    res.send(result)
})

// **************** Tareas ****************
app.post('/insertarTarea', async (req, res) => {
    const bodyJson = req.body
    const result = await insertarTarea(bodyJson['nombreTarea'], bodyJson['idProyecto'], bodyJson['idEstadoTarea'],
        bodyJson['idColaborador'], bodyJson['storyPoints'], bodyJson['recursosEconomicos'], bodyJson['tiempoEstimado'], bodyJson['descripcion'])
    res.send(result)
})

// **************** Inicio de sesión ****************
// Ruta para manejar la solicitud de inicio de sesión
app.post('/login', async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;

    try {
        const userData = await validarInicioSesion(nombreUsuario, contrasena);
        if (userData) {
            res.json(userData); // Devuelve los datos del usuario
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// **************** Publicaciones ****************

app.post('/insertarPublicacion', async (req, res) => {
    const bodyJson = req.body
    const result = await insertarPublicacion(bodyJson['idProyecto'], bodyJson['fechaPublicacion'], bodyJson['contenido'])
    res.send(result)
})

// **************** Comentarios ****************

app.post('/insertarComentario', async (req, res) => {
    const bodyJson = req.body
    const result = await insertarComentario(bodyJson['idPublicacion'], bodyJson['idColaborador'], bodyJson['fechaComentario'], bodyJson['contenido'])
    res.send(result)
})


// ---------------------------------- Actualizaciones ----------------------------------
// **************** Colaboradores ****************
// **************** Modificar Correo por Nombre de Usuario ****************
app.put('/modificarCorreoPorNombreUsuario', async (req, res) => {
    const { nombreUsuario, nuevoCorreo } = req.body;
    if (!nombreUsuario || !nuevoCorreo) {
        return res.status(400).json({ success: false, message: "Debe proporcionar el nombre de usuario y el nuevo correo electrónico." });
    }

    try {
        const resultado = await modificarCorreoPorNombreUsuario(nombreUsuario, nuevoCorreo);
        res.json(resultado);
    } catch (error) {
        console.error("Error al modificar el correo electrónico por nombre de usuario:", error);
        res.status(500).json({ success: false, message: "Ocurrió un error al modificar el correo electrónico." });
    }
})

// **************** Modificar Estado por Nombre de Usuario ****************
app.put('/modificarEstadoPorNombreUsuario', async (req, res) => {
    const { nombreUsuario, nuevoEstado } = req.body;
    if (!nombreUsuario || !nuevoEstado) {
        return res.status(400).json({ success: false, message: "Debe proporcionar el nombre de usuario y el nuevo estado." });
    }

    try {
        const resultado = await modificarEstadoPorNombreUsuario(nombreUsuario, nuevoEstado);
        res.json(resultado);
    } catch (error) {
        console.error("Error al modificar el estado por nombre de usuario:", error);
        res.status(500).json({ success: false, message: "Ocurrió un error al modificar el estado." });
    }
})

// **************** Modificar Departamento por Nombre de Usuario ****************
app.put('/modificarDepartamentoPorNombreUsuario', async (req, res) => {
    const { nombreUsuario, nuevoDepartamento } = req.body;
    if (!nombreUsuario || !nuevoDepartamento) {
        return res.status(400).json({ success: false, message: "Debe proporcionar el nombre de usuario y el nuevo departamento." });
    }

    try {
        const resultado = await modificarDepartamentoPorNombreUsuario(nombreUsuario, nuevoDepartamento);
        res.json(resultado);
    } catch (error) {
        console.error("Error al modificar el departamento por nombre de usuario:", error);
        res.status(500).json({ success: false, message: "Ocurrió un error al modificar el departamento." });
    }
})

// **************** Modificar Telefono por Nombre de Usuario ****************

app.put('/modificarTelefonoPorNombreUsuario', async (req, res) => {
    const { nombreUsuario, nuevoTelefono } = req.body;
    if (!nombreUsuario || !nuevoTelefono) {
        return res.status(400).json({ success: false, message: "Debe proporcionar el nombre de usuario y el nuevo telefono." });
    }

    try {
        const resultado = await modificarTelefonoPorNombreUsuario(nombreUsuario, nuevoTelefono);
        res.json(resultado);
    } catch (error) {
        console.error("Error al modificar el telefono por nombre de usuario:", error);
        res.status(500).json({ success: false, message: "Ocurrió un error al modificar el telefono." });
    }
})

// **************** Modificar Estado Tarea por Id ****************

app.put('/modificarEstadoTareaPorId/:id/:nuevoEstado', async (req, res) => {
    const { id, nuevoEstado } = req.params;
    try {
        const result = await modificarEstadoTareaPorId(id, nuevoEstado);
        return res.json(result);
    } catch (error) {
        console.error("Error al modificar el estado de la tarea:", error);
        res.status(500).json({ success: false, message: "Ocurrió un error al modificar el estado de la tarea." });
    }
})


// ----------------------------- Eliminaciones -----------------------------

// **************** Eliminar colaborador de proyecto ****************

app.delete('/eliminarColaboradorDeProyecto/:nombreUsuario', async (req, res) => {
    const nombreUsuario = req.params.nombreUsuario;
    try {
        const result = await eliminarColaboradorDeProyecto(nombreUsuario);
        return res.json(result);
    } catch (error) {
        console.error("Error al eliminar colaborador del proyecto:", error);
        res.status(500).json({ success: false, message: "Ocurrió un error al eliminar colaborador del proyecto." });
    }
})

// **************** Eliminar tarea por id ****************

app.delete('/eliminarTareaPorId/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await eliminarTareaPorId(id);
        return res.json(result);
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        res.status(500).json({ success: false, message: "Ocurrió un error al eliminar la tarea." });
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(PORT, () => {
    console.log('Example app listening on port 8080!')
})
