import { createReport, getAllReport, getSingleReport, updateReport, deleteReport } from "../models/report.model.js";

export const addReport = async (req, res) => {
    try{
        await createReport(req.body);
        res.status(200).json({ message: "Report created successfully!" });
    }
    catch(err){
        console.error(`Error occured : ${err}`);
        res.status(500).json({ message:  "Internal server error." });
    }
};

export const getAllReports = async (req, res) => {
    try{
        const reports = await getAllReport();
        if(!reports){
            return res.status(404).json({ message: "No report found!" });
        }
        res.status(200).json(reports);
    }
    catch(err){
        console.error(`Error occured : ${err}`);
        res.status(500).json({ message:  "Internal server error." });
    }
};

export const getSpecificReport =  async (req, res) => {
    try{
        const report = await getSingleReport(req.params.id);
        if(!report){
            return res.status(404).json({ message: "No report found!" });
        }
        res.status(200).json(report);
    }
    catch(err){
        console.error(`Error occured : ${err}`);
        res.status(500).json({ message:  "Internal server error." });
    }
};

export const modifyReport = async (req, res) => {
    try{
        await updateReport(req.body, req.params.id);
        res.status(200).json({ message: "Report updated successfully!" });
    }
    catch(err){
        console.error(`Error occured : ${err}`);
        res.status(500).json({ message:  "Internal server error." });
    }
};

export const removeReport = async (req, res) => {
    try{
        await deleteReport(req.params.id);
        res.status(200).json({ message: "Report deleted successfully!" });
    }
    catch(err){
        console.error(`Error occured : ${err}`);
        res.status(500).json({ message:  "Internal server error." });
    }
};