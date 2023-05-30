const db = require("../models");
const ApplicationsImage = db.ApplicationsImage;
let port = 3001

const applicationImages = async (req, res) => {
    let file = req.files;
    // let {images_id}=req.body
    console.log(req.user.id,"Salman Hasan id")

    global.__basedir = __dirname;
    try {


        if (file == undefined) {
            return res.send(`You must select a file.`);
        }

        let urlarr = []
        let filenames = []
        for (let i = 0; i < file.length; i++) {
            const host = req.hostname;
            const filePath = req.protocol + "://" + host + ":" + port + "/" + file[i].destination + "/" + file[i].filename;
            // filenames[i] = {imgname:file[i].filename}
            urlarr[i] = {imgurl:filePath,image_type:req.body.image_type,images_id:req.user.id}
        }


        let obj = 
            [ 
            ...urlarr]
       
        console.log(obj, "salman1")
        await ApplicationsImage.bulkCreate(obj).then((response) => {
            return res.send(`File Saved Succesfully.`);
        });
    } catch (error) {
        console.log(error);
        return res.json({ msg: "Error when trying to complete your Profile", error });
    }
};

module.exports = {
    applicationImages,
};
