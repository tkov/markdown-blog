const express = require('express');
const articleRouter = require('./routes/articles');
const app = express()
const Article = require('./models/articles')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/blog-wds')

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }));

app.use('/articles', articleRouter)
/*

*/

app.get('/', async (req, res) => {
    // creating some articles
    // const articles = [{
    //     title: 'Test Article 1',
    //     createdAt: new Date(),
    //     description: 'Test Description 1'
    // },
    // {
    //     title: 'Test Article 2',
    //     createdAt: new Date(),
    //     description: 'Test Description 2'
    // }
    // ]
    const articles = await Article.find().sort({ createdAt: 'desc'})
    // res.send('Hello World');
    // res.render('index'); // render looks for a view folder
    res.render('articles/index', { articles: articles })
})

app.listen(5000)