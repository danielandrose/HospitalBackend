import express from "express"
import { getAllDoctors,
         getDoctor,createDoctor,
         updateDoctor,
         deleteDoctor } from "../controllers/doctors.controller.js";

const router=express.Router();

router.get('/',getAllDoctors)

router.get('/:id',getDoctor)

router.post('/',createDoctor)

router.put("/:id", updateDoctor);

router.delete('/:id',deleteDoctor)

export default router