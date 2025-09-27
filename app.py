from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import pandas as pd
import os
from datetime import datetime
import csv
import json

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# Ensure data directory exists
os.makedirs('data', exist_ok=True)

# Initialize CSV files if they don't exist
def init_csv_files():
    csv_files = {
        'process_data.csv': ['timestamp', 'user_id', 'process_type', 'metal_type', 'energy_consumption', 
                            'transport_distance', 'recovery_rate', 'end_of_life_scenario', 'location'],
        'lca_results.csv': ['timestamp', 'user_id', 'co2_footprint', 'energy_intensity', 'water_use', 
                           'material_recovery', 'recyclability_score', 'circularity_index'],
        'recommendations.csv': ['timestamp', 'user_id', 'recommendation_type', 'description', 
                               'potential_savings', 'implementation_priority']
    }
    
    for filename, headers in csv_files.items():
        filepath = os.path.join('data', filename)
        if not os.path.exists(filepath):
            with open(filepath, 'w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(headers)

init_csv_files()

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/process-input')
def process_input():
    return render_template('process_input.html')

@app.route('/submit-process', methods=['POST'])
def submit_process():
    try:
        # Get form data
        data = {
            'timestamp': datetime.now().isoformat(),
            'user_id': request.form.get('user_id', 'anonymous'),
            'process_type': request.form.get('process_type'),
            'metal_type': request.form.get('metal_type'),
            'energy_consumption': request.form.get('energy_consumption'),
            'transport_distance': request.form.get('transport_distance'),
            'recovery_rate': request.form.get('recovery_rate'),
            'end_of_life_scenario': request.form.get('end_of_life_scenario'),
            'location': request.form.get('location')
        }
        
        # Save to CSV
        filepath = os.path.join('data', 'process_data.csv')
        with open(filepath, 'a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(list(data.values()))
        
        flash('Process data submitted successfully!', 'success')
        return redirect(url_for('analysis'))
        
    except Exception as e:
        flash(f'Error submitting data: {str(e)}', 'error')
        return redirect(url_for('process_input'))

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/visualization')
def visualization():
    return render_template('visualization.html')

@app.route('/reports')
def reports():
    return render_template('reports.html')

@app.route('/ai-predictions')
def ai_predictions():
    return render_template('ai_predictions.html')

@app.route('/circularity-assessment')
def circularity_assessment():
    return render_template('circularity_assessment.html')

@app.route('/api/process-data')
def get_process_data():
    try:
        filepath = os.path.join('data', 'process_data.csv')
        if os.path.exists(filepath):
            df = pd.read_csv(filepath)
            return jsonify(df.to_dict('records'))
        else:
            return jsonify([])
    except Exception as e:
        print(f"Error reading process data: {str(e)}")
        return jsonify([])

@app.route('/api/simulate-ai-predictions', methods=['POST'])
def simulate_ai_predictions():
    # Simulate AI predictions based on input data
    input_data = request.json
    
    # Mock AI predictions
    predictions = {
        'co2_footprint': 2500,  # kg CO2 equivalent
        'energy_intensity': 15000,  # kWh/tonne
        'water_use': 3500,  # liters/tonne
        'material_recovery': 85,  # percentage
        'recyclability_score': 78,  # score out of 100
        'circularity_index': 72  # score out of 100
    }
    
    # Save predictions to CSV
    result_data = {
        'timestamp': datetime.now().isoformat(),
        'user_id': input_data.get('user_id', 'anonymous'),
        **predictions
    }
    
    filepath = os.path.join('data', 'lca_results.csv')
    with open(filepath, 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(list(result_data.values()))
    
    return jsonify(predictions)

@app.route('/api/generate-recommendations', methods=['POST'])
def generate_recommendations():
    input_data = request.json
    
    # Mock recommendations
    recommendations = [
        {
            'type': 'Energy Optimization',
            'description': 'Switch to renewable energy sources to reduce carbon footprint by 35%',
            'savings': '₹45 lakhs annually',
            'priority': 'High'
        },
        {
            'type': 'Material Recovery',
            'description': 'Implement advanced sorting technology to increase recycling rate to 95%',
            'savings': '₹25 lakhs annually',
            'priority': 'Medium'
        },
        {
            'type': 'Transport Optimization',
            'description': 'Use rail transport instead of road to reduce emissions by 20%',
            'savings': '₹15 lakhs annually',
            'priority': 'Medium'
        }
    ]
    
    # Save recommendations to CSV
    for rec in recommendations:
        rec_data = {
            'timestamp': datetime.now().isoformat(),
            'user_id': input_data.get('user_id', 'anonymous'),
            'recommendation_type': rec['type'],
            'description': rec['description'],
            'potential_savings': rec['savings'],
            'implementation_priority': rec['priority']
        }
        
        filepath = os.path.join('data', 'recommendations.csv')
        with open(filepath, 'a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(list(rec_data.values()))
    
    return jsonify(recommendations)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
