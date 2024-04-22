import { TTableOfContentsItem } from "src/app/components/table-of-contents/models/t-table-of-contents-item";
import { BlogArticleVO } from "../blog-article-vo";

export interface IMetadata {
    title: string;
    description: string;
    caption?: string | any;
    date?: string | any
    lang?: string | any;
    tags?: string[] | any;
    category?: string | any;
    accent?: string;
    tableOfContents: TTableOfContentsItem[];
  }