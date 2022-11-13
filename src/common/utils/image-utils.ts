import { extname } from "path";

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

  export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const date = new Date()
    const todayDate = new Date().toISOString().slice(0, 10);
    const currentTime = `${date.getHours()}:${date.getMinutes()}`
    const fullDate =`${todayDate}-${currentTime}`
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `product-${randomName}-${fullDate}${fileExtName}`);
  };