import express from "express";
import { addReport, getAllReports, getSpecificReport, modifyReport, removeReport } from "../controllers/report.controller.js";

const reportRoutes = express.Router();

reportRoutes.get('/view-reports', getAllReports);
reportRoutes.get('/view-report/:id', getSpecificReport);
reportRoutes.post('/add-report', addReport);
reportRoutes.put('/update-report/:id', modifyReport);
reportRoutes.delete('/delete-report/:id', removeReport);

export default reportRoutes;