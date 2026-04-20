import { FastifyInstance } from "fastify";

export async function runRoutes(app: FastifyInstance) {
  app.get("/runs/:id", async () => {
    return { status: "not implemented" };
  });
}
