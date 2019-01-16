module.exports.get404 = (req, res, next) => {
    console.log(req);
    res.status(404).render('404', { pageTitle: "Page not found!" });
}