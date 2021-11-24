import { IClubRevision } from "./iclub-revision.interface";

export interface IPostClubRevisionMessage {
    message: string;
    data: IClubRevision;
    id: number;
}
