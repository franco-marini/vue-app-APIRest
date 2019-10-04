const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {  
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, res, cb) => {
  if (res.mimetype === 'image/jpg' || res.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // Reject teh file
    cb(new Error('File not accepted'), false);
  }
}

const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter 
});

module.exports = upload
