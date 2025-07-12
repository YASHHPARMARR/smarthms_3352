import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const OccupancyChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7days');

  const occupancyData = {
    '7days': [
      { date: '07/06', occupancy: 85, revenue: 4200 },
      { date: '07/07', occupancy: 92, revenue: 4800 },
      { date: '07/08', occupancy: 78, revenue: 3900 },
      { date: '07/09', occupancy: 88, revenue: 4400 },
      { date: '07/10', occupancy: 95, revenue: 5100 },
      { date: '07/11', occupancy: 82, revenue: 4100 },
      { date: '07/12', occupancy: 90, revenue: 4700 }
    ],
    '30days': [
      { date: 'Week 1', occupancy: 87, revenue: 30800 },
      { date: 'Week 2', occupancy: 82, revenue: 28900 },
      { date: 'Week 3', occupancy: 91, revenue: 33200 },
      { date: 'Week 4', occupancy: 89, revenue: 31500 }
    ],
    '90days': [
      { date: 'Apr', occupancy: 78, revenue: 89000 },
      { date: 'May', occupancy: 85, revenue: 98000 },
      { date: 'Jun', occupancy: 92, revenue: 105000 }
    ]
  };

  const currentData = occupancyData[timeRange];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-moderate">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-primary">
            Occupancy: {payload[0].value}%
          </p>
          <p className="text-success">
            Revenue: ${payload[1]?.value?.toLocaleString() || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Occupancy & Revenue Trends</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-sm rounded transition-smooth ${
                chartType === 'line' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 text-sm rounded transition-smooth ${
                chartType === 'bar' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="occupancy" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="occupancy" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">
            {Math.round(currentData.reduce((acc, item) => acc + item.occupancy, 0) / currentData.length)}%
          </p>
          <p className="text-sm text-muted-foreground">Average Occupancy</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">
            ${currentData.reduce((acc, item) => acc + item.revenue, 0).toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default OccupancyChart;