#!/usr/bin/env python3
"""fetch_figma.py
Utility script to download a Figma node (json) via the Figma REST API.

Usage:
    python fetch_figma.py <file_key> <node_id> [--output OUTPUT]

The script reads the personal access token from the MCP config
(~/.config/antigravity/mcp_config.json) or from the environment
variable ``FIGMA_PERSONAL_ACCESS_TOKEN``.

If the request fails (network error, non‑2xx status, or timeout) the
script automatically retries up to **5** times with a random delay of
2‑3 seconds between attempts. After the final attempt it raises an
exception and exits with a non‑zero status.
"""

import argparse
import json
import os
import random
import sys
import time
from pathlib import Path
from typing import Any, Dict

import requests

DEFAULT_RETRIES = 5
DELAY_RANGE = (2, 3)  # seconds
TIMEOUT = 10  # seconds for the HTTP request

def load_token() -> str:
    """Return the Figma personal access token.

    The function first checks the ``FIGMA_PERSONAL_ACCESS_TOKEN``
    environment variable. If it is not set, it tries to read the token
    from the Antigravity MCP configuration file located at
    ``~/.config/antigravity/mcp_config.json`` under the key
    ``mcpServers.figma.env.FIGMA_PERSONAL_ACCESS_TOKEN``.
    """
    token = os.getenv("FIGMA_PERSONAL_ACCESS_TOKEN")
    if token:
        return token
    # Fallback to MCP config
    cfg_path = Path.home() / ".config" / "antigravity" / "mcp_config.json"
    try:
        with cfg_path.open() as f:
            cfg = json.load(f)
        token = (
            cfg.get("mcpServers", {})
            .get("figma", {})
            .get("env", {})
            .get("FIGMA_PERSONAL_ACCESS_TOKEN")
        )
        if not token:
            raise KeyError
        return token
    except Exception as exc:
        raise RuntimeError(
            "Figma token not found – set FIGMA_PERSONAL_ACCESS_TOKEN env variable "
            "or ensure it exists in the MCP config"
        ) from exc

def fetch_node(file_key: str, node_id: str, token: str) -> Dict[str, Any]:
    """Fetch a node description from the Figma API.

    ``file_key`` – the part of the Figma URL after ``/file/``.
    ``node_id`` – the node identifier (e.g. ``1234:5678``).
    Returns the decoded JSON response.
    """
    url = f"https://api.figma.com/v1/files/{file_key}/nodes?ids={node_id}"
    headers = {"X-Figma-Token": token}
    response = requests.get(url, headers=headers, timeout=TIMEOUT)
    response.raise_for_status()
    return response.json()

def main() -> None:
    parser = argparse.ArgumentParser(description="Download a Figma node JSON with retries.")
    parser.add_argument("file_key", help="Figma file key (the part after /file/ in the URL)")
    parser.add_argument("node_id", help="Node ID to fetch (e.g. 6243:83625)")
    parser.add_argument(
        "--output",
        "-o",
        default=None,
        help="File path to write the JSON response (defaults to stdout)",
    )
    parser.add_argument(
        "--retries",
        type=int,
        default=DEFAULT_RETRIES,
        help="Maximum number of attempts (default: 5)",
    )
    args = parser.parse_args()

    token = load_token()
    attempt = 0
    while attempt < args.retries:
        attempt += 1
        try:
            data = fetch_node(args.file_key, args.node_id, token)
            # Success – break out of the retry loop
            break
        except (requests.RequestException, json.JSONDecodeError) as err:
            if attempt >= args.retries:
                print(f"[fetch_figma] Failed after {attempt} attempts: {err}", file=sys.stderr)
                sys.exit(1)
            # Wait a random delay between 2‑3 seconds before retrying
            delay = random.uniform(*DELAY_RANGE)
            print(
                f"[fetch_figma] Attempt {attempt}/{args.retries} failed ({err}). "
                f"Retrying in {delay:.1f}s…",
                file=sys.stderr,
            )
            time.sleep(delay)
    else:
        # This branch is unreachable because of sys.exit on failure, but kept for clarity
        print("[fetch_figma] Unexpected exit of retry loop", file=sys.stderr)
        sys.exit(1)

    # Output handling
    output_str = json.dumps(data, indent=2)
    if args.output:
        out_path = Path(args.output)
        out_path.write_text(output_str)
        print(f"[fetch_figma] Node saved to {out_path}")
    else:
        print(output_str)

if __name__ == "__main__":
    main()
