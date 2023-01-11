// stores/TodoStore.ts
import { action, autorun, observable, reaction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { createContext, useContext } from 'react';

export const BOX_COLORS = ['#9e9e9e', '#000', '#ff3535', '#ff9e35', '#fff035', '#bdff35', '#35ffbf', '#3578ff', '#8835ff', '#ff35ea'];

export class Todo {
    id: string;
    content: string;
    tempContent: string;
    checked: boolean;
    colorIndex: number;
    isUpdate: boolean;
    isColorUpdate: boolean;

    constructor(content: string, colorIndex: number) {
        this.id = uuidv4();
        this.content = content;
        this.colorIndex = colorIndex;
        this.tempContent = content;
        this.checked = false;
        this.isUpdate = false;
        this.isColorUpdate = false;
    }
}

class TodoStore {
    @observable todos: Todo[] = [];
    @observable paletteOpen = false;
    @observable newTodo = '';
    @observable colorIndex = 3;

    @action.bound
    addTodo(todo: Todo) {
        this.todos = [...this.todos, todo];
    }

    @action.bound
    setTempContent(id: string, content: string) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) return { ...todo, tempContent: content };
            return todo;
        });
    }

    @action.bound
    toggleTodo(id: string) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) return { ...todo, checked: !todo.checked };
            return todo;
        });
    }

    @action.bound
    deleteTodo(id: string) {
        this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    }

    @action.bound
    updateTodo(id: string, content: string) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) return { ...todo, content, isUpdate: false };
            return todo;
        });
    }

    @action.bound
    updateCancel(id: string) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) return { ...todo, tempContent: '', isUpdate: false };
            return todo;
        });
    }

    @action.bound
    updateColorIndex(id: string, colorIndex: number) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) return { ...todo, colorIndex };
            return todo;
        });
    }

    @action.bound
    togglePaletteOpen() {
        this.paletteOpen = !this.paletteOpen;
    }

    @action.bound
    setNewTodo(newTodo: string) {
        this.newTodo = newTodo;
    }

    @action.bound
    setColorIndex(colorIndex: number) {
        this.colorIndex = colorIndex;
    }

    @action.bound
    toggleUpdate(id: string) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) return { ...todo, isUpdate: !todo.isUpdate };
            return todo;
        });
    }

    @action.bound
    toggleColorUpdate(id: string | undefined) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) return { ...todo, isColorUpdate: !todo.isColorUpdate };
            return todo;
        });
    }

    get boxColor() {
        return BOX_COLORS[this.colorIndex];
    }

    get info() {
        return {
            total: this.todos.length,
            checked: this.todos.filter((todo: Todo) => todo.checked).length,
            notChecked: this.todos.filter((todo: Todo) => !todo.checked).length,
        };
    }
}

export default TodoStore;

export const TodoStoreContext = createContext<TodoStore | null>(null);

export function useTodoStore() {
    return useContext(TodoStoreContext) as unknown as TodoStore;
}
