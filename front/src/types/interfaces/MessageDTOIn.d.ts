import {UserDTOIn} from "./UserDTOIn";

export interface MessageDTOIn {
    id: number;
    receiver: UserDTOIn;
    sender: UserDTOIn;
    content: string;
    creationDate: string;
    lastModifiedDate: string;
}