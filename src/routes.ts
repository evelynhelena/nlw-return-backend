import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodeMailerMailAdapter";
import { PrismaFeedbackRepository } from "./repositories/prisma/prismaFeedbackRepository";
import { SubmitFeedbackUseCases } from "./useCases/submitFeedbackUseCases";
export const routes = express.Router();


routes.post('/feedbacks', async (req, res) => {
    const { type, comment , screenshot} = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeebackUseCase =  new SubmitFeedbackUseCases(prismaFeedbackRepository,nodemailerMailAdapter);

    await submitFeebackUseCase.execute({type, comment , screenshot});

    return res.status(201).send("Feedback Criadno");
})