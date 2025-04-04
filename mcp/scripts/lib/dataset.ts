/**
 * TODO: Implement:
 * 1. Load a dataset by symbol (source, period, dates)
 * 2. Check if an agent has access to dataset
 * 3. Return dataset
 */
export function getCandles(symbol: string): Object | undefined {
  if (symbol === "ETHUSDT") {
    return [
      {
        date: "2025-03-05",
        open: 2500.5,
        high: 2550.75,
        low: 2480.2,
        close: 2530.1,
        volume: 12000.5,
      },
      {
        date: "2025-03-06",
        open: 2530.1,
        high: 2575.3,
        low: 2510.0,
        close: 2560.4,
        volume: 13500.0,
      },
      {
        date: "2025-03-07",
        open: 2560.4,
        high: 2600.0,
        low: 2545.6,
        close: 2580.9,
        volume: 11000.8,
      },
      {
        date: "2025-03-08",
        open: 2580.9,
        high: 2590.25,
        low: 2550.1,
        close: 2570.3,
        volume: 9800.2,
      },
      {
        date: "2025-03-09",
        open: 2570.3,
        high: 2585.5,
        low: 2530.7,
        close: 2545.8,
        volume: 10200.4,
      },
      {
        date: "2025-03-10",
        open: 2545.8,
        high: 2560.0,
        low: 2500.0,
        close: 2520.6,
        volume: 11500.7,
      },
      {
        date: "2025-03-11",
        open: 2520.6,
        high: 2540.9,
        low: 2485.3,
        close: 2505.2,
        volume: 12500.1,
      },
      {
        date: "2025-03-12",
        open: 2505.2,
        high: 2525.75,
        low: 2470.0,
        close: 2510.5,
        volume: 13000.3,
      },
      {
        date: "2025-03-13",
        open: 2510.5,
        high: 2550.0,
        low: 2500.1,
        close: 2535.7,
        volume: 11800.9,
      },
      {
        date: "2025-03-14",
        open: 2535.7,
        high: 2570.2,
        low: 2520.4,
        close: 2565.1,
        volume: 14000.6,
      },
      {
        date: "2025-03-15",
        open: 2565.1,
        high: 2580.0,
        low: 2540.5,
        close: 2555.9,
        volume: 10500.2,
      },
      {
        date: "2025-03-16",
        open: 2555.9,
        high: 2575.3,
        low: 2535.8,
        close: 2560.2,
        volume: 9900.5,
      },
      {
        date: "2025-03-17",
        open: 2560.2,
        high: 2600.5,
        low: 2550.0,
        close: 2590.7,
        volume: 12300.8,
      },
      {
        date: "2025-03-18",
        open: 2590.7,
        high: 2610.0,
        low: 2575.2,
        close: 2600.3,
        volume: 13700.4,
      },
      {
        date: "2025-03-19",
        open: 2600.3,
        high: 2625.75,
        low: 2580.1,
        close: 2615.5,
        volume: 14500.0,
      },
      {
        date: "2025-03-20",
        open: 2615.5,
        high: 2630.0,
        low: 2590.6,
        close: 2605.2,
        volume: 12800.7,
      },
      {
        date: "2025-03-21",
        open: 2605.2,
        high: 2615.3,
        low: 2570.0,
        close: 2585.9,
        volume: 11500.3,
      },
      {
        date: "2025-03-22",
        open: 2585.9,
        high: 2595.5,
        low: 2555.2,
        close: 2570.4,
        volume: 10800.1,
      },
      {
        date: "2025-03-23",
        open: 2570.4,
        high: 2580.0,
        low: 2540.7,
        close: 2550.8,
        volume: 9700.9,
      },
      {
        date: "2025-03-24",
        open: 2550.8,
        high: 2565.2,
        low: 2520.0,
        close: 2535.6,
        volume: 11200.5,
      },
      {
        date: "2025-03-25",
        open: 2535.6,
        high: 2550.0,
        low: 2505.3,
        close: 2520.1,
        volume: 12000.2,
      },
      {
        date: "2025-03-26",
        open: 2520.1,
        high: 2535.75,
        low: 2480.0,
        close: 2500.5,
        volume: 13000.8,
      },
      {
        date: "2025-03-27",
        open: 2500.5,
        high: 2520.0,
        low: 2475.4,
        close: 2510.9,
        volume: 12500.6,
      },
      {
        date: "2025-03-28",
        open: 2510.9,
        high: 2540.3,
        low: 2500.0,
        close: 2530.2,
        volume: 11800.4,
      },
      {
        date: "2025-03-29",
        open: 2530.2,
        high: 2555.5,
        low: 2515.7,
        close: 2545.8,
        volume: 10700.0,
      },
      {
        date: "2025-03-30",
        open: 2545.8,
        high: 2560.0,
        low: 2530.1,
        close: 2550.3,
        volume: 9900.7,
      },
      {
        date: "2025-03-31",
        open: 2550.3,
        high: 2575.2,
        low: 2540.5,
        close: 2565.9,
        volume: 11400.3,
      },
      {
        date: "2025-04-01",
        open: 2565.9,
        high: 2590.0,
        low: 2555.2,
        close: 2580.4,
        volume: 12200.9,
      },
      {
        date: "2025-04-02",
        open: 2580.4,
        high: 2600.5,
        low: 2570.0,
        close: 2595.7,
        volume: 13500.5,
      },
      {
        date: "2025-04-03",
        open: 2595.7,
        high: 2615.3,
        low: 2585.1,
        close: 2605.2,
        volume: 12800.2,
      },
    ];
  }
  return undefined;
}
