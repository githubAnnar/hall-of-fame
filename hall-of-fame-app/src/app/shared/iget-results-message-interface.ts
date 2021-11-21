import { IResult } from "./iresult-interface";

export interface IGetResultsMessage {
    message: string;
    data: IResult[];
}
