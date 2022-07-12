import { Book } from "./Book";

export interface PageInfo {
    isLastPage: boolean
    pageParam: number
}

export interface Response {
    data: Book[]
    pageInfo: PageInfo
};
