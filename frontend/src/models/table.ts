class THeader {
  label: string;
  accessor: string;
  width: number;
  defect?: string;
  onMap: (param: any) => string;

  constructor(
    label: string,
    accessor: string,
    width: number,
    defect?: string,
    onMap?: (param: any) => string
  ) {
    this.label = label;
    this.accessor = accessor;
    this.width = width;
    this.defect = defect;
    this.onMap = onMap;
  }
}

export { THeader };
