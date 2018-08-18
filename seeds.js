const Column = require('./app/models/column.model');
const Task = require('./app/models/task.model');
/**
 * Seed the database
 */
exports.columns = (req, res) => {
    // create some events
    const columns = [
      { title: 'To do', taskIds: [] },
      { title: 'In Progress', taskIds: [] },
      { title: 'Completed', taskIds: [] }
];
  
    // use the Event model to insert/save
    for (col of columns) {
      let newColumn = new Column(col);
      newColumn.save();
    }
  
    // seeded!
    // res.send('Database seeded!');
  }

  exports.tasks = (req, res) => {
    // create some events
    const tasks = [
      { content: 'Design a Toolbar', createdBy: 'Nabeel' },
      { content: 'Design a Navbar', createdBy: 'Muhammad' },
      { content: 'Design a Sidebar', createdBy: 'Nabeel' },
      { content: 'Design a Header', createdBy: 'Muhammad' },
      { content: 'Design a Footer', createdBy: 'Nabeel' },
];
  
    // use the Event model to insert/save
    for (t of tasks) {
      let newTask = new Task(t);
      newTask.save()
        .then(taskResponse => {
          Column.findOne({ title: "To do" })
            .then(columnResponse => {
              columnResponse.taskIds.push(taskResponse._id);
              columnResponse.save();
              // res.send(user);
            })
        });
      }
  }







//   const initialData = {
//     tasks: {
//         'task-1': { id: 'task-1', content: 'Take out the garbage.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-2': { id: 'task-2', content: 'Clean the space.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-3': { id: 'task-3', content: 'Clear the way.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-4': { id: 'task-4', content: 'Take out the dirty shoes.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-5': { id: 'task-5', content: 'Take out the garbage.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-6': { id: 'task-6', content: 'Clean the space.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-7': { id: 'task-7', content: 'Clear the way.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-8': { id: 'task-8', content: 'Take out the dirty shoes.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-9': { id: 'task-9', content: 'Take out the garbage.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-10': { id: 'task-10', content: 'Clean the space.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-11': { id: 'task-11', content: 'Clear the way.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-12': { id: 'task-12', content: 'Take out the dirty shoes.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-13': { id: 'task-13', content: 'Take out the garbage.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-14': { id: 'task-14', content: 'Clean the space.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-15': { id: 'task-15', content: 'Clear the way.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//         'task-16': { id: 'task-16', content: 'Take out the dirty shoes.', createdBy: 'Nabeel', dated: new Date().toLocaleDateString() },
//     },
//     columns: {
//         'column-1': {
//             id: 'column-1',
//             title: 'To do',
//             taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6', 'task-7', 'task-8', 'task-9', 'task-10', 'task-11', 'task-12', 'task-13', 'task-14', 'task-15', 'task-16']
//         },
//         'column-2': {
//             id: 'column-2',
//             title: 'In Progress',
//             taskIds: []
//         },
//         'column-3': {
//             id: 'column-3',
//             title: 'Completed',
//             taskIds: []
//         },
//     },
//     columnOrder: ['column-1', 'column-2', 'column-3'],
// };

// export default initialData;