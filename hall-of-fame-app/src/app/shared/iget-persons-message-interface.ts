import { IPersonEx } from "./iperson-ex-interface";

export interface IGetPersonsMessage {
    message: string;
    data: IPersonEx[];
}
