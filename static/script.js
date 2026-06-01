document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    form.addEventListener('submit', handleFormSubmit);
});

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    // Get form values
    const distance = document.getElementById('distance').value.trim();
    const totalStops = document.getElementById('total_stops').value.trim();
    const departureHour = document.getElementById('departure_hour').value.trim();

    // Clear previous messages
    clearMessages();

    // Validate inputs
    if (!distance || !totalStops || !departureHour) {
        showError('Please fill in all fields');
        return;
    }

    if (isNaN(distance) || isNaN(totalStops) || isNaN(departureHour)) {
        showError('Please enter valid numbers');
        return;
    }

    if (parseFloat(distance) < 0 || parseFloat(totalStops) < 0) {
        showError('Distance and stops must be non-negative values');
        return;
    }

    if (parseFloat(departureHour) < 0 || parseFloat(departureHour) > 23) {
        showError('Departure hour must be between 0 and 23');
        return;
    }

    // Show loading spinner
    showLoading(true);

    try {
        // Make API request
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                distance: parseFloat(distance),
                total_stops: parseFloat(totalStops),
                departure_hour: parseFloat(departureHour)
            })
        });

        // Handle response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An error occurred during prediction');
        }

        const result = await response.json();

        if (result.success) {
            // Display results
            displayResults(result);
            scrollToResults();
        } else {
            showError(result.error || 'Prediction failed');
        }

    } catch (error) {
        showError(error.message || 'Unable to connect to the server. Please try again.');
        console.error('Error:', error);
    } finally {
        showLoading(false);
    }
}

/**
 * Display prediction results
 */
function displayResults(result) {
    const resultsCard = document.getElementById('resultsCard');
    const resultValue = document.getElementById('resultValue');
    const summaryDistance = document.getElementById('summaryDistance');
    const summaryStops = document.getElementById('summaryStops');
    const summaryHour = document.getElementById('summaryHour');

    // Format result value with animation
    const duration = result.prediction;
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);

    let timeString = '';
    if (hours > 0) {
        timeString = `${hours}h ${minutes}m`;
    } else {
        timeString = `${minutes}m`;
    }
    timeString += ` (${duration} min)`;

    resultValue.textContent = timeString;
    summaryDistance.textContent = `${result.input.distance} km`;
    summaryStops.textContent = `${result.input.total_stops} stops`;
    
    // Format departure hour as time
    const depHour = Math.floor(result.input.departure_hour);
    const depMin = Math.floor((result.input.departure_hour % 1) * 60);
    const timeStr = `${depHour.toString().padStart(2, '0')}:${depMin.toString().padStart(2, '0')}`;
    summaryHour.textContent = timeStr;

    // Show results card with animation
    resultsCard.style.display = 'block';
    resultsCard.classList.add('show');
}

/**
 * Show error message
 */
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = '❌ ' + message;
    errorDiv.style.display = 'block';
}

/**
 * Clear error messages
 */
function clearMessages() {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';
}

/**
 * Show/hide loading spinner
 */
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    const btn = document.getElementById('predictBtn');
    
    if (show) {
        spinner.style.display = 'block';
        btn.disabled = true;
        btn.style.opacity = '0.6';
    } else {
        spinner.style.display = 'none';
        btn.disabled = false;
        btn.style.opacity = '1';
    }
}

/**
 * Reset form and hide results
 */
function resetForm() {
    document.getElementById('predictionForm').reset();
    document.getElementById('resultsCard').style.display = 'none';
    document.getElementById('distance').focus();
    clearMessages();
}

/**
 * Scroll to results
 */
function scrollToResults() {
    const resultsCard = document.getElementById('resultsCard');
    setTimeout(() => {
        resultsCard.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

// Allow Enter key to submit form
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const form = document.getElementById('predictionForm');
        if (form.contains(event.target)) {
            document.getElementById('predictBtn').click();
        }
    }
});
