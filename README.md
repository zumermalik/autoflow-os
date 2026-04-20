# AutoFlow OS

Most software is just a website.

Which means...

Most workflows are just clicking buttons in a browser.

So instead of building more APIs,
I built a way to use the browser itself as the API.

---

## What this is

AutoFlow OS is an AI-powered browser automation engine.

You describe what you want.

It opens a real browser,
clicks,
types,
extracts data,
and gets the job done.

No APIs.
No integrations.
Just execution.

---

## Example

Input:

"Go to example.com and extract all headings"

What happens:

- Browser launches
- Navigates to the site
- Finds the elements
- Returns structured data

---

## Why this exists

APIs are great.

Until they don’t exist.

Or they’re locked.
Or rate-limited.
Or too expensive.

But every company still has a website.

So instead of asking for access...

we just use the interface.

---

## Tech

- Playwright (real browser automation)
- OpenAI (turns text into actions)
- Fastify (API layer)
- TypeScript (because we’re not animals)

---

## Run it

```bash
npm install
npx playwright install
npm run dev
````

Then:

POST [http://localhost:3000/workflows/run](http://localhost:3000/workflows/run)

```json
{
  "input": "Go to https://example.com and extract all h1 tags"
}
```

---

## Important

This is built for:

* user-authorized workflows
* automation
* productivity

Not for:

* abusing platforms
* bypassing protections
* doing shady scraping

Use it like a tool.
Not like a weapon.

---

## What’s next

* self-healing selectors
* visual workflow builder
* multi-step agents
* session memory

---

## Final thought

If a human can do it in a browser...

this should be able to do it too.

That’s the goal.