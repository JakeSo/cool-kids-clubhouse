//This is where the call back functions for the client side of the website will go
exports.index = (req, res)=>{
    res.render('./client/index');
};

exports.calendar = (req, res) => {
    res.render('./client/calendar')
}

exports.home = (req, res)=>{
    res.render('./client/home');
};