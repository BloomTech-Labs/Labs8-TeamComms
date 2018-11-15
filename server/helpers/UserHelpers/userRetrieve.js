

const userRetrieve = async (req,res) => {
    const user = req.user;
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
    })
}

module.exports = userRetrieve;