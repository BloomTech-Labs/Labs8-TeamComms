const User = require("../../models/UserModel"); //Model\

const userFindByName = async (req, res) => {
  try {
    let user = await User.findOne({ displayName: req.params.name.toLowerCase() });
    if (!user) {
      throw new Error("User not found!");
    } else {
      res.status(200).send({
        user: {
          id: user._id,
          displayName: user.displayName,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          organization: user.organization,
          premium: user.premium,
          is_active: user.is_active
        }
      });
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = userFindByName;
