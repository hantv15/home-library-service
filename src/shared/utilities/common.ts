export class Common {
  public removeElementFromArrayAtIndex(
    array: string[],
    index: number,
    deleteCount?: number,
  ) {
    if (!deleteCount) {
      deleteCount = 0;
    }

    return array.splice(index, deleteCount);
  }

  public findIndexElementFromArray = (array: string[], value: string) => {
    return array.findIndex((element) => element === value);
  };
}

export const common = new Common();
