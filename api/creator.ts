import express from "express";
import { conn } from "../dbconnect";
import { PersonRequest } from "../model/person_req";
import mysql from "mysql";
import { queryAsync } from "../dbconnect";

export const router = express.Router();

router.get("/", (req, res) => {
	const select = "select * from creators";
	
	conn.query(select, (err,result)=>{
		if (err) {
			res.status(400).json(err);
			console.log("ERR400");
		} else {
			res.json(result);
		}
	});
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const select = "select * from creators where imdbID = ?";
	
	conn.query(select, [id], (err,result)=>{
		if (err) {
			res.status(400).json(err);
            console.log("ERR400");
		} else {
			res.json(result);
		}
	});
});

router.post("/", (req, res) => {
    const imdbID = req.query.imdbID;
    const pid = req.query.pid;
    const insert = "INSERT INTO creators (imdbID,pid)"+
	"VALUES (?, ?)"

	conn.query(insert, [
		imdbID,
        pid
	], (err,result,fields)=>{
        if (err) throw err;
        res.status(201).json({ 
            affected_row: result.affectedRows,
            last_idx: result.insertId 
        });
    });
});

router.delete("/", (req, res) => {
	const imdbID = req.query.imdbID;
    const pid = req.query.pid;
	const sql = "delete from creators where imdbID = ? and pid = ?";

	conn.query(sql,[imdbID, pid], (err,result)=>{
		if (err) throw err;
       res.status(200)
         .json({ affected_row: result.affectedRows });
	});
});