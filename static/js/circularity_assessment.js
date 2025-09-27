// Circularity Assessment JavaScript

function generateFlowDiagram() {
    const diagramHTML = `
        <div class="sankey-container">
            <div class="sankey-title text-center mb-4">
                <h3 class="text-lg font-semibold">Material Flow Analysis</h3>
                <p class="text-sm text-gray-600">Circular Economy Material Flows</p>
            </div>
            
            <div class="flow-diagram">
                <!-- Input Sources -->
                <div class="flow-stage">
                    <h4 class="stage-title">Inputs</h4>
                    <div class="flow-boxes">
                        <div class="flow-box input" data-value="60">
                            <div class="box-label">Recycled Material</div>
                            <div class="box-value">60%</div>
                        </div>
                        <div class="flow-box input" data-value="40">
                            <div class="box-label">Raw Material</div>
                            <div class="box-value">40%</div>
                        </div>
                    </div>
                </div>
                
                <!-- Processing -->
                <div class="flow-stage">
                    <h4 class="stage-title">Processing</h4>
                    <div class="flow-boxes">
                        <div class="flow-box process" data-value="100">
                            <div class="box-label">Manufacturing</div>
                            <div class="box-value">100%</div>
                        </div>
                    </div>
                </div>
                
                <!-- Outputs -->
                <div class="flow-stage">
                    <h4 class="stage-title">Outputs</h4>
                    <div class="flow-boxes">
                        <div class="flow-box output" data-value="92">
                            <div class="box-label">Products</div>
                            <div class="box-value">92%</div>
                        </div>
                        <div class="flow-box waste" data-value="8">
                            <div class="box-label">Waste</div>
                            <div class="box-value">8%</div>
                        </div>
                    </div>
                </div>
                
                <!-- End-of-Life -->
                <div class="flow-stage">
                    <h4 class="stage-title">End-of-Life</h4>
                    <div class="flow-boxes">
                        <div class="flow-box recycle" data-value="78">
                            <div class="box-label">Recycling</div>
                            <div class="box-value">78%</div>
                        </div>
                        <div class="flow-box reuse" data-value="12">
                            <div class="box-label">Reuse</div>
                            <div class="box-value">12%</div>
                        </div>
                        <div class="flow-box disposal" data-value="10">
                            <div class="box-label">Disposal</div>
                            <div class="box-value">10%</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Flow Lines (SVG) -->
            <svg class="flow-lines" viewBox="0 0 800 300">
                <path d="M150 80 L 250 80" class="flow-line recycled" stroke-width="8"/>
                <path d="M150 120 L 250 100" class="flow-line raw" stroke-width="6"/>
                <path d="M350 90 L 450 80" class="flow-line process" stroke-width="10"/>
                <path d="M350 90 L 450 120" class="flow-line waste" stroke-width="2"/>
                <path d="M550 80 L 650 70" class="flow-line recycle" stroke-width="8"/>
                <path d="M550 80 L 650 100" class="flow-line reuse" stroke-width="3"/>
                <path d="M550 80 L 650 130" class="flow-line disposal" stroke-width="2"/>
                <!-- Circular flow back -->
                <path d="M650 70 Q 700 50, 680 200 Q 50 250, 150 80" class="flow-line circular" stroke-width="6" fill="none"/>
            </svg>
            
            <div class="flow-legend mt-6">
                <h4 class="text-sm font-semibold mb-2">Legend</h4>
                <div class="grid grid-cols-2 gap-2 text-xs">
                    <div class="flex items-center">
                        <div class="w-4 h-2 bg-green-500 mr-2"></div>
                        Circular Flow
                    </div>
                    <div class="flex items-center">
                        <div class="w-4 h-2 bg-blue-500 mr-2"></div>
                        Material Flow
                    </div>
                    <div class="flex items-center">
                        <div class="w-4 h-2 bg-red-500 mr-2"></div>
                        Waste Flow
                    </div>
                    <div class="flex items-center">
                        <div class="w-4 h-2 bg-orange-500 mr-2"></div>
                        Recovery Flow
                    </div>
                </div>
            </div>
        </div>
        
        <style>
        .sankey-container {
            position: relative;
            height: 100%;
            padding: 1rem;
        }
        
        .flow-diagram {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 250px;
            position: relative;
        }
        
        .flow-stage {
            flex: 1;
            text-align: center;
        }
        
        .stage-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 1rem;
        }
        
        .flow-boxes {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        
        .flow-box {
            padding: 0.75rem;
            border-radius: 0.5rem;
            text-align: center;
            min-width: 80px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .flow-box.input { background-color: #dbeafe; color: #1e40af; }
        .flow-box.process { background-color: #f3e8ff; color: #7c3aed; }
        .flow-box.output { background-color: #dcfce7; color: #166534; }
        .flow-box.waste { background-color: #fef2f2; color: #dc2626; }
        .flow-box.recycle { background-color: #d1fae5; color: #065f46; }
        .flow-box.reuse { background-color: #fef3c7; color: #92400e; }
        .flow-box.disposal { background-color: #fee2e2; color: #991b1b; }
        
        .box-label {
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        .box-value {
            font-size: 0.875rem;
            font-weight: 700;
        }
        
        .flow-lines {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .flow-line {
            fill: none;
            stroke-linecap: round;
        }
        
        .flow-line.recycled { stroke: #22c55e; }
        .flow-line.raw { stroke: #6b7280; }
        .flow-line.process { stroke: #8b5cf6; }
        .flow-line.waste { stroke: #ef4444; }
        .flow-line.recycle { stroke: #16a34a; }
        .flow-line.reuse { stroke: #d97706; }
        .flow-line.disposal { stroke: #dc2626; }
        .flow-line.circular { 
            stroke: #059669; 
            stroke-dasharray: 5,5;
            animation: flow 3s infinite linear;
        }
        
        @keyframes flow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: 20; }
        }
        
        .flow-legend {
            border-top: 1px solid #e5e7eb;
            padding-top: 1rem;
        }
        </style>
    `;
    
    document.getElementById('sankeyDiagram').innerHTML = diagramHTML;
}

