//This is where the call back functions for the admin side of the website will go
exports.index = (req, res)=>{
    res.render('./events/index');
};

exports.new = (req, res)=>{
    res.render('./events/new');
}

