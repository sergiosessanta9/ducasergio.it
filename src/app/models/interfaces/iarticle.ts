import { BlogArticleVO } from "../blog-article-vo";
import { IMetadata } from "./imetadata";

export interface IArticle {
    metadata: IMetadata;
    data?: BlogArticleVO | any;
}