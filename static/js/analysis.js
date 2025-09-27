// Analysis JavaScript
let analysisData = null;

async function runAnalysis(type) {
    try {
        // Show loading states
        if (type === 'environmental' || type === 'comprehensive') {
            LCAUtils.showLoading('environmentalResults', 'Analyzing environmental impact...');
        }
        if (type === 'circularity' || type === 'comprehensive') {
            LCAUtils.showLoading('circularityResults', 'Calculating circularity score...');
        }
        if (type === 'comprehensive') {
            LCAUtils.showLoading('detailedAnalysis', 'Performing comprehensive analysis...');
        }

        // Simulate API call for analysis
        const response = await LCAUtils.apiCall('/api/simulate-ai-predictions', {
            method: 'POST',
            body: JSON.stringify({
                user_id: 'analysis_user',
                analysis_type: type
            })
        });

        analysisData = response;
        
        // Update results based on analysis type
        if (type === 'environmental' || type === 'comprehensive') {
            updateEnvironmentalResults(response);
        }
        if (type === 'circularity' || type === 'comprehensive') {
            updateCircularityResults(response);
        }
        if (type === 'comprehensive') {
            updateDetailedAnalysis(response);
        }

    } catch (error) {
        console.error('Analysis failed:', error);
        showAnalysisError(type);
    }
}

function updateEnvironmentalResults(data) {
    const resultsHTML = `
        <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-red-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-red-600">${data.co2_footprint}</div>
                    <div class="text-sm text-red-800">kg CO₂ equivalent</div>
                </div>
                <div class="bg-yellow-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-yellow-600">${data.energy_intensity}</div>
                    <div class="text-sm text-yellow-800">kWh/tonne</div>
                </div>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-2xl font-bold text-blue-600">${data.water_use}</div>
                <div class="text-sm text-blue-800">Liters per tonne</div>
            </div>
            <canvas id="environmentalChart" width="400" height="200"></canvas>
        </div>
    `;
    
    document.getElementById('environmentalResults').innerHTML = resultsHTML;
    
    // Create environmental impact chart
    setTimeout(() => createEnvironmentalChart(data), 100);
}

function updateCircularityResults(data) {
    const resultsHTML = `
        <div class="text-center space-y-4">
            <div class="circularity-ring mx-auto" style="--score: ${data.circularity_index}">
                <div class="score-text">${data.circularity_index}%</div>
            </div>
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium">Material Recovery</span>
                    <span class="font-bold text-green-600">${data.material_recovery}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill bg-green-600" style="width: ${data.material_recovery}%"></div>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-sm font-medium">Recyclability Score</span>
                    <span class="font-bold text-blue-600">${data.recyclability_score}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill bg-blue-600" style="width: ${data.recyclability_score}%"></div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('circularityResults').innerHTML = resultsHTML;
}

function updateDetailedAnalysis(data) {
    const resultsHTML = `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="stat-card">
                    <h3 class="text-lg font-semibold mb-2">Carbon Footprint</h3>
                    <div class="text-3xl font-bold">${data.co2_footprint}</div>
                    <div class="text-sm opacity-75">kg CO₂ eq/tonne</div>
                    <div class="mt-2 text-sm">
                        <span class="text-red-300">↓ 15% from industry avg</span>
                    </div>
                </div>
                
                <div class="stat-card" style="background: linear-gradient(135deg, #059669 0%, #047857 100%);">
                    <h3 class="text-lg font-semibold mb-2">Energy Efficiency</h3>
                    <div class="text-3xl font-bold">${data.energy_intensity}</div>
                    <div class="text-sm opacity-75">kWh/tonne</div>
                    <div class="mt-2 text-sm">
                        <span class="text-green-300">↑ 8% from last assessment</span>
                    </div>
                </div>
                
                <div class="stat-card" style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);">
                    <h3 class="text-lg font-semibold mb-2">Water Usage</h3>
                    <div class="text-3xl font-bold">${data.water_use}</div>
                    <div class="text-sm opacity-75">L/tonne</div>
                    <div class="mt-2 text-sm">
                        <span class="text-blue-300">Within optimal range</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg border">
                <h3 class="text-lg font-semibold mb-4">Impact Breakdown</h3>
                <canvas id="impactBreakdownChart" height="300"></canvas>
            </div>
            
            <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h3 class="text-lg font-semibold mb-4">Key Insights</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-medium text-green-700 mb-2">Strengths</h4>
                        <ul class="text-sm space-y-1">
                            <li>✓ High material recovery rate (${data.material_recovery}%)</li>
                            <li>✓ Good recyclability score (${data.recyclability_score}%)</li>
                            <li>✓ Energy efficiency above industry average</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-medium text-orange-700 mb-2">Opportunities</h4>
                        <ul class="text-sm space-y-1">
                            <li>→ Reduce transport-related emissions</li>
                            <li>→ Implement renewable energy sources</li>
                            <li>→ Optimize water usage efficiency</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('detailedAnalysis').innerHTML = resultsHTML;
    
    // Create impact breakdown chart
    setTimeout(() => createImpactBreakdownChart(data), 100);
}

function createEnvironmentalChart(data) {
    const ctx = document.getElementById('environmentalChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['CO₂ Emissions', 'Energy Use', 'Water Use'],
            datasets: [{
                label: 'Environmental Impact',
                data: [data.co2_footprint / 100, data.energy_intensity / 1000, data.water_use / 100],
                backgroundColor: [
                    LCAUtils.chartColors.error + '80',
                    LCAUtils.chartColors.warning + '80',
                    LCAUtils.chartColors.info + '80'
                ],
                borderColor: [
                    LCAUtils.chartColors.error,
                    LCAUtils.chartColors.warning,
                    LCAUtils.chartColors.info
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function createImpactBreakdownChart(data) {
    const ctx = document.getElementById('impactBreakdownChart');
    if (!ctx) return;
    
    new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Raw Material', 'Processing', 'Transport', 'End-of-Life'],
            datasets: [{
                data: [45, 35, 15, 5],
                backgroundColor: [
                    LCAUtils.chartColors.primary,
                    LCAUtils.chartColors.secondary,
                    LCAUtils.chartColors.accent,
                    LCAUtils.chartColors.success
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function showAnalysisError(type) {
    const errorMessage = `
        <div class="text-center py-8 text-red-500">
            <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
            <p>Error running ${type} analysis</p>
            <button onclick="runAnalysis('${type}')" class="btn-primary mt-4">Try Again</button>
        </div>
    `;
    
    if (type === 'environmental' || type === 'comprehensive') {
        document.getElementById('environmentalResults').innerHTML = errorMessage;
    }
    if (type === 'circularity' || type === 'comprehensive') {
        document.getElementById('circularityResults').innerHTML = errorMessage;
    }
    if (type === 'comprehensive') {
        document.getElementById('detailedAnalysis').innerHTML = errorMessage;
    }
}