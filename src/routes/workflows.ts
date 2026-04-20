import { FastifyInstance } from "fastify";
import { runWorkflow } from "../services/runner";

export async function workflowRoutes(app: FastifyInstance) {
  app.post("/workflows/run", async (req, res) => {
    const { input } = req.body as { input: string };

    const result = await runWorkflow(input);

    return res.send(result);
  });
}
