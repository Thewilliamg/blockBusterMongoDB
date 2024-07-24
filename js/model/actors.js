import { connect } from "../../helpers/db/connect.js"

export class Actors extends connect{
    static instanceauthors;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof Actors.instanceauthors === 'object') {
            return Actors.instanceauthors;
        }
        Actors.instanceauthors = this;
        return this;
    }

    destructor() {
      Actors.instanceauthors = undefined
      connect.instanceConnect = undefined
    }

    // Consulta 2.
    async getAllActorsAwards(){
        await this.conexion.connect();
        const collection = this.db.collection('actors');
        const data = await collection.aggregate(
          [
            {
              $unwind: "$awards"
            },
            {
              $match: {
                  "awards.name" :"Oscar Award"
              }
            },
            {
              $project: {
                id_actor:1,
                nombre_actor:"$full_name",
                nationality:1
              }
            }
          ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
    // Consulta 3.
}