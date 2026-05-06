/**
 * Controlador de Usuarios
 * Maneja las peticiones HTTP relacionadas con usuarios
 */

const { sendSuccess, sendError } = require('../handlers/responseHandler');
const usuarioService = require('../services/usuarioService');
const { createUsuarioSchema, updateUsuarioSchema } = require('../validations/usuarioValidation');

/**
 * POST /usuarios
 * Crea un nuevo usuario
 */
const crearUsuario = (req, res) => {
  try {
    // Validamos los datos de entrada
    const { error, value } = createUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(
        res,
        'Error en validación de datos',
        400,
        error.details.map(err => err.message)
      );
    }

    // Llamamos al servicio para crear el usuario
    const usuarioCreado = usuarioService.crearUsuario(value);

    // Respondemos con éxito
    return sendSuccess(
      res,
      usuarioCreado,
      'Usuario creado exitosamente',
      201
    );
  } catch (error) {
    return sendError(res, 'Error al crear usuario', 500);
  }
};

/**
 * GET /usuarios
 * Obtiene todos los usuarios
 * 
 * TODO: Completa esta función
 */
const obtenerTodosLosUsuarios = (req, res) => {
  try {
    // Ayudita: 
    // 1. Llama a usuarioService.obtenerTodosLosUsuarios()
     const usuarios = usuarioService.obtenerTodosLosUsuarios();//solo tenia que llamar la funcion 
    // 2. Responde con sendSuccess(res, usuarios, 'Usuarios obtenidos')
     return sendSuccess(res, usuarios, 'Usuarios obtenidos');// solo respondi co  lo que me dijo el profe

  } catch (error) {
    return sendError(res, 'Error al moneto de obtener usuarios', 500);
  }
};

/**1
 * GET /usuarios/:id
 * Obtiene un usuario específico por ID
 * 
 * TODO: Completa esta función
 */
const obtenerUsuarioPorId =(req, res) =>{
  try{
    // Ayudita del profe(ayudantia):
    // 1. Obtén el ID de req.params.                                                                                    
     const{id}=req.params;                                      /*extrae el id de URL(desde rep.params) para poder usarlo en la funcion*/
    // 2. Llama a usuarioService.obtenerUsuarioPorId(id)
     const usuario=usuarioService.obtenerUsuarioPorId(id);           /*lame a la funcion pa poder buscar el  usaurio por el id*/
    // 3. Si el usuario NO existe, responde con sendError(res, 'Usuario no encontrado', 404)
     if(!usuario){      /* condicion solo se entra si el usuario no lo encuantra*/
      return sendError(res, 'Usuario no encontrado', 404);              /*lo que pidio el profe esto retorna si no encunetra el usuario*/
    }
    // 4. Si el usuario EXISTE, responde con sendSuccess(res, usuario, 'Usuario encontrado')
      return sendSuccess(res, usuario, 'El usuario se econtro');        /*returna esto si el usario  lo encuentra*/


    } catch (error) {      /*ve si ahy algo falla entra en carch y retorna lo de bajo */
    return sendError(res, 'Error al obtener usuario', 500);
    }
    };


/**
 * PATCH /usuarios/:id
 * Actualiza un usuario existente
 * 
 * TODO: Completa esta función
 */
const actualizarUsuario = (req, res) => {
  try {
    // Ayudita:
    // 1. Valida req.body con updateUsuarioSchema.validate()
      const{error, value}=updateUsuarioSchema.validate(req.body);    /*updateUsuarioSchema esto define cómo deben ser los datos*/ 
      /*validate(req.body) revisa si lo que envio el usuario cumple las reglas*/
    if(error){ /* si entra aqui significa que los datos estan malos*/
      return sendError(res, 'no se pudieron validar los datos', 400, error.details.map(err => err.message)
      /*error.details.map(err => err.message: de los errores solo extrae los mensajes*/
      );
    }
    // 2. Obtén el ID de req.params.id
    const{id}=req.params;
    // 3. Llama a usuarioService.actualizarUsuario(id, value)
    const usuarioActualizado = usuarioService.actualizarUsuario(id, value); /* llame a la funcion */
    // 4. Si el usuario NO existe, responde con sendError(res, 'Usuario no encontrado', 404)
     if(!usuarioActualizado){
      return sendError(res, 'Usuario no encontrado', 404);
    }
    // 5. Si el usuario EXISTE, responde con sendSuccess(res, usuarioActualizado, 'Usuario actualizado')
    return sendSuccess(res, usuarioActualizado, 'Usuario actualizado');

  } catch (error) {
    return sendError(res, 'Error no se pudo actualizar el usuario', 500);
  }
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario
};
