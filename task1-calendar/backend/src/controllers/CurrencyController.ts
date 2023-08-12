import { client } from "../database/database";
import express from "express";


interface CountryItem {
    no: any;
    country: string;
    value: any;
    id: number;
}

// let initialData:CountryItem[] = [
//     { no: 1, country: "Country A", value: 100 },
//     { no: 2, country: "Country B", value: 100 },
//     { no: 3, country: "Country C", value: 100 },
//     { no: 4, country: "Country D", value: 100 },
// ];

export const getCurrency = async (req:express.Request, res:express.Response ) =>{
    const place = req.params.id
    let responseData:CountryItem[] =[];
    try{
        //console.log(boxes.length);
        client.query(`SELECT * FROM "Currency2"`,(err,results)=>{
            if(!err){
                let index = 1;
                const responseData: CountryItem[] = results.rows.map((row) => ({
                    no: index++, // Assuming that 'id' in the database corresponds to 'no'
                    country: row.country,
                    value: row.value,
                    id: row.id
                }));
                res.status(200).json(responseData);
        
            }else{
                console.log(err.message);
            }
        })
        // res.status(200).json(initialData);
    }catch(err){
        res.status(500).send({
            message: "Error get Box",
            err,
        });
    }
}

export const addCurrency = async (req:express.Request, res:express.Response ) => {
    const newCurrency:CountryItem = req.body;
    console.log(req.body);
    try {
        client.query(`INSERT INTO "Currency2" (country, value) VALUES ($1, $2) RETURNING *`, [newCurrency.country, newCurrency.value],(err,results)=>{
            if(err){
                throw err                   
            }
            res.status(200).send(`User added with ID: ${results.rows[0].id}`)  
        })
    } catch (err) {
      res.status(500).send({
        message: "Error add country",
        err,
      });
    }
};

export const deleteCurrency = async (req:express.Request, res:express.Response ) => {
    const deletedCurrency:CountryItem = req.body;
    try {
        client.query(`DELETE FROM "Currency2" WHERE id = $1`, [deletedCurrency.id], (err,results)=>{
            if(err){
                throw err                   
            }
            res.status(200).send(`User deleted with ID: ${deletedCurrency.id}`)  
        })
    } catch (err) {
      res.status(500).send({
        message: "Error delete country",
        err,
      });
    }
};