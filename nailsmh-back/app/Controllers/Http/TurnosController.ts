import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Turno from 'App/Models/Turno'

export default class TurnosController {

    public async getAllTurnos(){
        return await 
        Turno.query()
        .preload('cliente')
    }

    public async saveTurno({request, response}: HttpContextContract){
        const {turnos} = request.all()
        try {
            const savedTurno = Turno.createMany(turnos)
            return response.status(200).json({
                message: `Turnos creado`,
                turno: await savedTurno
            })
        } catch (error) {
            return response.status(400).json({
                message: 'El turno no se ha podido crear',
                error: error
            })
        }
    }

    public async updateTurno({request, response}: HttpContextContract){
        const {reqTurno} = request.all()
        let turno: Turno = await Turno.findOrFail(reqTurno.id_turno)
        turno.hora = reqTurno.hora
        turno.estado = reqTurno.estado
        try {
            const updatedTurno = turno.save()
            return response.status(200).json({
                message: `Turno Actualizado : ${(await updatedTurno).$isPersisted}`,
                updatedTurno: await updatedTurno
            })
        } catch (error) {
            return response.status(400).json({
                message: 'El turno no se ha podido actualizar',
                error: error
            })
        }
    }

    public async deleteTurno({request, response}: HttpContextContract){
        const idTurno = request.only(['id_turno'])
        let turno: Turno = await Turno.findOrFail(idTurno)

        try {
            turno.delete()
            return response.status(200).json({
                message: `Turno eliminado: ${(await turno.$isDeleted)}`
            })
        } catch (error) {
            return response.status(400).json({
                message: 'El turno no se pudo eliminar',
                error: error
            })
        }
    }

}
