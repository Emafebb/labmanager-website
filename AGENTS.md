# AGENTS.md

Repo-specific working rules for future agent sessions:

- Work directly in the current repository checkout by default.
- Do not create new git worktrees, temporary checkouts, or side workspaces unless the user explicitly asks for them.
- If a workflow skill recommends using a separate worktree, adapt that workflow to the current checkout instead.
- If the user asks to work on the currently checked out branch, make the changes there instead of creating a new branch or worktree.

See [CLAUDE.md]
/Users/emanuele/Documents/github/labmanager-website/CLAUDE.md
/

## ACT Workflow

ACT workflow storage for new Specs is configured in `.act/config.yaml`.

ACT workflow semantics, Workflow Storage selection, artifact vocabulary, and domain-doc guidance are defined in `.act/workflow.md`.
