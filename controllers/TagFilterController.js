const { query } = require("express");
const posts = require("../db/posts-db.js");




const tagFilter = (req, res) => {

    console.log(req.query.tag);


    // il metodo some ritorna true se trova un elemento che soddisfa la condizione
    // con filter ritorniamo solo i post che hanno la condizione in some = true
    const postsFiltered = posts.filter(post => {
        return post.tags.some(tag => tag.toLowerCase() === req.query.tag.toLowerCase());
    });


    if (postsFiltered.length === 0) {
        return res.status(404).json({
            error: `404! Nessun Risultato trovato`
        })
    }

    res.status(200).json({
        counter: postsFiltered.length,
        data: postsFiltered
    })
}


module.exports = {
    tagFilter
}