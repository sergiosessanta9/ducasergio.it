export class TTableOfContentsItem {
  id: string;
  title: string;
  depth: number;
  slug?: string | any;
  visible: boolean;

  constructor(title: string, depth: number, slug?: string | null, visible: boolean = false) {
    this.title = title.replaceAll("&amp;", '&');
    this.depth = depth;
    this.slug = slug;
    this.id = this.title
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('&', 'e')
        .replaceAll(':', '');
    this.visible = visible;
  }
}
