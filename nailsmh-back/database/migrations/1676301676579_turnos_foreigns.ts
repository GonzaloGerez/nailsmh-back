import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'turnos_foreigns'

  public async up () {
    this.schema.alterTable('turnos', (table) => {
      table.foreign('client_id', 'cliente_poseedor_fk').references('id_client')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
