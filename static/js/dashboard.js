// Dashboard specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
    initializeCharts();
});

async function loadDashboardData() {
    try {
        // Load process data for statistics
        const processData = await LCAUtils.apiCall('/api/process-data');
        updateStatistics(processData);
        updateRecentActivity(processData);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function updateStatistics(data) {
    // Update total assessments
    document.getElementById('totalAssessments').textContent = data.length;
    
    // Mock data for other statistics (would be calculated from actual data)
    document.getElementById('avgCircularityScore').textContent = '78';
    document.getElementById('co2Saved').textContent = LCAUtils.formatNumber(2500);
    document.getElementById('energySaved').textContent = LCAUtils.formatNumber(15000);
    
    // Add animation to numbers
    animateNumbers();
}

function animateNumbers() {
    const statElements = document.querySelectorAll('.stat-value');
    statElements.forEach(element => {
        const finalValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            if (element.id === 'avgCircularityScore') {
                element.textContent = Math.round(currentValue) + '%';
            } else {
                element.textContent = LCAUtils.formatNumber(Math.round(currentValue));
            }
        }, 30);
    });
}

function updateRecentActivity(data) {
    const activityContainer = document.getElementById('recentActivity');
    
    if (data.length === 0) {
        return; // Keep the default "no data" message
    }
    
    // Show recent 5 activities
    const recentData = data.slice(-5).reverse();
    const activityHTML = recentData.map(item => `
        <div class="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-industry text-blue-600 text-sm"></i>
                </div>
                <div>
                    <p class="font-medium">${item.metal_type} ${item.process_type} Process</p>
                    <p class="text-sm text-gray-500">${new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
            </div>
            <div class="text-right">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                </span>
            </div>
        </div>
    `).join('');
    
    activityContainer.innerHTML = activityHTML;
}

function initializeCharts() {
    // Environmental Impact Trends Chart
    const ctx = document.getElementById('impactChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'CO₂ Emissions (tonnes)',
                data: [2800, 2650, 2400, 2200, 2100, 1950],
                borderColor: LCAUtils.chartColors.error,
                backgroundColor: LCAUtils.chartColors.error + '20',
                tension: 0.4
            }, {
                label: 'Energy Consumption (MWh)',
                data: [1800, 1750, 1600, 1500, 1400, 1320],
                borderColor: LCAUtils.chartColors.warning,
                backgroundColor: LCAUtils.chartColors.warning + '20',
                tension: 0.4
            }, {
                label: 'Material Recovery (%)',
                data: [75, 78, 82, 85, 87, 90],
                borderColor: LCAUtils.chartColors.success,
                backgroundColor: LCAUtils.chartColors.success + '20',
                tension: 0.4
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
                    position: 'bottom'
                }
            }
        }
    });
}

// Refresh dashboard data every 30 seconds
setInterval(loadDashboardData, 30000);