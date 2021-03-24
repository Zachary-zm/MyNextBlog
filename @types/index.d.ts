export interface User {
  _id?: string,
  userName?: string,
  password?: string,
  avatar?: string,
  email?: string,
  visit?: number[],
  status?: string,
  refUserRoleCode?: string,
  createTime?: string,
  updateTime?: string
}

export interface Topic {
  _id?: string,
  avatar?: string,
  topicTitle?: string,
  content?: string,
  total?: number,
  list?: object[],
  page?: number,
  type?: string,
  commentNum?: number,
  praiseNum?: number,
  userName?: string,
  userAvatar?: string,
  updateTime?: string,
  categoryName?: string
}


export interface IPost extends Document {
  _id: string;

  /**
 * 标题
 */
  title: string;

  /**
 * 文章别名
 */
  alias: string;

  /**
 * 内容
 */
  content: string;

  /**
   * 编译为HTML后的内容
   */
  html: string;

  /**
 * 分类
 */
  category: ICategory;

  /**
 * 标签
 */
  labels: Array<string>;

  /**
 * 外链Url
 */
  url: string;

  /**
 * 浏览次数
 */
  viewCount: number;

  /**
 * 是否本地文档，否则是外链
 */
  isLocal: boolean;

  /**
 * 是否草稿
 */
  isDraft: boolean;

  /**
 * 是否有效
 */
  isActive: boolean;

  /**
   * 是否允许评论的标识
   */
  commentsFlag: number;

  /**
 * 创建时间
 */
  createTime: Date;

  /**
 * 修改时间
 */
  modifyTime: Date;

  /**
   *发布时间
   */
  publishTime?: Date;
}


export interface ICategory extends Document {
  _id: string;

  /**
   * 分类名称
   */
  cateName: string;

  /**
   * 分类Alias
   */
  alias: string;

  /**
   * 分类图片
   */
  img: string;

  /**
   * 排序值
   */
  sequence: number;

  /**
   * 创建时间
   */
  createTime: Date;

  /**
   * 修改时间
   */
  modifyTime: Date;
}
