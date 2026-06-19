export interface ISelectItem {
  id: string;
  value: string;
  label?: string;
}

export interface ISelectWithChildrenItem {
  id: string;
  value: string;
  children: ISelectItem[];
}
