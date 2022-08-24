import Category from "./category/category.module";
import MenuItem from "./menu-item/menu-item.module";
import User from "./user/user.module";
import Auth from "./auth/auth.module";

export default class AppModule {
  public static getEntities(): Function[] {
    return [Category.getEntity(), MenuItem.getEntity(), User.getEntity()];
  }

  public static getControllers(): Function[] {
    return [
      Category.getController(),
      MenuItem.getController(),
      User.getController(),
      Auth.getController(),
    ];
  }
}
