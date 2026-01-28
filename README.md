# 🔬 STOCKSUNIFY2: The Scientific Audit

> "Success in prediction is not about raw computational speed; it is about the structural integrity of your methodology."

**STOCKSUNIFY2** is a "Life-on-the-Line" algorithmic research engine. Unlike traditional trading tools that focus on backtesting "cool" ideas, STOCKSUNIFY2 focuses on **falsifiability** and **immutable audit trails**.

## 🛡️ The Core Values

1.  **Immutable Ledgering**: Every daily pick is timestamped and committed to a public GitHub history. Hindsight is physically impossible.
2.  **Regime Awareness**: Algorithms must verify the market "Weather" before trading. A strategy that only works in a bull run is not an edge—it is a factor tilt.
3.  **Slippage Torture**: Every pick is subjected to a "Torture Test" (2x-5x slippage penalty). If the profit evaporates under friction, the signal is a mirage.
4.  **Verification (The Truth Engine)**: Retroactive performance is automatically calculated every 7 days. We calculate realized returns against the actual truth of the market.

## 🕹️ Strategy Archetypes (V2)

- **RAR (Regime-Aware Reversion)**: Exploits mean reversion only in "Calm/Bull" market states.
- **VAM (Volatility-Adjusted Momentum)**: Uses the **Ulcer Index** to measure the "stress" of a trend.
- **LSP (Liquidity-Shielded Penny)**: High-conviction small-cap picks that must survive extreme slippage filters.
- **SCS (Scientific CAN SLIM)**: Institutional-grade growth screening with strict fundamental lag guards.
- **AT (Adversarial Trend)**: Volatility-normalized trend following that adapts to shifting market densities.

## 🏗️ Architecture

```text
/data
  /v2
    /history     <-- Immutable daily ledgers (YYYY/MM/DD)
    /performance <-- Weekly retroactive verification audits
/scripts
  /lib
    - v2-engine.ts  <-- The orchestrator
    - strategies.ts <-- The 5 scientific archetypes
  - generate-ledger.ts
  - verify-performance.ts
```

## 🚀 Execution

Generate today's scientific ledger:
```bash
npm run generate
```

Verify performance of past picks:
```bash
npm run verify
```

---

*This repository serves as a public proof-of-work for predictive alpha in the public markets.*