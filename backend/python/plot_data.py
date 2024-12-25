import pandas as pd
import numpy as np
import json
import sys
from datetime import datetime
import os

def plot_validated_inference(csv_path, start_date, end_date, plot_type):
    print(f"Looking for CSV at: {csv_path}")
    print(f"Received plot type: {plot_type}")

    if not os.path.exists(csv_path):
        print(json.dumps({"error": "CSV file not found"}))
        return

    # Load CSV
    df = pd.read_csv(csv_path)
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    df = df.dropna(subset=['Date'])

    mask = (df['Date'] >= start_date) & (df['Date'] <= end_date)
    filtered_df = df[mask]

    if filtered_df.empty:
        print(json.dumps({"error": f"No data available from {start_date} to {end_date}"}))
        return

    if plot_type == 'weekly':
        filtered_df['Month'] = filtered_df['Date'].dt.month
        filtered_df['WeekOfMonth'] = np.ceil(filtered_df['Date'].dt.day / 7).astype(int)

        # Group by Month and WeekOfMonth
        result = filtered_df.groupby(['Month', 'WeekOfMonth'], as_index=False).agg({
            'response': 'mean',
            'Inference': 'mean',
            'Validated Inference Score': 'mean'
        })

        # Force inject W1 to W5 for each month
        all_weeks = pd.DataFrame({
            'Month': np.repeat(result['Month'].unique(), 5),
            'WeekOfMonth': np.tile(np.arange(1, 6), len(result['Month'].unique()))
        })

        # Merge and fill missing weeks with 0
        result = pd.merge(all_weeks, result, on=['Month', 'WeekOfMonth'], how='left')
        result['response'].fillna(0, inplace=True)
        result['Inference'].fillna(0, inplace=True)
        result['Validated Inference Score'].fillna(0, inplace=True)

        # Ensure W1 to W5 is static per month
        result['X'] = 'W' + result['WeekOfMonth'].astype(str)

    elif plot_type == 'daily':
        filtered_df['Day'] = filtered_df['Date'].dt.day
        result = filtered_df[['Day', 'response', 'Inference', 'Validated Inference Score']]

    elif plot_type == 'monthly':
        filtered_df['Month'] = filtered_df['Date'].dt.month
        result = filtered_df.groupby('Month', as_index=False).agg({
            'response': 'mean',
            'Inference': 'mean',
            'Validated Inference Score': 'mean'
        })
        result.rename(columns={'Month': 'X'}, inplace=True)

    else:
        print(json.dumps({"error": "Invalid plot type"}))
        return

    # Output Result
    print(result.to_json(orient='records'))
    print(json.dumps({"status": "completed"}))


if __name__ == "__main__":
    csv_path = os.path.join(os.path.dirname(__file__), '../data/final.csv')

    start_date = sys.argv[1] if len(sys.argv) > 1 else '2024-01-01'
    end_date = sys.argv[2] if len(sys.argv) > 2 else '2024-12-31'
    plot_type = sys.argv[3] if len(sys.argv) > 3 else 'daily'

    plot_validated_inference(csv_path, start_date, end_date, plot_type)
