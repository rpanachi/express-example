var Sequelize = require('sequelize');
var settings = GLOBAL.app.settings;
var db = new Sequelize(settings.db_name, settings.db_username, settings.db_password);

Task = db.define("tasks", {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  date: Sequelize.DATE,
  closed: Sequelize.BOOLEAN
});

Task.sync({force: true}).on('success', function() {
    for (i = 0; i < 5; i++) {
        task = Task.build({
            title: 'Task ' + i,
            description: 'Descrição da task ' + i,
            date: new Date(),
           closed: i % 2 == 0
        });
        task.save();
    }
});
