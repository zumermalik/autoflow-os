import { chromium, Page } from "playwright";
import { Action } from "../types";

export async function runBrowser(actions: Action[]) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const logs: string[] = [];
  const output: any[] = [];

  for (const action of actions) {
    try {
      if (action.type === "goto") {
        logs.push(`Navigating to ${action.url}`);
        await page.goto(action.url);
      }

      if (action.type === "click") {
        logs.push(`Clicking ${action.selector}`);
        await page.click(action.selector);
      }

      if (action.type === "type") {
        logs.push(`Typing into ${action.selector}`);
        await page.fill(action.selector, action.text);
      }

      if (action.type === "extract") {
        logs.push(`Extracting ${action.selector}`);
        const data = await page.$$eval(action.selector, els =>
          els.map(e => (e as HTMLElement).innerText)
        );
        output.push(data);
      }
    } catch (err) {
      logs.push(`Error: ${err}`);
    }
  }

  await browser.close();

  return { logs, output };
}
