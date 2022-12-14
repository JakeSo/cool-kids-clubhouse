//This is where the call back functions for the main side of the website will go
exports.index = (req, res)=>{
    res.render('./');
};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });
};