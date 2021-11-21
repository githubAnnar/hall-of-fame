import { IClubRevision } from "./iclub-revision-interface";

export interface IGetClubRevisionsMessage {
    message: string;
    data: IClubRevision[];
}
