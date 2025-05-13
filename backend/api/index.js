const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);


server.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const db = router.db; 
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server está rodando na porta 3000');
});
