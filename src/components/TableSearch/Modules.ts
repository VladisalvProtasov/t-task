export type ProductParams = 'id' | 'code' | 'name'
  | 'description' | 'image' | 'price'
  | 'category' | 'quantity' | 'inventoryStatus' | 'rating'
export type ProductType = Record<ProductParams, number | string>
// export interface Test2 {
//   [key: Test1]: string | number
// }
// export interface ProductType {
//   id: string;
//   code: string;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
//   category: string;
//   quantity: number;
//   inventoryStatus: string;
//   rating: number;
// }

export interface ColumnType {
  field: ProductParams;
  header: string;
}

export interface PropsSelectColumn {
  columns: ColumnType[];
  products: ProductType[];
}

export interface SearchElement {
  field: ProductParams;
  search: string;
}