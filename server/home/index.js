

module.exports = (app, $sql) => {
  const authMiddleware = require('../middleware/auth')({ app });

  app.get('/allProjects', authMiddleware, (req, res) => {
    console.log('kkk');
    res.send({
      success: true,
      data: {
        projects: []
      }
    })
  })
}