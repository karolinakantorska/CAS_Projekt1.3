export class BuisnessLogic {
    constructor() {
    }
    test() {
        console.log('test')
    }
    filterDone(list) {
        return list.filter((task) => task.done);
    }
    filterTodo(list) {
        return list.filter((task) => !task.done);
    }
    sortingAList(list, sortBy) {
        return this.sortTasksBy(list, sortBy);
    }
    sortTasksBy(list, by) {
        return [...list].sort(function (t1, t2) {
            //console.log(new Date(t2[by]))
            return new Date(t2[by]) - new Date(t1[by]);
        });
    }
}