const express = require('express');
const fs = require('fs');
const Note = require('../models/Note');
const mongoose = require('mongoose');
const noteRouter = new express.Router();

noteRouter.get('/notes', (req, res) => {
    Note.find().limit(50).then(notes => {
        res.render('notes',{notes: notes});
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

noteRouter.get('/create', (req, res) => {
    res.render('addNote');
})

noteRouter.post('/create', (req, res) => {
    
    const note = { title : req.body.title, description: req.body.description};
    if(req.body.important === 'important'){
        console.log("Checkbox clicked!!");
    }else{
        console.log("Not clicked!!");
    }
    
    Note.create(note).then(result => {
        res.redirect('notes');
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
});

noteRouter.get('/edit/:id',(req,res)=>{
    const id = req.params.id;
    console.log("========== Note ID ===========",id);
    Note.findById({_id: new mongoose.mongo.ObjectId(id)}).then((note)=>{
        res.render('editNote',{title: note.title, description: note.description});
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

noteRouter.post('/edit/:id',(req,res)=>{
    const id = req.params.id;
    Note.updateOne({_id: new mongoose.mongo.ObjectId(id)},{title: req.body.title, description: req.body.description}).then((note)=>{
        console.log("Update Success!!")
        res.redirect('../notes');
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
})

noteRouter.get('/delete/:id',(req,res) => {
    const id = req.params.id
    Note.deleteOne({_id : id}).then((result)=> {
        res.redirect('back');
    }).catch(err => {
        res.send(err);
    })
})

noteRouter.get('/view/:id',(req,res)=>{
    const id = req.params.id
    Note.findById(new mongoose.mongo.ObjectId(id))
    .then(note => {
        if(note === undefined || note === null){
            res.send('<h1>Note  not found...</h1>')
        }
        res.render('viewNote',{note: note});
    }).catch(err => {
        res.send(err);
    })
})

module.exports = noteRouter;