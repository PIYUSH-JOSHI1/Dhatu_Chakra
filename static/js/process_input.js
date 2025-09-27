// Process Input Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
});

function initializeForm() {
    const form = document.getElementById('processForm');
    
    // Add form validation
    form.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
    
    // Add dynamic field updates based on process type
    document.getElementById('process_type').addEventListener('change', updateFormBasedOnProcessType);
    document.getElementById('metal_type').addEventListener('change', updateFormBasedOnMetal);
}

function validateForm() {
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['user_id', 'location', 'process_type', 'metal_type'];
    
    requiredFields.forEach(fieldId => {
        if (!LCAUtils.validateRequired(fieldId, 'This field is required')) {
            isValid = false;
        }
    });
    
    // Validate numeric fields
    const numericFields = [
        { id: 'energy_consumption', min: 0 },
        { id: 'transport_distance', min: 0 },
        { id: 'recovery_rate', min: 0, max: 100 },
        { id: 'production_volume', min: 0 },
        { id: 'water_usage', min: 0 },
        { id: 'waste_generation', min: 0 }
    ];
    
    numericFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element.value && !LCAUtils.validateNumber(field.id, field.min, field.max)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function updateFormBasedOnProcessType() {
    const processType = document.getElementById('process_type').value;
    const recoveryRateGroup = document.getElementById('recovery_rate').closest('.form-group');
    
    if (processType === 'primary') {
        recoveryRateGroup.style.opacity = '0.5';
        document.getElementById('recovery_rate').placeholder = 'Not applicable for primary process';
    } else if (processType === 'secondary') {
        recoveryRateGroup.style.opacity = '1';
        document.getElementById('recovery_rate').placeholder = 'e.g., 85';
        document.getElementById('recovery_rate').required = true;
    } else {
        recoveryRateGroup.style.opacity = '1';
        document.getElementById('recovery_rate').placeholder = 'e.g., 85';
    }
}

function updateFormBasedOnMetal() {
    const metalType = document.getElementById('metal_type').value;
    const energyField = document.getElementById('energy_consumption');
    
    // Set typical energy consumption ranges based on metal type
    const typicalValues = {
        'aluminium': { energy: 15000, water: 3500 },
        'copper': { energy: 12000, water: 2800 },
        'steel': { energy: 8000, water: 1500 },
        'zinc': { energy: 10000, water: 2200 },
        'lead': { energy: 7000, water: 1800 },
        'nickel': { energy: 18000, water: 4000 }
    };
    
    if (typicalValues[metalType]) {
        energyField.placeholder = `Typical: ${typicalValues[metalType].energy} kWh/tonne`;
        document.getElementById('water_usage').placeholder = `Typical: ${typicalValues[metalType].water} L/tonne`;
    }
}

function resetForm() {
    if (confirm('Are you sure you want to reset all fields?')) {
        document.getElementById('processForm').reset();
        
        // Clear all error messages
        const errorMessages = document.querySelectorAll('.field-error');
        errorMessages.forEach(error => error.remove());
        
        // Remove error styling
        const errorFields = document.querySelectorAll('.border-red-500');
        errorFields.forEach(field => field.classList.remove('border-red-500'));
        
        // Reset dynamic styling
        const recoveryRateGroup = document.getElementById('recovery_rate').closest('.form-group');
        recoveryRateGroup.style.opacity = '1';
    }
}

// Auto-save functionality (save to localStorage)
function autoSave() {
    const formData = new FormData(document.getElementById('processForm'));
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    localStorage.setItem('lca_process_draft', JSON.stringify(data));
}

// Load auto-saved data
function loadAutoSaved() {
    const savedData = localStorage.getItem('lca_process_draft');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = document.getElementById(key);
            if (field && data[key]) {
                field.value = data[key];
            }
        });
    }
}

// Save form data every 30 seconds
setInterval(autoSave, 30000);

// Load saved data on page load
document.addEventListener('DOMContentLoaded', loadAutoSaved);

// Clear auto-saved data on successful submission
document.getElementById('processForm').addEventListener('submit', function() {
    setTimeout(() => {
        localStorage.removeItem('lca_process_draft');
    }, 1000);
});