/**
 *
 * @param {"A"|"U"} userType Type of user
 */
let acl = (userType) => (req, res, next) => {
    if (req.user.type === userType)
        next();
    else {
        res.status(403).json({ code: "ACL_ERROR", message: "User profile is not authorized" });
    };
}

export default acl;
