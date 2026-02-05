#!/usr/bin/env tsx
/**
 * STOCKSUNIFY2: Daily Ledger Generator
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { generateScientificPicks } from './lib/v2-engine';

async function main() {
    console.log('🔬 STOCKSUNIFY2: Initializing Deep Research Audit...');

    const timestamp = new Date();
    const dateStr = timestamp.toISOString();
    const [datePortion] = dateStr.split('T'); // YYYY-MM-DD
    const [year, month, day] = datePortion.split('-');

    try {
        const { picks, regime, stockDataMap } = await generateScientificPicks();

        const auditObject = {
            version: '2.0.0',
            date: datePortion,
            timestamp: dateStr,
            regime,
            metadata: {
                engine: 'STOCKSUNIFY2-Scientific',
                system: process.platform,
                checksPerformed: ['Purging', 'Slippage-Stress', 'Regime-Detection']
            },
            picks: picks.map((p: any) => ({
                ...p,
                audit_id: `v2-${p.symbol}-${timestamp.getTime()}`
            }))
        };

        // 1. Immutable Archiving
        const historyDir = path.join(process.cwd(), 'data', 'v2', 'history', year, month);
        if (!fs.existsSync(historyDir)) {
            fs.mkdirSync(historyDir, { recursive: true });
        }

        const historyPath = path.join(historyDir, `${day}.json`);
        fs.writeFileSync(historyPath, JSON.stringify(auditObject, null, 2));
        console.log(`✅ Immutable Ledger created: ${historyPath}`);

        // 2. Update Index
        const indexPath = path.join(process.cwd(), 'data', 'v2', 'ledger-index.json');
        let index = [];
        if (fs.existsSync(indexPath)) {
            index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        }

        // Remove old entry for today if exists, then add new one
        index = index.filter((e: any) => e.date !== datePortion);
        index.unshift({
            date: datePortion,
            count: picks.length,
            version: '2.0.0'
        });

        fs.writeFileSync(indexPath, JSON.stringify(index.slice(0, 31), null, 2)); // Keep 31 days in index

        // 3. Write current.json (live picks)
        const currentPath = path.join(process.cwd(), 'data', 'v2', 'current.json');
        fs.writeFileSync(currentPath, JSON.stringify(auditObject, null, 2));
        console.log(`✅ Current picks updated: ${currentPath}`);

        // 4. Write daily-stocks.json (findstocks-compatible format)
        const dailyStocks = picks.map((p: any) => {
            const sd = stockDataMap.get(p.symbol) || {};
            const price = sd.price || 0;
            const slippageFactor = 1.005;
            const pickHashInput = `${p.symbol}-${dateStr}-${p.algorithm}-${p.score}`;
            const pickHash = crypto.createHash('sha256').update(pickHashInput).digest('hex');
            return {
                symbol: p.symbol,
                name: p.name,
                price,
                change: sd.change || 0,
                changePercent: sd.changePercent || 0,
                rating: p.rating,
                timeframe: p.timeframe,
                algorithm: p.algorithm,
                score: p.score,
                risk: p.risk,
                stopLoss: +(price * 0.95).toFixed(2),
                indicators: p.metrics,
                allAlgorithms: [p.algorithm],
                slippageSimulated: true,
                entryPrice: price,
                simulatedEntryPrice: +(price * slippageFactor).toFixed(4),
                pickedAt: dateStr,
                pickHash,
            };
        });

        const dailyStocksOutput = {
            lastUpdated: dateStr,
            totalPicks: dailyStocks.length,
            stocks: dailyStocks,
        };

        const dailyStocksPath = path.join(process.cwd(), 'data', 'daily-stocks.json');
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(dailyStocksPath, JSON.stringify(dailyStocksOutput, null, 2));
        console.log(`✅ Daily stocks written: ${dailyStocksPath}`);

    } catch (error) {
        console.error('❌ CRITICAL: Audit Generation Failed', error);
        process.exit(1);
    }
}

main();
