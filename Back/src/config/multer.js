import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    // config de onde o arquivo vai ser salvo
    destination: function(req,  file, cb){
        cb(null, "SRC/uploads")
    },
    // config nome do arquivo
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage})

export default  upload;

