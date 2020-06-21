import Datastore from 'nedb-promise'
// goes to controller/ordersController
export class Order {
    constructor(title, description, start, finish, importance, done, orderedBy) {
        this.orderedBy = orderedBy;
        this.title = title;
        this.description= description;
        this.start = start;
        this.finish = finish;
        this.importance = importance;
        this.done = done;
    }
}

export class OrderStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/orders.db', autoload: true });
    }

    async add(title, description, start, finish, importance, done, orderedBy) {
        let order = new Order(title, description, start, finish, importance, done, orderedBy);
        return await this.db.insert(order);
    }
    // ASK how to relly delete 
    async delete(id, currentUser) {
        // await this.db.update({ _id: id, orderedBy: currentUser }, { $set: { "state": "DELETED" } });
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

export const orderStore = new OrderStore();