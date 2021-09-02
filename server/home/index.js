

module.exports = (app, $sql) => {
  const authMiddleware = require('../middleware/auth')({ app });

  app.get('/allProjects', authMiddleware, (req, res) => {
    res.send({
      success: true,
      data: {
        projects: []
      }
    })
  })
}