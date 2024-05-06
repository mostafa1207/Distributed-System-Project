const path=require('path')
const fs=require('fs')
module.exports=(imagePath)=>{
  fs.unlink(path.join(__dirname,'..',imagePath))
}
