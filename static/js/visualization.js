// Visualization JavaScript
let mainChart = null;
let trendChart = null;
let breakdownChart = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    showChart('environmental');
});

function initializeCharts() {
    // Main Chart
    const mainCtx = document.getElementById('mainChart').getContext('2d');
    mainChart = new Chart(mainCtx, {
        type: 'bar',
        data: {
            labels: ['Raw Material', 'Processing', 'Transport', 'End-of-Life'],
            datasets: [{
                label: 'CO₂ Emissions (kg)',
                data: [1125, 875, 375, 125],
                backgroundColor: LCAUtils.chartColors.error + '80',
                borderColor: LCAUtils.chartColors.error,
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
            }
        }
    });

    // Trend Chart
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'CO₂ Emissions',
                data: [2800, 2650, 2400, 2300, 2200, 2100],
                borderColor: LCAUtils.chartColors.error,
                backgroundColor: LCAUtils.chartColors.error + '20',
                tension: 0.4
            }, {
                label: 'Energy Use',
                data: [16000, 15500, 15000, 14800, 14500, 14200],
                borderColor: LCAUtils.chartColors.warning,
                backgroundColor: LCAUtils.chartColors.warning + '20',
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
            }
        }
    });

    // Breakdown Chart
    const breakdownCtx = document.getElementById('breakdownChart').getContext('2d');
    breakdownChart = new Chart(breakdownCtx, {
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
                borderWidth: 2
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

function showChart(type) {
    const title = document.getElementById('chartTitle');
    
    switch (type) {
        case 'environmental':
            title.textContent = 'Environmental Impact Analysis';
            updateMainChart({
                labels: ['CO₂ Emissions', 'Water Use', 'Land Use', 'Toxicity'],
                datasets: [{
                    label: 'Environmental Impact Score',
                    data: [85, 62, 45, 28],
                    backgroundColor: [
                        LCAUtils.chartColors.error + '80',
                        LCAUtils.chartColors.info + '80',
                        LCAUtils.chartColors.accent + '80',
                        LCAUtils.chartColors.warning + '80'
                    ],
                    borderColor: [
                        LCAUtils.chartColors.error,
                        LCAUtils.chartColors.info,
                        LCAUtils.chartColors.accent,
                        LCAUtils.chartColors.warning
                    ],
                    borderWidth: 2
                }]
            });
            break;
            
        case 'energy':
            title.textContent = 'Energy Consumption Analysis';
            updateMainChart({
                labels: ['Mining', 'Smelting', 'Rolling', 'Transport', 'Recycling'],
                datasets: [{
                    label: 'Energy Consumption (kWh)',
                    data: [6750, 5250, 2250, 1500, 750],
                    backgroundColor: LCAUtils.chartColors.warning + '80',
                    borderColor: LCAUtils.chartColors.warning,
                    borderWidth: 2
                }]
            });
            break;
            
        case 'circular':
            title.textContent = 'Circularity Flow Analysis';
            updateMainChart({
                labels: ['Input Materials', 'Process Waste', 'Product Output', 'Recovery Rate'],
                datasets: [{
                    label: 'Material Flow (%)',
                    data: [100, 8, 92, 85],
                    backgroundColor: LCAUtils.chartColors.secondary + '80',
                    borderColor: LCAUtils.chartColors.secondary,
                    borderWidth: 2
                }]
            });
            break;
            
        case 'comparison':
            title.textContent = 'Primary vs Secondary Process Comparison';
            updateMainChart({
                labels: ['CO₂ Emissions', 'Energy Use', 'Water Use', 'Cost'],
                datasets: [{
                    label: 'Primary Process',
                    data: [2500, 15000, 3500, 100],
                    backgroundColor: LCAUtils.chartColors.error + '80',
                    borderColor: LCAUtils.chartColors.error,
                    borderWidth: 2
                }, {
                    label: 'Secondary Process',
                    data: [1500, 9000, 2100, 75],
                    backgroundColor: LCAUtils.chartColors.success + '80',
                    borderColor: LCAUtils.chartColors.success,
                    borderWidth: 2
                }]
            });
            break;
    }
    
    updateMetricsPanel(type);
}

function updateMainChart(newData) {
    mainChart.data = newData;
    mainChart.update();
}

function updateMetricsPanel(type) {
    const metrics = getMetricsForType(type);
    const metricsHTML = `
        <div class="grid grid-cols-2 gap-4">
            ${metrics.map(metric => `
                <div class="metric-item text-center p-4 bg-gray-50 rounded-lg">
                    <div class="text-2xl font-bold" style="color: ${metric.color}">${metric.value}</div>
                    <div class="text-sm text-gray-600">${metric.label}</div>
                    <div class="text-xs text-gray-500 mt-1">${metric.trend}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    document.getElementById('metricsPanel').innerHTML = metricsHTML;
}

function getMetricsForType(type) {
    const metricsData = {
        environmental: [
            { value: '2,500', label: 'kg CO₂ equivalent', color: '#dc2626', trend: '↓ 15% vs last year' },
            { value: '3,500', label: 'L water usage', color: '#0891b2', trend: '↑ 5% vs target' },
            { value: '85', label: 'Impact score', color: '#d97706', trend: '↓ 12% improvement' },
            { value: '4.2', label: 'Environmental rating', color: '#16a34a', trend: '↑ 0.3 vs industry avg' }
        ],
        energy: [
            { value: '15,000', label: 'kWh per tonne', color: '#d97706', trend: '↓ 8% vs last quarter' },
            { value: '45%', label: 'Renewable energy', color: '#16a34a', trend: '↑ 12% increase' },
            { value: '92%', label: 'Energy efficiency', color: '#059669', trend: '↑ 5% improvement' },
            { value: '₹850', label: 'Energy cost/tonne', color: '#7c3aed', trend: '↓ ₹50 reduction' }
        ],
        circular: [
            { value: '85%', label: 'Material recovery', color: '#16a34a', trend: '↑ 3% improvement' },
            { value: '92%', label: 'Recyclability', color: '#059669', trend: '→ Stable' },
            { value: '78%', label: 'Circularity index', color: '#0891b2', trend: '↑ 6% increase' },
            { value: '5.2yr', label: 'Product lifespan', color: '#7c3aed', trend: '↑ 0.8yr extension' }
        ],
        comparison: [
            { value: '40%', label: 'CO₂ reduction', color: '#16a34a', trend: 'Secondary vs Primary' },
            { value: '30%', label: 'Energy savings', color: '#059669', trend: 'Secondary vs Primary' },
            { value: '25%', label: 'Cost reduction', color: '#0891b2', trend: 'Secondary vs Primary' },
            { value: '60%', label: 'Water savings', color: '#06b6d4', trend: 'Secondary vs Primary' }
        ]
    };
    
    return metricsData[type] || metricsData.environmental;
}

function exportData() {
    const tableData = [
        ['Process Stage', 'CO₂ Emissions (kg)', 'Energy Use (kWh)', 'Water Use (L)', 'Material Recovery (%)'],
        ['Raw Material Extraction', '1,125', '6,750', '1,575', '0'],
        ['Processing & Manufacturing', '875', '5,250', '1,225', '92'],
        ['Transportation', '375', '2,250', '525', '0'],
        ['End-of-Life', '125', '750', '175', '85']
    ];
    
    const csvContent = tableData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lca_analysis_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Interactive chart features
function toggleDataset(chartRef, datasetIndex) {
    const chart = window[chartRef];
    if (chart) {
        const meta = chart.getDatasetMeta(datasetIndex);
        meta.hidden = !meta.hidden;
        chart.update();
    }
}

function resetZoom(chartRef) {
    const chart = window[chartRef];
    if (chart) {
        chart.resetZoom();
    }
}

// Real-time data updates (simulated)
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate real-time data updates
        if (mainChart && Math.random() > 0.7) {
            const data = mainChart.data.datasets[0].data;
            const newData = data.map(value => 
                value + (Math.random() - 0.5) * 50
            );
            mainChart.data.datasets[0].data = newData;
            mainChart.update();
        }
    }, 5000);
}

// Enable real-time updates
// startRealTimeUpdates();