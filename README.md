# STOCKSUNIFY2 - Scientific Stock Analysis Engine

[![Daily Audit](https://img.shields.io/badge/Audit-Daily%2021%3A00%20UTC-blue)](https://github.com/eltonaguiar/stocksunify2/actions)
[![Regime](https://img.shields.io/badge/Market%20Regime-BULLISH-green)](./data/v2/current.json)
[![Picks](https://img.shields.io/badge/Active%20Picks-30-purple)](./data/v2/current.json)

## 🚀 V2.1 Update - Multi-Algorithm Framework

**NEW:** STOCKSUNIFY2 now features **6 parallel scoring algorithms** with advanced scientific validation, delivering 30 daily picks across multiple strategies.

## Overview

STOCKSUNIFY2 is the **Scientific Validation Engine** for algorithmic stock analysis. Unlike traditional backtesting approaches, V2 enforces:

1. **Temporal Isolation** - Picks are timestamped and archived before market opens
2. **Regime Awareness** - Engine adapts to market conditions (SPY vs 200 SMA)
3. **Slippage Torture** - Returns are penalized with +0.5% worst-case entry simulation
4. **Immutable Ledger** - Every pick is SHA-256 hashed and committed to Git history

## Live Data

| Resource | Link |
|----------|------|
| Current Picks | [data/v2/current.json](./data/v2/current.json) |
| Historical Ledgers | [data/v2/history/](./data/v2/history/) |
| Research Paper | [STOCK_RESEARCH_ANALYSIS.md](./STOCK_RESEARCH_ANALYSIS.md) |

## V2.1 Scientific Algorithms

### 🎯 Core Algorithms

#### 1. **CAN SLIM** (Growth Screener)
Traditional William O'Neil methodology with V2 enhancements:
- **Relative Strength Rating** (quarterly weighted)
- **Stage-2 Uptrend Detection** (moving average alignment)
- **VCP Bonus** (+20 points for volatility contraction)
- **Institutional Footprint** (+10 points for price > VWAP)
- **Regime Penalty** (-30 in bear markets)

**Timeframe:** 3-12 months | **Risk:** Medium

#### 2. **Technical Momentum** (Breakout Hunter)
Short-term momentum across multiple timeframes (24h/3d/7d):
- **Volume Z-Score** (spike detection)
- **RSI Divergence** (momentum shifts)
- **Breakout Detection** (20-day high penetration)
- **Bollinger Squeeze** (volatility compression)

**Timeframe:** 1-7 days | **Risk:** High

#### 3. **Composite Rating** (Balanced Screener)
Combines technical + fundamental signals:
- **Trend Alignment** (50/200 SMA)
- **Volume Confirmation**
- **PE Ratio Filter** (< 25)
- **YTD Performance** (> 10%)
- **Regime Awareness** (caps at 40 in bear)

**Timeframe:** 1-3 months | **Risk:** Medium

### ⚡ Advanced Algorithms (V2.1)

#### 4. **Alpha Predator** (Scientific Composite) ⭐ **NEW**
Multi-dimensional alpha generator combining:
- **Trend Strength** (ADX > 25)
- **Bullish Momentum** (RSI 50-75)
- **Momentum Shift** (Awesome Oscillator > 0)
- **VCP Structure** (volatility contraction)
- **Institutional Support** (Price > VWAP)

**Timeframe:** 3 days | **Risk:** Medium | **Current Output:** 10 picks/day

#### 5. **Penny Sniper** (Microcap Hunter) ⚡ **NEW**
Targets explosive low-priced stocks ($0.50-$15):
- **Volume Liquidity** (> 500k average)
- **Volume Spike** (> 3x average)
- **Golden Cross** (5 SMA > 20 SMA)
- **Low Float** (< 50M shares)
- **Trend Alignment** (Price > 50 SMA)

**Timeframe:** 24 hours | **Risk:** Very High

#### 6. **Value Sleeper** (Mean Reversion) 💤 **NEW**
Fundamental value plays with reversion potential:
- **PE Ratio** (2-20 range)
- **ROE** (> 15%)
- **Debt/Equity** (< 0.8)
- **Near 52-Week Low** (< 20% of range)
- **Trend Safety** (Price > 200 SMA)

**Timeframe:** 3 months | **Risk:** Low

## 🧬 Scientific Indicators

### New V2.1 Indicators
- **VWAP (Volume Weighted Average Price)**: Institutional footprint detection
- **VCP (Volatility Contraction Pattern)**: Minervini-style base detection
- **ADX (Average Directional Index)**: Trend strength measurement (0-100)
- **AO (Awesome Oscillator)**: Momentum shift detection

### Core Indicators
- RSI, SMA (5/20/50/200), Bollinger Bands, ATR
- Volume Z-Score, Relative Strength Rating
- Stage-2 Uptrend Detection, Breakout Detection

## Architecture

```
STOCKSUNIFY2/
├── data/
│   ├── daily-stocks.json         # Latest 30 picks
│   └── picks-archive/            # Historical ledgers
│       └── YYYY-MM-DD.json
├── scripts/
│   ├── generate-daily-stocks.ts  # Main generator
│   └── lib/
│       ├── stock-data-fetcher-enhanced.ts
│       ├── stock-indicators.ts   # 15+ indicators
│       ├── stock-scorers.ts      # 6 algorithms
│       └── stock-api-keys.ts
└── public/data/                  # Web-facing data
```

## Usage

### Generate Daily Picks

```bash
npx tsx scripts/generate-daily-stocks.ts
```

**Output:** 30 picks with:
- SHA-256 audit hash
- Simulated slippage entry price
- Full indicator set
- Algorithm attribution

## Comparison: V1 vs V2.1

| Feature | STOCKSUNIFY (V1) | STOCKSUNIFY2 (V2.1) |
|---------|------------------|---------------------|
| **Algorithms** | 3 (CAN SLIM, Momentum, Composite) | **6** (+ Alpha Predator, Penny Sniper, Value Sleeper) |
| **Indicators** | 8 basic | **15+** (+ VWAP, VCP, ADX, AO) |
| **Regime Filter** | None | SPY > 200 SMA detection |
| **Slippage Model** | None | +0.5% entry penalty |
| **Audit Trail** | Basic timestamps | **SHA-256 immutable ledger** |
| **Fundamental Data** | PE only | **ROE, Debt/Equity, Shares Outstanding** |
| **Picks/Day** | 20 | **30** |

## Recent Performance (2026-01-28)

**Market Regime:** BULL (SPY: 695.49 > SMA200: 638.68)

**Top Picks:**
- **GM** (100/100) - Technical Momentum - STRONG BUY
- **WMT** (80/100) - Alpha Predator - BUY
- **PFE** (75/100) - CAN SLIM - BUY
- **SBUX** (70/100) - Composite - STRONG BUY

**Algorithm Distribution:**
- Technical Momentum: 11 picks
- Alpha Predator: 10 picks ⭐
- CAN SLIM: 5 picks
- Composite: 4 picks
- Penny Sniper: 0 (strict filters)
- Value Sleeper: 0 (fundamental thresholds)

## Disclaimer

This is experimental financial research software. All picks are for educational purposes only. Past performance does not guarantee future results. Always consult a licensed financial advisor.

## Links

- **Live Site**: [findtorontoevents.ca/findstocks2](https://findtorontoevents.ca/findstocks2)
- **V1 Classic**: [github.com/eltonaguiar/stocksunify](https://github.com/eltonaguiar/stocksunify)
- **Source Repo**: [github.com/eltonaguiar/TORONTOEVENTS_ANTIGRAVITY](https://github.com/eltonaguiar/TORONTOEVENTS_ANTIGRAVITY)

---

*Last Updated: 2026-01-28T07:16:30.000Z | V2.1 - Multi-Algorithm Framework Release*
