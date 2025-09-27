// Reports JavaScript

document.addEventListener('DOMContentLoaded', function() {
    updateReportPreview();
    
    // Update preview when report type changes
    document.getElementById('reportType').addEventListener('change', updateReportPreview);
});

function updateReportPreview() {
    const reportType = document.getElementById('reportType').value;
    
    const previewData = {
        comprehensive: {
            sections: '8 sections',
            pages: '15-20 pages',
            charts: '12 charts',
            dataPoints: '250+ metrics'
        },
        environmental: {
            sections: '5 sections',
            pages: '8-12 pages',
            charts: '8 charts',
            dataPoints: '150+ metrics'
        },
        circularity: {
            sections: '6 sections',
            pages: '10-15 pages',
            charts: '10 charts',
            dataPoints: '180+ metrics'
        },
        comparison: {
            sections: '4 sections',
            pages: '6-10 pages',
            charts: '6 charts',
            dataPoints: '100+ metrics'
        },
        recommendations: {
            sections: '3 sections',
            pages: '4-6 pages',
            charts: '4 charts',
            dataPoints: '50+ metrics'
        }
    };
    
    const data = previewData[reportType];
    document.getElementById('sectionCount').textContent = data.sections;
    document.getElementById('pageCount').textContent = data.pages;
    document.getElementById('chartCount').textContent = data.charts;
    document.getElementById('dataPointCount').textContent = data.dataPoints;
}

async function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const timePeriod = document.getElementById('timePeriod').value;
    
    try {
        // Show loading state
        const button = event.target;
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="spinner"></span>Generating...';
        button.disabled = true;
        
        // Simulate report generation
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Generate and display recommendations
        await generateRecommendations();
        
        // Show success message
        showReportSuccess(reportType);
        
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        
    } catch (error) {
        console.error('Report generation failed:', error);
        showReportError();
    }
}

async function generateRecommendations() {
    try {
        const response = await LCAUtils.apiCall('/api/generate-recommendations', {
            method: 'POST',
            body: JSON.stringify({
                user_id: 'report_user',
                report_type: document.getElementById('reportType').value
            })
        });
        
        displayRecommendations(response);
        
    } catch (error) {
        console.error('Failed to generate recommendations:', error);
    }
}

function displayRecommendations(recommendations) {
    const recommendationsHTML = `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div class="text-center p-4 bg-green-50 rounded-lg">
                    <div class="text-2xl font-bold text-green-600">₹${Math.floor(Math.random() * 100 + 50)}L</div>
                    <div class="text-sm text-green-800">Potential Annual Savings</div>
                </div>
                <div class="text-center p-4 bg-blue-50 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600">${Math.floor(Math.random() * 30 + 20)}%</div>
                    <div class="text-sm text-blue-800">CO₂ Reduction Potential</div>
                </div>
                <div class="text-center p-4 bg-orange-50 rounded-lg">
                    <div class="text-2xl font-bold text-orange-600">${recommendations.length}</div>
                    <div class="text-sm text-orange-800">Actionable Recommendations</div>
                </div>
            </div>
            
            <div class="space-y-4">
                ${recommendations.map((rec, index) => `
                    <div class="recommendation-card border rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <div class="flex items-center space-x-3 mb-2">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityClass(rec.priority)}">
                                        ${rec.priority} Priority
                                    </span>
                                    <span class="text-sm text-gray-500">${rec.type}</span>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">${getRecommendationTitle(rec.type)}</h3>
                                <p class="text-gray-700 mb-4">${rec.description}</p>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="text-sm font-medium text-gray-600">Financial Impact</div>
                                <div class="text-lg font-bold text-green-600">${rec.savings}</div>
                            </div>
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="text-sm font-medium text-gray-600">Implementation Time</div>
                                <div class="text-lg font-bold text-blue-600">${getImplementationTime(rec.priority)}</div>
                            </div>
                            <div class="bg-gray-50 p-3 rounded">
                                <div class="text-sm font-medium text-gray-600">Difficulty</div>
                                <div class="text-lg font-bold text-orange-600">${getDifficulty(rec.priority)}</div>
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-3">
                            <button onclick="viewRecommendationDetails(${index})" class="btn-secondary text-sm">
                                <i class="fas fa-info-circle mr-1"></i>
                                View Details
                            </button>
                            <button onclick="implementRecommendation(${index})" class="btn-primary text-sm">
                                <i class="fas fa-play mr-1"></i>
                                Start Implementation
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('recommendationsContainer').innerHTML = recommendationsHTML;
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

function getRecommendationTitle(type) {
    const titles = {
        'Energy Optimization': 'Switch to Renewable Energy Sources',
        'Material Recovery': 'Implement Advanced Material Sorting',
        'Transport Optimization': 'Optimize Logistics and Transportation'
    };
    return titles[type] || type;
}

function getImplementationTime(priority) {
    const times = {
        'High': '3-6 months',
        'Medium': '6-12 months',
        'Low': '12-18 months'
    };
    return times[priority] || '6-12 months';
}

function getDifficulty(priority) {
    const difficulties = {
        'High': 'Medium',
        'Medium': 'Low',
        'Low': 'High'
    };
    return difficulties[priority] || 'Medium';
}

function viewRecommendationDetails(index) {
    // Show detailed modal with implementation steps
    alert('This would show detailed implementation steps, ROI analysis, and technical requirements.');
}

function implementRecommendation(index) {
    // Start implementation workflow
    alert('This would start the implementation workflow with project planning, resource allocation, and timeline management.');
}

function showReportSuccess(reportType) {
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            Report generated successfully! Check your downloads folder.
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Add to recent reports list
    addToRecentReports(reportType);
}

function showReportError() {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            Failed to generate report. Please try again.
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function addToRecentReports(reportType) {
    // This would add the new report to the recent reports list
    console.log(`Added ${reportType} report to recent reports`);
}

function downloadReport(reportId) {
    // Simulate report download
    console.log(`Downloading report: ${reportId}`);
}

function previewReport(reportId) {
    // Show report preview in modal
    console.log(`Previewing report: ${reportId}`);
}

function exportReportData() {
    // Export current report data as CSV/Excel
    const data = [
        ['Metric', 'Current Value', 'Target Value', 'Industry Benchmark'],
        ['CO₂ Emissions (kg/tonne)', '2,500', '2,000', '2,800'],
        ['Energy Consumption (kWh/tonne)', '15,000', '12,000', '16,500'],
        ['Water Usage (L/tonne)', '3,500', '3,000', '4,200'],
        ['Material Recovery (%)', '85', '95', '76'],
        ['Circularity Index (%)', '78', '85', '68']
    ];
    
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lca_report_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}