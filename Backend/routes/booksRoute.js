import express from "express";
import mongoose  from "mongoose";
import { Book } from "../models/bookModel.js"

const router = express.Router()

// route for create new book
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Send all the required  fields: author, title, publishYear  ",
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      try {
        const book = await Book.create(newBook);
        console.log("Data is added in db");
        return res.status(200).send(book);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get the All data
router.get("/", async (req, res) => {
    try {
      const books = await Book.find({}).sort({ createdAt: -1 });
      return res.status(200).send({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  // get the single data by id
router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Book" });
      }
      const book = await Book.findById(id);
      return res.status(200).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  // updating the data
router.put("/:id", async(req, res) => {
      try {
          if (!req.body.title || !req.body.author || !req.body.publishYear ) {
              return res.status(400).send({message: "Fill all the credentials"})
          }
          const {id} = req.params;
          if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(404).json({ error: "No such Book" });
            }
  
          const result = await Book.findByIdAndUpdate(id, req.body);
  
          if (!result) {
              return res.status(404).json({message: "Book not found"})
          }
          return res.status(200).send(result)
          
  
      } catch (error) {
          console.log(error.message);
          res.status(500).send({message: error.message})
      }
  })
  
  // deleting a document
router.delete("/:id", async(req, res) => {
      try {
          const {id} = req.params;
          if (!mongoose.Types.ObjectId.isValid(id)) {
              return res.status(404).json({ error: "No such Book" });
            }
  
          const result = await Book.findByIdAndDelete(id);
          if (!result) {
              return res.status(404).json({message: "Book not found"})
          }
          return res.status(200).json({message: "Book Deleted Succesfully"});
          
      } catch (error) {
          console.log(error.message);
          res.status(500).send({message: error.message})
      }
  })

  export default router;