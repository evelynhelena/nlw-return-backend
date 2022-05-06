import { SubmitFeedbackUseCases } from "./submitFeedbackUseCases";

const createFeedbackSpy = jest.fn();
const sendEmalSpy = jest.fn();

const submitFeeback = new SubmitFeedbackUseCases(
    {create: createFeedbackSpy},
    {sendMail: sendEmalSpy}
);

describe('Submit Feedback', () => {

    it('should be able to submit feedback', async () => {
        await expect(submitFeeback.execute({
            type: "BUG",
            comment:"Exemplo Comentário",
            screenshot: 'data:image/png;base64,teste.jpg'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmalSpy).toHaveBeenCalled();
    });

  it('should not be able to submit feedback without a type', async () => {
        await expect(submitFeeback.execute({
            type: "",
            comment:"Exemplo Comentário",
            screenshot: 'data:image/png;base64,teste.jpg'
        })).rejects.toThrow();
    }); 

    it('should not be able to submit feedback without a comment', async () => {
        await expect(submitFeeback.execute({
            type: "BUG",
            comment:"",
            screenshot: 'data:image/png;base64,teste.jpg'
        })).rejects.toThrow();
    }); 

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeeback.execute({
            type: "BUG",
            comment:"Exemplo Comentário",
            screenshot: 'teste.jpg'
        })).rejects.toThrow();
    }); 
})