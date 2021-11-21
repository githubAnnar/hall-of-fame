import { IRace } from "./irace-interface";

export interface IPatchRaceMessage {
    message: string;
    data: IRace;
    changes: any;
}
