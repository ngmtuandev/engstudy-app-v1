export default function removeDuplicateArr(arr) {
    return arr?.filter((value, index, self) => self.indexOf(value) === index);
  }