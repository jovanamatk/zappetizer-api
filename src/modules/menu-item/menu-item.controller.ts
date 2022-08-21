const menuItemController = (app) => {
  const PATH = "/menu-item";

  app.get(PATH, (req, res) => {
    res.send("Hello Menu Item!");
  });

  app.get(`${PATH}/:id`, (req, res) => {
    res.send(`Hello Menu Item ${req.params.id}!`);
  });
};

export default menuItemController;
