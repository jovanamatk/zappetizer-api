import MenuItemEntity from "./menu-item.entity";
import menuItemController from "./menu-item.controller";

export default class MenuItem {
  public static getEntity(): Function {
    return MenuItemEntity;
  }

  public static getController(): Function {
    return menuItemController;
  }
}
