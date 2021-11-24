import { IPersonRevision } from "./iperson-revision.interface";

export interface IPostPersonRevisionMessage {
    message: string;
    data: IPersonRevision;
    id: number;
}
