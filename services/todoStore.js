import Datastore from 'nedb-promise'

export class Todo {
    constructor(title, description, start, finish, importance, done, orderedBy) {
        this.orderedBy = orderedBy;
        this.title = title;
        this.description = description;
        this.start = start;
        this.finish = finish;
        this.importance = importance;
        this.done = done;
    }
}

export class TodoStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/todos.db', autoload: true });
    }

    async add(title, description, start, finish, importance, done, orderedBy) {
        let todo = new Todo(title, description, start, finish, importance, done, orderedBy);
        return await this.db.insert(todo);
    }
    // ASK how to relly delete 
    async delete(id, currentUser) {
        await this.db.remove({ _id: id, orderedBy: currentUser }, {});
        return await this.get(id);
    }

    async get(id, currentUser) {
        return await this.db.findOne({ _id: id, orderedBy: currentUser });
    }

    async all(currentUser) {
        return await this.db.cfind({ orderedBy: currentUser }).exec();
    }
}

export const todoStore = new TodoStore();