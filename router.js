const router = require('express').Router();
const axios = require('axios');
const Movie = require('./models/movie.model');

// GET ALL MOVIES
router.route('/').get((req, res) => {
    Movie.find((err, movies) => {
        if (err) {console.log(err);}
        else {res.json(movies);}
    });
});

// GET ONE MOVIE
router.route('/:id').get((req, res) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (err) {console.log(err);}
        else {res.json(movie);}
    });
});

// UPDATE ONE MOVIE
router.route('/:id').put((req, res) => {
    let {list, updatedDate} = req.body;
    Movie.findByIdAndUpdate(req.params.id, {list, updatedDate}, (err, movie) => {
        if (err) {console.log(err);}
        else {res.json(movie);}
    });
});

// DELETE A MOVIE
router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id, (err, movie) => {
        if (err) {console.log(err);}
        else {res.json(movie);}
    });
});

/***** VOTES *****/
// VOTE FOR A MOVIE
// router.route('/:movie/votes').post((req, res) => {
//     let userId = getUserId(req.headers.authorization);
//     Movie.findByIdAndUpdate(req.params.movie, {$addToSet: {votes: userId}}, {new: false}, (err, movie) => {
//         if (!movie) {
//             res.status(404).send("Movie not found");
//         } else {
//             movie.save().then(movie => {
//                 if(movie.votes.includes(userId)) {
//                     res.status(409).send('User has already voted for this movie.')
//                 } else {
//                     res.status(200).send('Movie updated.');
//                 }
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//         }
//     });
// });

// REMOVE VOTE FOR A MOVIE
// router.route('/:movie/votes').delete((req, res) => {
//     let userId = getUserId(req.headers.authorization);
//     Movie.findByIdAndUpdate(req.params.movie, {$pull: {votes: userId}}, {new: false}, (err, movie) => {
//         if (!movie) {
//             res.status(404).send("Movie not found");
//         } else {
//             movie.save().then(oldMovie => {
//                 console.log(movie, oldMovie);
//                 if(!oldMovie.votes.includes(userId)) {
//                     res.status(404).send('User has not voted for this movie.')
//                 } else {
//                     res.status(200).send('Movie updated.');
//                 }
//             })
//             .catch(err => {
//                 res.status(400).send("Update not possible");
//             });
//         }
//     });
// });

module.exports = router;