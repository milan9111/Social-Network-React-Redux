import { dialogType } from "../types/types";

let initialState =  [
    {id: 1, name: 'Dimych'}, 
    {id: 2, name: 'Andrey'}, 
    {id: 3, name: 'Sveta'}, 
    {id: 4, name: 'Sasha'}, 
    {id: 5, name: 'Victor'}, 
    {id: 6, name: 'Valera'}
] as Array<dialogType>;

export type initialStateSideBarType = typeof initialState; 

export const siteBarReducer = (state = initialState, action:any) => {
    return state;
}

