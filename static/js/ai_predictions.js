// AI Predictions JavaScript

async function generatePredictions() {
    try {
        // Show loading state
        LCAUtils.showLoading('predictionResults', 'AI is analyzing your parameters...');
        
        // Get input values
        const metalType = document.getElementById('aiMetalType').value;
        const processType = document.getElementById('aiProcessType').value;
        const region = document.getElementById('aiRegion').value;
        
        // Simulate AI prediction API call
        const response = await LCAUtils.apiCall('/api/simulate-ai-predictions', {
            method: 'POST',
            body: JSON.stringify({
                metal_type: metalType,
                process_type: processType,
                region: region,
                user_id: 'ai_prediction_user'
            })
        });
        
        // Update results
        updatePredictionResults(response);
        updateConfidenceMetrics();
        await generateRecommendations();
        
    } catch (error) {
        console.error('Prediction failed:', error);
        showPredictionError();
    }
}

function updatePredictionResults(data) {
    const resultsHTML = `
        <div class="space-y-4">
            <h3 class="font-semibold text-green-700 mb-4">
                <i class="fas fa-check-circle mr-2"></i>
                AI Predictions Generated
            </h3>
            
            <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-blue-500">
                    <div>
                        <span class="font-medium">Energy Consumption</span>
                        <div class="text-sm text-gray-600">kWh per tonne</div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-blue-600">${data.energy_intensity}</div>
                        <div class="text-xs text-green-600">95% confidence</div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-red-500">
                    <div>
                        <span class="font-medium">CO₂ Footprint</span>
                        <div class="text-sm text-gray-600">kg CO₂ equivalent</div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-red-600">${data.co2_footprint}</div>
                        <div class="text-xs text-green-600">92% confidence</div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-cyan-500">
                    <div>
                        <span class="font-medium">Water Usage</span>
                        <div class="text-sm text-gray-600">liters per tonne</div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-cyan-600">${data.water_use}</div>
                        <div class="text-xs text-yellow-600">78% confidence</div>
                    </div>
                </div>
                
                <div class="flex justify-between items-center p-3 bg-white rounded border-l-4 border-green-500">
                    <div>
                        <span class="font-medium">Material Recovery</span>
                        <div class="text-sm text-gray-600">percentage</div>
                    </div>
                    <div class="text-right">
                        <div class="text-lg font-bold text-green-600">${data.material_recovery}%</div>
                        <div class="text-xs text-green-600">88% confidence</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 class="font-medium text-blue-900 mb-2">AI Model Details</h4>
                <div class="text-sm text-blue-800 space-y-1">
                    <p>• Trained on 15,000+ metallurgical processes</p>
                    <p>• Regional adjustments for ${document.getElementById('aiRegion').options[document.getElementById('aiRegion').selectedIndex].text}</p>
                    <p>• ${document.getElementById('aiMetalType').value} industry benchmarks applied</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('predictionResults').innerHTML = resultsHTML;
}

function updateConfidenceMetrics() {
    const confidenceHTML = `
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Energy Consumption</span>
                <div class="flex items-center space-x-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 95%"></div>
                    </div>
                    <span class="text-sm font-bold text-green-600">95%</span>
                </div>
            </div>
            
            <div class="flex justify-between items-center">
                <span class="text-sm font-medium">CO₂ Footprint</span>
                <div class="flex items-center space-x-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 92%"></div>
                    </div>
                    <span class="text-sm font-bold text-green-600">92%</span>
                </div>
            </div>
            
            <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Material Recovery</span>
                <div class="flex items-center space-x-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full" style="width: 88%"></div>
                    </div>
                    <span class="text-sm font-bold text-green-600">88%</span>
                </div>
            </div>
            
            <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Water Usage</span>
                <div class="flex items-center space-x-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                        <div class="bg-yellow-500 h-2 rounded-full" style="width: 78%"></div>
                    </div>
                    <span class="text-sm font-bold text-yellow-600">78%</span>
                </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg mt-4">
                <h4 class="font-medium text-green-800 mb-2">Overall Confidence</h4>
                <div class="flex items-center space-x-3">
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="bg-green-500 h-3 rounded-full" style="width: 88%"></div>
                    </div>
                    <span class="text-lg font-bold text-green-600">88%</span>
                </div>
                <p class="text-sm text-green-700 mt-2">High confidence prediction based on extensive training data</p>
            </div>
        </div>
    `;
    
    document.getElementById('confidenceMetrics').innerHTML = confidenceHTML;
}

async function generateRecommendations() {
    try {
        const response = await LCAUtils.apiCall('/api/generate-recommendations', {
            method: 'POST',
            body: JSON.stringify({
                metal_type: document.getElementById('aiMetalType').value,
                process_type: document.getElementById('aiProcessType').value,
                user_id: 'ai_recommendation_user'
            })
        });
        
        updateRecommendations(response);
        
    } catch (error) {
        console.error('Failed to generate recommendations:', error);
    }
}

function updateRecommendations(recommendations) {
    const recommendationsHTML = `
        <div class="space-y-4">
            ${recommendations.map((rec, index) => `
                <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(rec.priority)}">
                                    ${rec.priority} Priority
                                </span>
                                <span class="text-sm font-medium text-gray-900">${rec.type}</span>
                            </div>
                            <p class="text-gray-700 mb-2">${rec.description}</p>
                            <div class="flex items-center space-x-4 text-sm">
                                <span class="text-green-600 font-medium">
                                    <i class="fas fa-rupee-sign mr-1"></i>
                                    Potential Savings: ${rec.savings}
                                </span>
                            </div>
                        </div>
                        <div class="ml-4">
                            <button onclick="implementRecommendation(${index})" class="btn-primary text-sm px-3 py-1">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mt-6">
            <h4 class="font-semibold text-gray-900 mb-2">
                <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                AI Insight
            </h4>
            <p class="text-gray-700">
                Based on your process parameters, implementing these recommendations could reduce your environmental 
                impact by up to 35% while maintaining production efficiency. The AI model suggests prioritizing 
                energy optimization for maximum impact.
            </p>
        </div>
    `;
    
    document.getElementById('aiRecommendations').innerHTML = recommendationsHTML;
}

function getPriorityClass(priority) {
    switch (priority.toLowerCase()) {
        case 'high':
            return 'bg-red-100 text-red-800';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'low':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

function implementRecommendation(index) {
    // Show detailed information about the recommendation
    alert('This would show detailed implementation steps, cost-benefit analysis, and timeline for the recommendation.');
}

function showPredictionError() {
    const errorHTML = `
        <div class="text-center py-8 text-red-500">
            <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
            <p class="mb-4">Failed to generate AI predictions</p>
            <button onclick="generatePredictions()" class="btn-primary">Try Again</button>
        </div>
    `;
    
    document.getElementById('predictionResults').innerHTML = errorHTML;
}