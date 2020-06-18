import Datastore from 'nedb-promise'
// goes to controller/ordersController
export class Order {
    constructor(title, orderedBy) {
        this.orderedBy = orderedBy;
        this.title = title;
        this.id = 'id' + (new Date()).getTime();
        this.orderDate = new Date();
        //this.state = "OK";
    }
}

export class OrderStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/orders.db', autoload: true });
    }

    async add(title, orderedBy) {
        let order = new Order(title, orderedBy);
        return await this.db.insert(order);
    }

    async delete(id, currentUser) {
        await this.db.update({ _id: id, orderedBy: currentUser }, { $set: { "state": "DELETED" } });
        return await this.get(id);
    }

    async get(id, currentUser) {
        return await this.db.findOne({ _id: id, orderedBy: currentUser });
    }

    async all(currentUser) {
        return await this.db.cfind({ orderedBy: currentUser }).sort({ orderDate: -1 }).exec();
    }
}

export const orderStore = new OrderStore();