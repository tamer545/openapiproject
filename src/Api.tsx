// Note: we work mainly with JavaScript.
// However, at least this file is in Typescript to illustrate the point of the typesafe APIs.
import {DefaultApi, DogDTO} from "./generated/openapi";

const api = new DefaultApi();

export function getDogs(): Promise<Array<DogDTO>> {
    return api.getDogs()
}

export function addDog(name: string, breed: string, owner: string, food: string, dogschool: string): Promise<DogDTO> {
    return api.addDog({
        dogDTO: {
            name: name,
            breed: breed,
            owner: owner,
            food: food,
            dogschool: dogschool

        }
    });
}
