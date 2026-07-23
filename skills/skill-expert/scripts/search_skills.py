# Copyright (c) 2026 MyCompany LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
Skill Expert — Search the skills.sh registry for Agent Skills.

This script uses `npx skills find` (the official Vercel CLI) as the primary
discovery method. It captures the CLI output, parses the skill listings,
and emits structured JSON to stdout for the agent to consume.

Usage:
    python search_skills.py "<query>"              # Search by keyword
    python search_skills.py "<query>" --limit 5    # Return up to 5 results

Output:
    JSON array of skill objects to stdout.
    Human-readable summary to stderr (for agent display).
"""

import sys
import json
import subprocess
import re
import shutil

# Ensure UTF-8 output on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")


def find_npx():
    """Locate the npx executable."""
    npx_path = shutil.which("npx")
    if npx_path:
        return npx_path
    # Common Windows paths
    for candidate in ["npx.cmd", "npx.exe", "npx"]:
        path = shutil.which(candidate)
        if path:
            return path
    return None


def search_via_cli(query: str, limit: int = 3) -> list[dict]:
    """
    Run `npx -y skills find <query>` and parse the output.
    The CLI prints a list of skills with name, repo, and description.
    """
    npx = find_npx()
    if not npx:
        print("ERROR: npx not found. Install Node.js to use this skill.", file=sys.stderr)
        return []

    try:
        result = subprocess.run(
            [npx, "-y", "skills", "find", query],
            capture_output=True,
            text=True,
            timeout=60,
            encoding="utf-8",
            errors="replace",
        )
    except subprocess.TimeoutExpired:
        print("ERROR: `npx skills find` timed out after 60s.", file=sys.stderr)
        return []
    except FileNotFoundError:
        print("ERROR: npx command not found.", file=sys.stderr)
        return []
    except Exception as e:
        print(f"ERROR: Failed to run npx skills find: {e}", file=sys.stderr)
        return []

    output = result.stdout + result.stderr

    # Remove ANSI escape codes
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    output = ansi_escape.sub("", output)
    
    # Print raw CLI output for debugging
    print(f"--- Raw CLI Output ---", file=sys.stderr)
    print(output[:2000], file=sys.stderr)
    print(f"--- End Raw Output ---", file=sys.stderr)

    # Parse the CLI output into structured results.
    #
    # The `npx skills find` output format is:
    #   Install with npx skills add <owner/repo@skill>
    #
    #   anthropics/skills@frontend-design 653.6K installs
    #   └ https://skills.sh/anthropics/skills/frontend-design
    #
    #   leonxlnx/taste-skill@design-taste-frontend 247K installs
    #   └ https://skills.sh/leonxlnx/taste-skill/design-taste-frontend
    #
    results = []
    lines = output.strip().split("\n")
    lines = [line.strip() for line in lines]

    # Pattern: owner/repo@skill-name <installs> installs
    # Also handles: owner@skill-name (no repo, e.g. smithery.ai@frontend-design)
    skill_pattern = re.compile(
        r'^([a-zA-Z0-9_.@-]+?)(?:/([a-zA-Z0-9_.-]+))?@([a-zA-Z0-9_.-]+)\s+([\d.]+[KMB]?)\s+installs?$',
        re.IGNORECASE
    )
    # URL pattern on the next line
    url_pattern = re.compile(r'https://skills\.sh/\S+')

    i = 0
    while i < len(lines) and len(results) < limit:
        line = lines[i]
        match = skill_pattern.match(line)
        if match:
            owner = match.group(1)
            repo = match.group(2) or ""  # May be None if no /repo segment
            skill_name = match.group(3)
            installs = match.group(4)

            # Check next line for URL
            url = ""
            if i + 1 < len(lines):
                url_match = url_pattern.search(lines[i + 1])
                if url_match:
                    url = url_match.group(0)
                    i += 1  # Skip the URL line

            # Build install command
            source = f"{owner}/{repo}@{skill_name}" if repo else f"{owner}@{skill_name}"
            
            results.append({
                "name": skill_name,
                "owner": owner,
                "repo": repo,
                "installs": installs,
                "url": url,
                "install_cmd": f"npx -y skills add {source} --yes",
            })

        i += 1

    return results


def format_recommendations(results: list[dict]) -> str:
    """Format results as a human-readable summary."""
    if not results:
        return "No skills found matching your query."

    lines = []
    medals = ["🥇", "🥈", "🥉", "4.", "5.", "6.", "7.", "8.", "9.", "10."]
    for i, skill in enumerate(results):
        medal = medals[i] if i < len(medals) else f"{i+1}."
        owner_repo = f"{skill['owner']}/{skill['repo']}"
        installs = skill.get("installs", "N/A")
        url = skill.get("url", "")

        lines.append(f"{medal} **{skill['name']}** — {owner_repo}")
        lines.append(f"   Installs: {installs}")
        if url:
            lines.append(f"   URL: {url}")
        lines.append(f"   Install: {skill['install_cmd']}")
        lines.append("")

    return "\n".join(lines)


def main():
    args = sys.argv[1:]
    limit = 3

    # Parse --limit flag
    if "--limit" in args:
        idx = args.index("--limit")
        try:
            limit = int(args[idx + 1])
            args = args[:idx] + args[idx + 2:]
        except (IndexError, ValueError):
            print("Error: --limit requires an integer value.", file=sys.stderr)
            sys.exit(1)

    if not args:
        print("Usage:", file=sys.stderr)
        print('  python search_skills.py "<query>"', file=sys.stderr)
        print('  python search_skills.py "<query>" --limit 5', file=sys.stderr)
        sys.exit(1)

    query = " ".join(args)
    print(f"Searching skills.sh for: \"{query}\"...", file=sys.stderr)

    results = search_via_cli(query, limit=limit)

    # Output JSON to stdout (machine-readable for the agent)
    print(json.dumps(results, indent=2, ensure_ascii=False))

    # Output human-readable summary to stderr
    summary = format_recommendations(results)
    print("\n--- Skill Recommendations ---", file=sys.stderr)
    print(summary, file=sys.stderr)

    if not results:
        print("TIP: If no results were found, the agent should fall back to", file=sys.stderr)
        print("     a web search for: site:skills.sh <query>", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
