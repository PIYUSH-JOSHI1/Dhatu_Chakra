// Common JavaScript functionality

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Utility function to show loading spinner
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<span class="spinner"></span>Loading...';
    }
}

// Utility function to hide loading spinner
function hideLoading(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = content;
    }
}

// Flash message auto-hide
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
});

// Form validation utilities
function validateRequired(fieldId, message) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(fieldId, message);
        return false;
    } else {
        hideFieldError(fieldId);
        return true;
    }
}

function validateNumber(fieldId, min = null, max = null) {
    const field = document.getElementById(fieldId);
    const value = parseFloat(field.value);
    
    if (isNaN(value)) {
        showFieldError(fieldId, 'Please enter a valid number');
        return false;
    }
    
    if (min !== null && value < min) {
        showFieldError(fieldId, `Value must be at least ${min}`);
        return false;
    }
    
    if (max !== null && value > max) {
        showFieldError(fieldId, `Value must be at most ${max}`);
        return false;
    }
    
    hideFieldError(fieldId);
    return true;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let errorDiv = field.parentNode.querySelector('.field-error');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-sm text-red-600 mt-1';
        field.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    field.classList.add('border-red-500');
}

function hideFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = field.parentNode.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.classList.remove('border-red-500');
}

// API call utility
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Chart color schemes
const chartColors = {
    primary: '#1e40af',
    secondary: '#059669',
    accent: '#d97706',
    success: '#16a34a',
    warning: '#eab308',
    error: '#dc2626',
    info: '#0891b2'
};

// Export for use in other scripts
window.LCAUtils = {
    formatNumber,
    showLoading,
    hideLoading,
    validateRequired,
    validateNumber,
    showFieldError,
    hideFieldError,
    apiCall,
    chartColors
};