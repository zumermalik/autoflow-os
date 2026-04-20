import { generateSteps } from "./agent";
import { runBrowser } from "./browser";

export async function runWorkflow(input: string) {
  const steps = await generateSteps(input);
  const result = await runBrowser(steps);

  return {
    steps,
    ...result,
  };
}
