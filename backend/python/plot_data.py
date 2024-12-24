import pandas as pd
import numpy as np
import json
import sys
from datetime import datetime
import os


def plot_validated_inference(csv_path, start_date, end_date, plot_type, month):
    # Load CSV
    df = pd.read_csv(csv_path)

    # Convert Date column to datetime
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    df = df.dropna(subset=['Date'])

    # Filter by month (if not monthly plot)
    if plot_type in ['daily', 'weekly']:
        df = df[df['Date'].dt.month == int(month)]

    # Filter by date range
    mask = (df['Date'] >= start_date) & (df['Date'] <= end_date)
    filtered_df = df[mask]

    if filtered_df.empty:
        print(json.dumps({"error": f"No data available for month {month} from {start_date} to {end_date}"}))
        return

    # Aggregate by plot type
    if plot_type == 'daily':
        result = filtered_df
    elif plot_type == 'weekly':
        filtered_df.loc[:, 'Week'] = filtered_df['Date'].dt.isocalendar().week
        result = filtered_df.groupby('Week', as_index=False).agg({
            'Validated Inference Score': 'mean',
            'response': 'mean',
            'Inference': 'mean'
        })
    elif plot_type == 'monthly':
        filtered_df['Month'] = filtered_df['Date'].dt.month
        result = filtered_df.groupby('Month', as_index=False).agg({
            'Validated Inference Score': 'mean',
            'response': 'mean',
            'Inference': 'mean'
        })
    else:
        print(json.dumps({"error": "Invalid plot type"}))
        return

    # Convert result to JSON
    print(result.to_json(orient='records'))


if __name__ == "__main__":
    csv_path = os.path.join(os.path.dirname(__file__), '../data/final.csv')
    
    # Read arguments from Node.js
    start_date = sys.argv[1] if len(sys.argv) > 1 else '2024-01-01'
    end_date = sys.argv[2] if len(sys.argv) > 2 else '2024-12-31'
    plot_type = sys.argv[3] if len(sys.argv) > 3 else 'daily'
    month = sys.argv[4] if len(sys.argv) > 4 else '1'  # Default to January if no month is passed

    plot_validated_inference(csv_path, start_date, end_date, plot_type, month)
