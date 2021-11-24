import { IResult } from "./iresult.interface";

export interface IPatchResultMessage {
    message: string;
    data: IResult;
    changes: any;
}
