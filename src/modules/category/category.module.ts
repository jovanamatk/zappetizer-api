import CategoryEntity from "./category.entity";
import categoryController from "./category.controller";

export default class Category {
  public static getEntity(): Function {
    return CategoryEntity;
  }

  public static getController(): Function {
    return categoryController;
  }
}
