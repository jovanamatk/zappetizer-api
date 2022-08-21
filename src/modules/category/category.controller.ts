const categoryController = (app) => {
  const PATH = "/category";

  app.get(PATH, (req, res) => {
    res.send("Hello Category!");
  });

  app.get(`${PATH}/:id`, (req, res) => {
    res.send(`Hello Category ${req.params.id}!`);
  });
};

export default categoryController;
