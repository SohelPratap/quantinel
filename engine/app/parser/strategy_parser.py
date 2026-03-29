import json
import os
import anthropic

client = anthropic.AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """You are a trading strategy parser for Quantinel.
Convert plain-English trading strategies into a structured JSON object.

Output ONLY valid JSON — no markdown, no explanation.

JSON schema:
{
  "indicators": [
    {"name": "rsi",  "params": {"period": 14}},
    {"name": "ema",  "params": {"period": 20}}
  ],
  "entry": {
    "type": "rsi_below",
    "value": 30,
    "period": 14
  },
  "exit": {
    "type": "rsi_above",
    "value": 70,
    "period": 14
  },
  "position_size_pct": 100,
  "description": "Buy when RSI drops below 30 (oversold), sell when RSI rises above 70 (overbought)"
}

Supported entry/exit types:
  rsi_below, rsi_above,
  ema_cross_above, ema_cross_below,
  price_above, price_below

If the strategy is unclear or cannot be parsed, return:
{"error": "Could not parse strategy. Please be more specific."}
"""


async def parse_strategy(prompt: str) -> dict:
    """Use Claude to convert a plain-English strategy to structured rules."""
    message = await client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = message.content[0].text.strip()

    # Strip markdown fences if model wraps response
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]

    return json.loads(raw)
