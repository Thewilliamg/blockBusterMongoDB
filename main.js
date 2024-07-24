import { Actors } from "./js/model/actors.js";
import { Movies } from "./js/model/movies.js";

const objM = new Movies();

// 1.
// console.log(`1) Contar el número total de copias de DVD disponibles en todos los registros:`, await objM.getCountDvd());
// 6.
// console.log(`6) Listar todos los géneros de películas distintos:`, await objM.getAllGenre());
// 7.
// console.log(`7) Encontrar películas donde el actor con id 1 haya participado:`, await objM.getAuthorId1());

objM.destructor()

const objA = new Actors();

// 2.
// console.log(`2) Encontrar todos los actores que han ganado premios Oscar:`, await objA.getAllActorsAwards() );
// 3.
// console.log(`3) Encontrar la cantidad total de premios que ha ganado cada actor:`,await objA.getAllAuthorsAwardsCu());
// 4.
// console.log(`4) Obtener todos los actores nacidos después de 1980:`,await objA.getAllAuthor1980());
// 5.
console.log(`5) Encontrar el actor con más premios:`,await objA.getAuthorsMostAwards());

objA.destructor()