const jwt = require('jsonwebtoken')
const roles = {
    admin: {
        canVerifyDocuments: true,
    },
    superadmin: {
        canVerifyDocuments: true,
    },
    user: {
        canVerifyDocuments: false,
    },
};

// Step 2: Middleware function
async function verifyDocumentAccess(req, res, next) {
        const token = req.cookies.accessToken

    req.token = token

    console.log(token)


    const decodedToken = await jwt.verify(token, "HadZrLuLUpmDcWjz5Vpc04LIopvOQsChok73LQqvs8UWapnH8j3rcHAlfpX");

    
    const user = await decodedToken;
   
    req.cnic = user;
    req.id = user;
    let { role } = req.user = user;
    console.log(user,"Role")
   
    if (roles[role] && roles[role].canVerifyDocuments) {
        next(); 
    } else {
        res.status(403).json({ error: 'Unauthorized' }); 
    }
}

module.exports = {
    verifyDocumentAccess
}