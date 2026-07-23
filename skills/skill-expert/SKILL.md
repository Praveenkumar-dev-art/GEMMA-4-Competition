---
name: skill-expert
description: Discovers and recommends the best Agent Skills from the Vercel skills.sh registry for the user's current task. Use when the user asks to find, search, discover, or install an agent skill, or when the user says "find me a skill", "search skills", "install a skill", "what skills are available", or similar.
---

# Skill Expert — Agent Skill Discovery & Installation

This skill turns the agent into a skill discovery assistant. It searches the [skills.sh](https://skills.sh) registry (Vercel's open Agent Skills marketplace) and recommends the top skills for the user's current task.

## When to Activate

- The user asks to **find**, **search**, **discover**, or **browse** agent skills.
- The user asks to **install a skill** from the Vercel/skills.sh registry.
- The user describes a task and you believe a community skill could help (proactively suggest).

## Workflow

### Step 1: Understand the Task
Ask the user what they need help with, or infer it from the conversation context. Distill the need into 1–3 short search keywords (e.g., `frontend design`, `git workflow`, `testing`).

### Step 2: Search the Registry
Run the helper script which uses `npx skills find` (the official Vercel CLI) under the hood:

```bash
python -u D:/agy-cli-projects/.agents/skills/skill-expert/scripts/search_skills.py "<search_query>"
```

The script returns JSON to stdout with skill results including: name, owner/repo, description, and install command.

**Fallback Strategy (if the script returns no results or errors):**
1. Try a **web search** for `site:skills.sh <query>` to find skills on the registry website.
2. Try a **web search** for `site:github.com agent-skill <query>` to find skill repos directly on GitHub.
3. Read the skills.sh leaderboard page at `https://skills.sh` for trending/popular skills.

### Step 3: Present Top 3 Recommendations
Format the results as a numbered list with:
1. **Skill Name** — `owner/repo`
2. **Summary**: A 1–2 sentence description of what the skill does.
3. **Why it fits**: A brief explanation of why this skill is relevant to the user's current task.
4. **Installs**: The number of installations (popularity signal).

Example output:
```
1. 🥇 **frontend-design** — vercel/agent-skills
   Summary: Guides agents to build polished, accessible UIs with modern CSS.
   Why it fits: You're building a web dashboard — this skill ensures premium design output.
   Installs: 12,400

2. 🥈 **tailwind-expert** — shadcn/skills
   Summary: Deep Tailwind CSS knowledge with component patterns.
   Why it fits: Great for utility-first CSS if you prefer Tailwind over vanilla CSS.
   Installs: 8,200

3. 🥉 **accessibility-checker** — a11y-tools/skills
   Summary: Validates HTML for WCAG compliance and suggests fixes.
   Why it fits: Ensures your UI is accessible to all users.
   Installs: 5,100
```

### Step 4: User Selects a Skill
Wait for the user to choose one of the recommendations (by number or name).

### Step 5: Install the Selected Skill
Run the installation command:

```bash
npx -y skills add <owner/repo> --skill <skill-name> --yes
```

**Important flags:**
- `--yes` (`-y`): Skip confirmation prompts for non-interactive execution.
- `--skill <name>`: Install only the specific skill if the repo contains multiple.

After installation, confirm the skill was added by checking if the new folder exists under:
- `D:/agy-cli-projects/.agents/skills/` (project-level)

### Step 6: Confirm & Brief
Tell the user:
- The skill is now installed and active.
- Give a 1-sentence summary of what the skill enables.
- Suggest how to use it (e.g., "Just ask me to review your frontend code and I'll use this skill automatically").

## Additional Commands

| User Intent | Action |
| :--- | :--- |
| "List installed skills" | Run `npx -y skills list` in the project root |
| "Show popular skills" | Run the search script with query `"top"` or search for `site:skills.sh top skills` |
| "Remove a skill" | Delete the skill folder from `.agents/skills/<skill-name>/` |

## Error Handling
- If `npx` is not available, suggest the user install Node.js first.
- If the API is unreachable, fall back to web search on skills.sh.
- If the search returns no results, broaden the search terms or suggest the user describe their need differently.
