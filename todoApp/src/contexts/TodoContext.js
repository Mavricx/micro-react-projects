import {createContext, useContext} from 'react';
export const TodoContext=createContext({
    todos:[
        {
            id:Date.now(),
            todo:"Todo Message",
            completed:false,
        }
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
});

export const useTodo=()=>{
    return useContext(TodoContext);
}

export const TodoProvider=TodoContext.Provider;