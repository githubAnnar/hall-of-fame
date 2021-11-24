import { IRace } from "./irace.interface";

export interface IGetRacesMessage {
    message: string;
    data: IRace[];
}
