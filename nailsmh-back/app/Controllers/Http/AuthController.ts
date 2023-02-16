import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import Usuario from 'App/Models/Usuario'

export default class AuthController {


    public async registerUser({request, response}: HttpContextContract ){
        // Bloque que recibe los datos de la request.
        const {email, password} = request.only(['email', 'password'])
        const {nombre_completo, telefono} = request.only(['nombre_completo', 'telefono'])
        //Bloque que inserta los datos.
        try {
            const usuario = await Usuario.create({
                email,
                password: password
            })
            if (usuario.$isPersisted) {
                const client = Cliente.create({
                    nombre_completo,
                    telefono,
                    user_id : usuario.id
                })
                return response.status(201).json({
                    message: 'El cliente ha sido registrado correctamente',
                    data: (await client)
                })
            }
        } catch (error) {
            return response.status(400).json({
                message: 'No se ha podido crear el usuario'
            })
        }
    }

    public async Login({auth, request, response}: HttpContextContract){
        const {email, password} = request.only(['email', 'password'])
        let user;
        try {
            user = await Usuario.findByOrFail('email', email)
        } catch (error) {
            return response.unauthorized({
                message: 'Usuario invalido'
            })
        }

        if (!(await Hash.verify(user.password, password))) {
            return response.unauthorized({
                message:'Usuario invalido',
                password,
                user: user.password
            })
        }

        const token = await auth.use('api').generate(user, {
            expiresIn: '1 hours'
        })

        return token.toJSON()
    }
}
