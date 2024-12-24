import pandas as pd
import numpy as np
import json
import os

# Example mapping for inference
self_reported_mapping = {
    "Very Positive": 1,
    "Positive": 0.75,
    "Mildly Positive": 0.5,
    "Neutral": 0,
    "Mildly Negative": -0.5,
    "Negative": -0.75,
    "Very Negative": -1
}

def validate_inference_from_joined_df(csv_path, cohort_id):
    if not os.path.exists(csv_path):
        print(json.dumps({"error": "CSV file not found"}))
        return

    joined_df = pd.read_csv(csv_path)
    cohort_data = joined_df[joined_df["Cohort"] == cohort_id]

    if cohort_data.empty:
        print(json.dumps({"error": f"No data found for cohort {cohort_id}"}))
        return

    validation_results = []
    for round_ in cohort_data["Round"].unique():
        round_data = cohort_data[cohort_data["Round"] == round_]
        signal_round_score = round_data["response"].mean()
        self_reported_round_score = round_data["Inference"].mean()
        validated_inference_score = np.nanmean([signal_round_score, self_reported_round_score])

        validation_results.append({
            "Cohort": cohort_id,
            "Round": round_,
            "Signal Inference Score": signal_round_score,
            "Self-Reported Score": self_reported_round_score,
            "Validated Inference Score": validated_inference_score,
            "Difference": signal_round_score - self_reported_round_score
        })

    validation_df = pd.DataFrame(validation_results)
    print(validation_df.to_json(orient='records'))

if __name__ == "__main__":
    csv_path = './data/joined_df.csv'  # Path to existing CSV
    cohort_id = 'ID_2'  # Default cohort
    validate_inference_from_joined_df(csv_path, cohort_id)
