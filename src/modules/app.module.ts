import Category from "./category/category.module";
import MenuItem from "./menu-item/menu-item.module";
import User from "./user/user.module";

export default class App {
  public static getEntities() {
    return [Category.getEntity(), MenuItem.getEntity(), User.getEntity()];
  }
}
