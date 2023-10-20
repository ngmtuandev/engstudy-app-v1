export const sufferArrray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Chọn một vị trí ngẫu nhiên trong mảng
        [array[i], array[j]] = [array[j], array[i]]; // Đảo chỗ giữa hai phần tử
    }
    return array;
  }