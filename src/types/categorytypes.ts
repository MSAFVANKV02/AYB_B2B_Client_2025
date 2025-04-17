
export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  parent: string;
  parentId: string | null;
  subcategories?: ICategory[];
  coverImage: string | null;
  iconImage: string | null;
  featured: boolean;
  published: boolean;
  isDeleted?: boolean;
  createdAt?:Date;
  updatedAt?: Date;
}
