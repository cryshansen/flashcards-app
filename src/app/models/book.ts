export interface Book{
    topic:string;
    title:string;
    author:string;
    pages:Page[];
}
export interface Page{
    title:string;
    problem:string;
    idea:string;
    code:string;
}