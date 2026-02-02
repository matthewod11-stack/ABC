# Codex CLI Invocation Fix Needed

**Issue Date:** 2026-02-01
**Status:** ✅ RESOLVED - 2026-02-01

## Problem

The `/spec-review-multi` skill needs to update how it calls Codex CLI.

### What Failed
```bash
# This doesn't work (TTY required):
codex --full-auto --quiet "prompt" > output.md

# Error: stdin is not a terminal
```

### What Worked
```bash
# Pipe the prompt via stdin with `-` flag:
cat prompt.txt | codex exec --full-auto -o output.md -

# Or alternatively:
codex exec --full-auto -o output.md - < prompt.txt
```

## Key Findings

1. `codex exec` subcommand is for non-interactive use
2. Use `-o FILE` to specify output file (not `> redirect`)
3. Use `-` as the prompt argument to read from stdin
4. `--full-auto` enables low-friction sandboxed execution

## Update Needed

In `~/.claude/reference/multi-agent-review-protocol.md`, change:

```bash
# OLD (doesn't work):
codex exec --full-auto -o "$OUTPUT_FILE" "$PROMPT"

# NEW (works):
cat "$PROMPT_FILE" | codex exec --full-auto -o "$OUTPUT_FILE" -
```

Or use a heredoc:
```bash
codex exec --full-auto -o "$OUTPUT_FILE" - << 'EOF'
$PROMPT_CONTENT
EOF
```

## Files to Update

- `~/.claude/reference/multi-agent-review-protocol.md`
- Any skills that invoke `codex` directly

---

## Resolution

**Fixed on:** 2026-02-01

Updated the following global files to use stdin piping:
- `~/.claude/reference/protocol-multi-agent-review.md`
- `~/.claude/commands/spec-review-multi.md`
- `~/.claude/commands/multi-model-launch.md`

Pattern changed from:
```bash
codex exec --full-auto -o "$OUTPUT_FILE" "$PROMPT"
```

To:
```bash
echo "$PROMPT" | codex exec --full-auto -o "$OUTPUT_FILE" -
```
