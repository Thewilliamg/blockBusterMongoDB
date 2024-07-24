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
    async getAllAuthorsAwardsCu(){
        await this.conexion.connect();
        const collection = this.db.collection('actors');
        const data = await collection.aggregate(
          [
            {
                $unwind: "$awards"
              },
              {
                $group: {
                  _id: "$_id",
                  name: {$first: "$full_name"},
                  Total: {
                    $sum: 1
                  },
                }
              }
          ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
    // Consulta 4.
    async getAllAuthor1980(){
        await this.conexion.connect();
        const collection = this.db.collection('actors');
        const data = await collection.aggregate(
          [
            {
              $match: {
                "date_of_birth": {$gt:"1980-12-30"}
              }
            }
          ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
    // Consulta 5.
    async getAuthorsMostAwards(){
        await this.conexion.connect();
        const collection = this.db.collection('actors');
        const data = await collection.aggregate(
          [
            {
                $unwind: "$awards",
              },
              {
                $group: {
                  _id: "$_id",
                  full_name: { "$first": "$full_name" },
                  total: { $sum: 1 },
                }
              },
              {
                $sort: {
                  total: -1,
                }
              },
              {
                $limit: 1,
              }
          ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
    //10
}