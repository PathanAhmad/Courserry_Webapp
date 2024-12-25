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

    # Filter by date range
    mask = (df['Date'] >= start_date) & (df['Date'] <= end_date)
    filtered_df = df[mask]

    if filtered_df.empty:
        print(json.dumps({"error": "No data available in the selected range"}))
        return
    
    # Calculate ISO week and year
    filtered_df['Week'] = filtered_df['Date'].dt.isocalendar().week
    filtered_df['Year'] = filtered_df['Date'].dt.year
    filtered_df['Month'] = filtered_df['Date'].dt.month

    # Aggregation based on plot type
    if plot_type == 'daily':
        # Daily still filters by the selected month
        filtered_df = filtered_df[filtered_df['Month'] == int(month)]
        result = filtered_df

    elif plot_type == 'weekly':
        filtered_df = filtered_df[filtered_df['Month'] == int(month)]
        # Weekly: Aggregate entire year by Week
        result = filtered_df.groupby(['Year', 'Week'], as_index=False).agg({
            'Validated Inference Score': 'mean',
            'response': 'mean',
            'Inference': 'mean'
        })

        # Ensure full 52 weeks
        all_weeks = pd.DataFrame({
            'Week': np.arange(1, 53),  # Full 52 weeks
            'Year': filtered_df['Year'].unique()[0]  # Current Year
        })

        # Merge and fill missing weeks
        result = pd.merge(all_weeks, result, on=['Year', 'Week'], how='left')
        result = result.assign(
        response=result['response'].fillna(0),
        Inference=result['Inference'].fillna(0),
        **{'Validated Inference Score': result['Validated Inference Score'].fillna(0)}
    )
        
        # 🔧 Remove weeks with all-zero values
        result = result[result[['Validated Inference Score', 'response', 'Inference']].sum(axis=1) != 0]

        # Create Week Labels
        result['X'] = 'W' + result['Week'].astype(str)

    elif plot_type == 'monthly':
        # Monthly Aggregation
        result = filtered_df.groupby('Month', as_index=False).agg({
            'Validated Inference Score': 'mean',
            'response': 'mean',
            'Inference': 'mean'
        })
        result['X'] = result['Month'].apply(lambda x: f"{x:02d}")

    else:
        print(json.dumps({"error": "Invalid plot type"}))
        return

    # Convert result to JSON
    print(result.to_json(orient='records'))


if __name__ == "__main__":
    csv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/final.csv'))
    print(f"Resolved CSV Path: {csv_path}")  # Add this line to check the path
    start_date = sys.argv[1] if len(sys.argv) > 1 else '2024-01-01'
    end_date = sys.argv[2] if len(sys.argv) > 2 else '2024-12-31'
    plot_type = sys.argv[3] if len(sys.argv) > 3 else 'daily'
    month = sys.argv[4] if len(sys.argv) > 4 else '1'

    plot_validated_inference(csv_path, start_date, end_date, plot_type, month)


