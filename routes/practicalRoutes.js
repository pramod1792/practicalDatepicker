var app = require('../singletons/http-singleton').app;
var dao = require('../dao');

app.get('/timezones', dao.PracticalDao.getAllTimezones);
app.post('/dates', dao.PracticalDao.AddSelectedDateTime);
app.get('/recentdate', dao.PracticalDao.getRecentDate);
