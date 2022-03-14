// Note: we work mainly with JavaScript.
// However, at least this file is in Typescript to illustrate the point of the typesafe APIs.
import { DefaultApi, PonyDto } from "./generated/openapi";

const api = new DefaultApi();

export function getDogs(): Promise<Array<PonyDto>> {
    return api.getDogs()
}

export function addDog(leashStyle: string, breed: string, owner: Owner, food: string, dogschool: Dogschool): Promise<Array<PonyDto>> {
    return api.addPony({
        DogDTO: {
            leashStyle: leashStyle,
            breed: breed,
            owner: owner,
            food: food,
            dogschool: dogschool

        }
    });
}
