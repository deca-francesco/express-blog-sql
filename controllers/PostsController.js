// const posts = require("../db/posts-db.js");
// const fs = require("fs");

const connection = require("../db/connection")


// const index = (req, res) => {
//     // creo variabili per salvare il contenuto del listItem e tutti i listItems
//     let listItem = "";
//     let listItems = "";

//     // ciclo per riempire il contenuto del listItem e aggiornare la lista dei listItems
//     posts.forEach(post => {

//         listItem =
//             `<li>
//             <h2>${post.title}</h2>
//             <p>${post.content}</p>
//             <img src="${post.image}">
//             <p>${post.tags}</p>
//         </li>`

//         listItems += listItem;
//     })

//     // assegno al markup tutti i listItems
//     const markup = `
//     <ol>
//         ${listItems}
//     </ol>`;

//     res.send(markup);
// }


// const index = (req, res) => {
//     res.json({
//         counter: posts.length,
//         data: posts
//     })
// }

const index = (req, res) => {
    const sql = "SELECT * FROM posts"

    connection.query(sql, (err, results) => {

        if (err) return res.json({ error: err })

        console.log(results);

        const responseData = {
            counter: results.length,
            data: results
        }
        res.status(200).json(responseData);
    })
}


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







const show = (req, res) => {
    // prendo il post con slug === al parametro nella query string con find
    const post = posts.find(post => post.slug === req.params.slug);
    // console.log(post);

    // blocco lo script sia se trovo il post sia se non lo trovo
    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        })
    }
    return res.status(200).json({
        data: post
    })

}



const store = (req, res) => {

    console.log(req.body);

    const postsExists = posts.find(post => post.slug === req.body.slug);


    if (!postsExists) {
        // creo il post con i dati del body della richiesta
        const post = {
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            image: req.body.image,
            tags: req.body.tags
        }

        // lo inserisco nell'array
        posts.push(post);

        // per salvarlo nel file importiamo e usiamo fs
        // usiamo il metodo stringify dell'oggetto JSON per convertire posts nella json notation (virgolette)
        fs.writeFileSync("./db/posts-db.js",
            `module.exports = ${JSON.stringify(posts, null, 2)}`);

        res.status(201).json({
            status: 201,
            data: posts,
            counter: posts.length
        })
    } else {
        res.status(201).json({
            status: 201,
            data: posts,
            counter: posts.length
        })

    }
}


const update = (req, res) => {
    // prendo il post tramite slug
    const post = posts.find(post => post.slug === req.params.slug);

    // controllo se esiste, se non esiste interrompo
    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        })
    }

    // assegno i nuovi valori delle proprietà
    post.title = req.body.title;
    post.slug = req.body.slug;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;

    // salvo nel file
    fs.writeFileSync("./db/posts-db.js",
        `module.exports = ${JSON.stringify(posts, null, 2)}`);

    // ritorno solo l'oggetto aggiornato
    res.status(201).json({
        status: 201,
        data: post,
    });
}


const modify = (req, res) => {
    // prendo il post tramite slug
    const post = posts.find(post => post.slug === req.params.slug);

    // controllo se esiste, se non esiste interrompo
    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        })
    }

    // assegno il nuovo valore della proprietà, lasciando invariati quelli non compresi nel body della richiesta
    const modifiedPost = { ...post, ...req.body };

    // salvo nell'array posts l'oggetto modificato sovrascrivendo il vecchio oggetto con lo stesso indice
    posts[posts.indexOf(post)] = modifiedPost;

    // salvo nel file
    fs.writeFileSync("./db/posts-db.js",
        `module.exports = ${JSON.stringify(posts, null, 2)}`);

    // ritorno solo l'oggetto modificato
    res.status(201).json({
        status: 201,
        data: modifiedPost,
    });
}


const destroy = (req, res) => {
    // prendo il post tramite slug
    const post = posts.find(post => post.slug === req.params.slug);

    // controllo se esiste, se non esiste interrompo
    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        });
    }

    // filtro l'array e ritorno solo i post con slug divero
    const postsFiltered = posts.filter(post => post.slug !== req.params.slug);

    // salvo nel file
    fs.writeFileSync("./db/posts-db.js",
        `module.exports = ${JSON.stringify(postsFiltered, null, 4)}`);

    // ritorno il nuovo array senza l'oggetto cancellato
    res.status(201).json({
        status: 201,
        data: postsFiltered,
        counter: postsFiltered.length
    });
}


module.exports = {
    index,
    tagFilter,
    show,
    store,
    update,
    modify,
    destroy
}