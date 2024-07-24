import { connect } from "../../helpers/db/connect.js";

export class Movies extends connect {
    static instancemovis;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof Movies.instancemovis === 'object') {
            return Movies.instancemovis;
        }
        Movies.instancemovis = this;
        return this;
    }
    destructor() {
        Movies.instancemovis = undefined
        connect.instanceConnect = undefined
    }
    // Consulta 1
    async getCountDvd() {
        await this.conexion.connect();
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {$unwind: "$format"},
            {$match: {
                "format.name":{$eq:"dvd"}
            }},
            {
                $group:{
                _id: null,
                totalCopies:{
                    $sum: "$format.copies"
                }
            }}
        ]).toArray();
        await this.conexion.close();
        return data ;
    }
    // Consulta 6
    async getAllGenre(){
        await this.conexion.connect();
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                { $unwind: "$genre" },
                {
                  $group: {
                    _id: null,
                    generos: { $addToSet: "$genre" }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    generos: 1
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
    // Consulta 7
    async getAuthorId1(){
        await this.conexion.connect();
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {
                  $unwind: "$character"
                },
                {
                  $match: {
                           "character.id_actor":1
                  }
                },
                {
                  $project: {
                    pelicula:"$name"
                  }
                }
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }
}