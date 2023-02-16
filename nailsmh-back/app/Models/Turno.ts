import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'

export default class Turno extends BaseModel {

  public static table = 'Turnos'

  @column({ isPrimary: true })
  public id_turno: number

  @column.dateTime()
  public fecha: DateTime

  @column.dateTime()
  public hora: DateTime

  @column()
  public estado: string

  @column()
  public client_id: number

  @belongsTo(()=> Cliente, {
    localKey: 'id_client',
    foreignKey: 'client_id'
  })
  public cliente: BelongsTo<typeof Cliente>
}
