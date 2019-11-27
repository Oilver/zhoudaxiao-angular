export class ProductEntity {
  id;

  name;

  categoryId;

  categoryName;

  brandId;

  introduction;

  originalPrice;

  discountPrice;

  agentPrice;

  secondAgentPrice;

  priority;

  pageviews;

  like;

  totalSales;

  monthlySales;

  freight;

  stock;

  isNew;

  detail;

  /**
   * 商品的头像的key
   */
  avatarUrl;

  /**
   * 商品的全部图片的实体
   */
  imageEntityList = [];


  createBy;

  lastUpdateBy;

  createTime;

  lastUpdateTime;
}
