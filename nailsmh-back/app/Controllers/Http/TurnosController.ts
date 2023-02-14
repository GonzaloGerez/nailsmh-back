import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno'

export default class TurnosController {

    public async getAllTurnos(){
        return await 
        Turno.query()
        .preload('cliente')
    }

    public async saveTurno(ctx: HttpContextContract){
        const turno = ctx.request.body()
        try {
            const savedTurno = Turno.create(turno)
            return {
                message: `Turno creado:  ${(await savedTurno).$isPersisted}`,
                turno: await savedTurno
            }
        } catch (error) {
            return {
                message: 'El turno no se ha podido crear',
                error: error
            }
        }
    }

    public async updateTurno(ctx: HttpContextContract){
        let body = ctx.request.body()
        let turno: Turno = await Turno.findOrFail(body.id_turno)
        turno.hora = body.hora
        turno.estado = body.estado
        try {
            const updatedTurno = turno.save()
            return {
                message: `Turno Actualizado : ${(await updatedTurno).$isPersisted}`,
                updatedTurno: await updatedTurno
            }
        } catch (error) {
            return {
                message: 'El turno no se ha podido actualizar',
                error: error
            }
        }
    }

}
