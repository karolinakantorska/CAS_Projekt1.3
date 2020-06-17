//View
//View ----onclick----> Controller
//View <======== Controller
//Displays the state/data of the mode

export class BuisnessLogic {
    constructor() {
    }
    test() {
        console.log('test')
    }
    filterDone(list){
        return list.filter((task) => task.done);
    }
    filterTodo(list) {
        return list.filter((task) => !task.done);
    }
    sortingAList(list, sortInput){
        let value = ''
        for (const node of sortInput) {
            (node.checked)
                ? value = node.value
               : null;
        }
        switch (value) {
            case 'finish':
                console.log(`${value}`)
                return this.sortTasksBy(list, value);
                break;
            case 'start':
                console.log(`${value}`)
                return this.sortTasksBy(list, value);
                break;
            case 'importance':
                console.log('importance')
                return this.sortTasksBy(list, value);
                break;
        }
    }
    sortTasksBy(list, by){
        return [...list].sort(function (t1, t2) {
            console.log(new Date(t2[by]))
            return new Date(t2[by]) - new Date(t1[by]);
        });
    }
}

// export const buisnessLogic = new BuisnessLogic;

