import multer from 'multer';
const path = require('path');
class Multer {
  destino: string;
  field: string;
  storage: any;
  constructor(dest: string, field: string) {
    this.destino = dest;
    this.field = field;
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        // Uploads is the Upload_folder_name
        cb(null, this.destino);
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
      },
    });
  }

  init() {
    return multer({
      storage: this.storage,
      fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
          return cb(null, true);
        }
        return cb(null, false);
      },
    }).single(this.field);
  }
}

export default Multer;
