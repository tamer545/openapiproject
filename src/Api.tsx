// Note: we work mainly with JavaScript.
// However, at least this file is in Typescript to illustrate the point of the typesafe APIs.
import {DefaultApi, DogDTO, OwnerDTO} from "./generated/openapi";

const api = new DefaultApi();

export function getDogs(): Promise<Array<DogDTO>> {
    return api.getDogs()
}

export function addDog(name: string, breed: string, owner: OwnerDTO, food: string, dogschool: string): Promise<DogDTO> {
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

export function changeOwner(ownerName: string, ownerAge: number, dogToChangeOwnerID: number): Promise<void> {
    return api.changeDogOwner({
        ownerDTO: {
            name: ownerName,
            age: ownerAge
        },
        dogId: dogToChangeOwnerID
    });
}
