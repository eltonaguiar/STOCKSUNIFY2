/**
 * Enhanced Stock Data Fetcher (Audited for STOCKSUNIFY2)
 */

import { STOCK_API_KEYS, API_PRIORITY } from './stock-api-keys';

export interface StockData {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    avgVolume: number;
    marketCap?: number;
    pe?: number;
    high52Week?: number;
    low52Week?: number;
    history?: {
        date: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
    }[];
}

async function fetchFromYahoo(symbol: string): Promise<StockData | null> {
    try {
        const quoteUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1y`;
        const response = await fetch(quoteUrl);
        if (!response.ok) return null;

        const data = await response.json();
        const result = data.chart?.result?.[0];
        if (!result) return null;

        const meta = result.meta || {};
        const timestamps = result.timestamp || [];
        const closes = result.indicators?.quote?.[0]?.close || [];
        const volumes = result.indicators?.quote?.[0]?.volume || [];
        const highs = result.indicators?.quote?.[0]?.high || [];
        const lows = result.indicators?.quote?.[0]?.low || [];
        const opens = result.indicators?.quote?.[0]?.open || [];

        const currentPrice = meta.regularMarketPrice || meta.previousClose || 0;
        const previousClose = meta.previousClose || currentPrice;
        const change = currentPrice - previousClose;
        const changePercent = previousClose ? (change / previousClose) * 100 : 0;

        const history = timestamps.map((ts: number, i: number) => ({
            date: new Date(ts * 1000).toISOString().split('T')[0],
            open: opens[i] || 0,
            high: highs[i] || 0,
            low: lows[i] || 0,
            close: closes[i] || 0,
            volume: volumes[i] || 0
        })).filter((h: any) => h.close > 0);

        const recentVolumes = volumes.slice(-50).filter((v: number) => v > 0);
        const avgVolume = recentVolumes.length > 0
            ? recentVolumes.reduce((a: number, b: number) => a + b, 0) / recentVolumes.length
            : meta.regularMarketVolume || 0;

        return {
            symbol: symbol.toUpperCase(),
            name: meta.longName || meta.shortName || symbol,
            price: currentPrice,
            change,
            changePercent,
            volume: meta.regularMarketVolume || 0,
            avgVolume,
            history
        };
    } catch (err) {
        return null;
    }
}

async function fetchFromPolygon(symbol: string): Promise<StockData | null> {
    try {
        const apiKey = STOCK_API_KEYS.POLYGON;
        const quoteUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apikey=${apiKey}`;
        const response = await fetch(quoteUrl);
        if (!response.ok) return null;
        const data = await response.json();
        if (!data.results || data.results.length === 0) return null;

        const prev = data.results[0];
        const price = prev.c;
        const volume = prev.v;

        const endDate = new Date();
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        const historyUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}?adjusted=true&sort=asc&apikey=${apiKey}`;
        const hRes = await fetch(historyUrl);
        let history: any[] = [];
        if (hRes.ok) {
            const hData = await hRes.json();
            if (hData.results) {
                history = hData.results.map((r: any) => ({
                    date: new Date(r.t).toISOString().split('T')[0],
                    open: r.o, high: r.h, low: r.l, close: r.c, volume: r.v
                }));
            }
        }

        const previousClose = history.length > 1 ? history[history.length - 2].close : price;
        const change = price - previousClose;
        const changePercent = (change / previousClose) * 100;

        return {
            symbol: symbol.toUpperCase(),
            name: symbol,
            price,
            change,
            changePercent,
            volume,
            avgVolume: volume, // Simple version
            history
        };
    } catch (err) {
        return null;
    }
}

export async function fetchStockData(symbol: string): Promise<StockData | null> {
    for (const api of API_PRIORITY) {
        let data: StockData | null = null;
        if (api === 'YAHOO_FINANCE') data = await fetchFromYahoo(symbol);
        else if (api === 'POLYGON') data = await fetchFromPolygon(symbol);

        if (data) return data;
    }
    return null;
}

export async function fetchMultipleStocks(symbols: string[]): Promise<StockData[]> {
    const results: StockData[] = [];
    for (const symbol of symbols) {
        const data = await fetchStockData(symbol);
        if (data) results.push(data);
        await new Promise(r => setTimeout(r, 500)); // Rate limit buffer
    }
    return results;
}
