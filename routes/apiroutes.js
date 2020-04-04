const db = require('../db/db.json');
const fs = require('fs');
const {v1: uuidv1} = require('uuid');



module.exports = function(app) {
    app.post('/api/notes', (req, res) =>{
        const newNote = req.body;
        newNote.id = uuidv1();

        

        db.push(newNote);
        res.json(db);
        fs.writeFile('./db/db.json', JSON.stringify(db), err =>{
            if(err){
                throw err;
            }
        });
    });

    app.get('/api/notes', (req,res)=>{
        fs.readFile('./db/db.json','utf8', (err, data) =>{
            if(err){
                throw err;
            }
            
            res.json(JSON.parse(data));
            
        });
    });

    app.delete('/api/notes/:id', (req, res) => {
        // console.log(db);
        fs.readFile('./db/db.json', 'utf8', (err, data) =>{
            let db = JSON.parse(data);
            for(let i = 0; i < db.length; i++){
                if(db[i].id === req.params.id){
                    db.splice(i,1)
                }
            }; 
            fs.writeFile('./db/db.json', JSON.stringify(db), err =>{
                if(err){
                    throw err;
                }
                res.send(`Deleted note id: ${req.params.id}`)
            });
        });
        
    });
};

   