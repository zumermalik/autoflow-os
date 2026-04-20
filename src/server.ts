import Fastify from "fastify";
import { workflowRoutes } from "./routes/workflows";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify();

app.register(workflowRoutes);

app.get("/", async () => {
  return { status: "AutoFlow OS running" };
});

app.listen({ port: 3000 }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server running on http://localhost:3000");
});
