import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import PlanillaCliente from './PlanillaCliente'
import Turno from './Turno'
import Usuario from './Usuario'

export default class Cliente extends BaseModel {

  public static table = 'clients'

  @column({ isPrimary: true })
  public id_client: number

  @column()
  public nombre_completo: string

  @column()
  public telefono: string

  @column()
  public user_id: number

  @hasOne(()=> Usuario, {
    localKey: 'user_id',
    foreignKey: 'id'
  })
  public usuario: HasOne<typeof Usuario>

  @hasOne(()=> PlanillaCliente, {
    localKey: 'idCliente',
    foreignKey: 'id'
  })
  public planillaCliente: HasOne<typeof PlanillaCliente>

  @hasMany(()=> Turno, {
    localKey: 'id_cliente',
    foreignKey: 'id_turno'
  })
  public turnos: HasMany <typeof Turno>
}
