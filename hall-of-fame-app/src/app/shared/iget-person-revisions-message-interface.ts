import { IPersonRevision } from "./iperson-revision-interface";

export interface IGetPersonRevisionsMessage {
    message: string;
    data: IPersonRevision[];
}
