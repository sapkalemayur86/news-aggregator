const { userRegistrationService,userloginService,getUserPrefrences,UpdateUserPrefrences } = require("../services/user.service");

async function createUser(req, res) {
  try {
    const { message, status } = await userRegistrationService(req.body);
    res.status(status).json({
      message
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

async function loginUser(req, res) {
  try {
    const { message, status,token} = await userloginService(req.body);
    res.status(status).json({
      message,
      token
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

async function getPreferences(req,res){
  try {
    const {status,preferences} = await getUserPrefrences(req.body);
    res.status(status).json({
      preferences
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }

}

async function UpdatePreferences(req,res){
  try {
    const {status,message} = await UpdateUserPrefrences(req.body);
    res.status(status).json({
      message
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }

}

module.exports = { createUser,loginUser,getPreferences,UpdatePreferences};