function updateCircularityMetrics() {
    // Simulate updating metrics with animation
    const metrics = [
        { id: 'materialRecovery', value: 85, color: 'blue' },
        { id: 'recyclabilityIndex', value: 92, color: 'green' },
        { id: 'resourceEfficiency', value: 67, color: 'orange' },
        { id: 'productLifespan', value: 65, color: 'purple' }
    ];
    
    metrics.forEach(metric => {
        animateProgress(metric.id, metric.value, metric.color);
    });
}

function animateProgress(elementId, targetValue, color) {
    const progressBar = document.querySelector(`#${elementId} .progress-bar div`);
    if (progressBar) {
        let currentValue = 0;
        const increment = targetValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            progressBar.style.width = currentValue + '%';
        }, 30);
    }
}

function generateCircularityReport() {
    // This would generate a detailed PDF report
    alert('Circularity assessment report would be generated and downloaded as PDF');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Auto-generate flow diagram after 2 seconds
    setTimeout(generateFlowDiagram, 2000);
    
    // Update metrics after 3 seconds
    setTimeout(updateCircularityMetrics, 3000);
});

// Interactive elements
function showActionDetails(actionIndex) {
    // Show detailed implementation plan for the action
    alert('This would show detailed implementation steps, timeline, and resources needed for this action item.');
}

function exportCircularityData() {
    // Export circularity data as CSV
    const csvData = [
        ['Metric', 'Current Value', 'Target Value', 'Industry Average'],
        ['Material Recovery Rate', '85%', '95%', '76%'],
        ['Recyclability Index', '92%', '95%', '84%'],
        ['Resource Efficiency', '67%', '80%', '62%'],
        ['Product Lifespan', '5.2 years', '7 years', '4.8 years']
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circularity_assessment.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}