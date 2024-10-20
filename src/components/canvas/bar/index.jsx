'use client';
import { useMemo, useEffect, useState } from 'react';
import { Line, Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as d3 from 'd3'; // If you are using d3 to read CSV data

const priceScale = 1000;

function Bar({ open, close, high, low, position, isCurrent, onHover }) {
  const barHeight = (high - low) / priceScale;
  const color = close >= open ? 'green' : 'red';
  const animatedColor = isCurrent ? 'yellow' : color;

  return (
    <mesh position={position} onPointerOver={onHover}>
      <boxGeometry args={[0.3, barHeight, 0.3]} />
      <meshStandardMaterial color={animatedColor} />
    </mesh>
  );
}

const Bars = () => {
    const [data, setData] = useState([]);
    const [hoveredCandle, setHoveredCandle] = useState(null);
    const { scene } = useThree();

    // Load historical data from CSV
    const loadCSVData = async () => {
      const response = await d3.csv('/path/to/your/historical_data.csv'); // Update the path to your CSV
      const historicalData = response.map(d => ({
        open: +d.open,
        close: +d.close,
        high: +d.high,
        low: +d.low,
      }));
      return historicalData;
    };

    useEffect(() => {
      const fetchData = async () => {
        const historicalData = await loadCSVData(); // Load historical data
        const response = await fetch('/api/marketData');
        const json = await response.json();

        if (json.error) {
          console.error('Error fetching data:', json.error);
          return;
        }

        // Combine historical data with fetched data
        const fetchedData = json.symbols.map(symbol => ({
          open: parseFloat(symbol.lowest) || 0,
          close: parseFloat(symbol.last) || 0,
          high: parseFloat(symbol.highest) || 0,
          low: parseFloat(symbol.lowest) || 0,
        }));

        const combinedData = [...historicalData, ...fetchedData];
        setData(combinedData.slice(-12)); // Keep only the latest 12 candlesticks
      };

      fetchData();
    }, []);

  const bars = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Fetched data is not an array or is empty:', data);
      return null;
    }

    return data.map((point, index) => {
      const open = point.open;
      const close = point.close;
      const high = point.high;
      const low = point.low;

      return (
        <Bar
          key={index}
          open={open}
          close={close}
          high={high}
          low={low}
          position={[index * 1, (high + low) / 20000, 0]} // Adjust positioning
          isCurrent={index === data.length - 1}
          onHover={() => setHoveredCandle(point)}
        />
      );
    });
  }, [data]);

  const xAxisPoints = data.length > 0 ? [[0, 0, 0], [data.length, 0, 0]] : [[0, 0, 0], [0, 0, 0]];
  const yAxisPoints = [[0, -10, 0], [0, 10, 0]];

  return (
    <>
      {bars}
      <Line points={xAxisPoints} color="white" lineWidth={1} />
      <Line points={yAxisPoints} color="white" lineWidth={1} />
      {hoveredCandle && (
        <Html position={[data.length - 1, (hoveredCandle.high + hoveredCandle.low) / 20000, 0]} distanceFactor={10}>
          <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '5px', borderRadius: '5px' }}>
            Price: {hoveredCandle.close}
          </div>
        </Html>
      )}
    </>
  );
};

export default Bars;
