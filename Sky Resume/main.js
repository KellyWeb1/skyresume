document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const steps = document.querySelectorAll('.step-content');
    const navSteps = document.querySelectorAll('.step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // Initialize Builder
    Builder.init();

    // Check Premium Status
    if (localStorage.getItem('sky_resume_premium') === 'true') {
        const watermark = document.querySelector('.watermark');
        if (watermark) watermark.style.display = 'none';
    }

    // Live Sync for Personal Info
    const inputs = document.querySelectorAll('[data-sync]');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const field = e.target.getAttribute('data-sync');
            const previewEl = document.getElementById(`pv-${field}`);
            if (previewEl) {
                previewEl.innerText = e.target.value || `[Your ${field}]`;
            }
        });
    });

    // Step Navigation logic
    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length) {
            goToStep(currentStep + 1);
        } else if (currentStep === steps.length) {
            handleFinalAction();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    });

    // Directly click navigation steps
    navSteps.forEach(nav => {
        nav.addEventListener('click', () => {
            const stepId = parseInt(nav.dataset.step);
            goToStep(stepId);
        });
    });

    function goToStep(stepNum) {
        steps.forEach(s => s.classList.remove('active'));
        navSteps.forEach(n => n.classList.remove('active'));
        
        currentStep = stepNum;
        document.getElementById(`step-${currentStep}`).classList.add('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
        
        updateNavButtons();
    }

    function updateNavButtons() {
        prevBtn.disabled = currentStep === 1;
        
        if (currentStep === steps.length) {
            nextBtn.innerText = 'Generate Resume';
        } else {
            nextBtn.innerText = 'Next Step';
        }
    }

    function handleFinalAction() {
        const isPremium = localStorage.getItem('sky_resume_premium') === 'true';
        if (!isPremium) {
            document.getElementById('payment-modal').style.display = 'flex';
        } else {
            exportToPDF();
        }
    }

    // Template Selector
    const templates = document.querySelectorAll('.template-card');
    templates.forEach(t => {
        t.addEventListener('click', () => {
            templates.forEach(card => card.classList.remove('active'));
            t.classList.add('active');
            const style = t.getAttribute('data-template');
            const preview = document.getElementById('resume-preview');
            
            // Clean classes and apply new one
            preview.className = `${style}-template`;
            
            // Update preview logic
            Builder.renderPreview();
        });
    });

    // Close Modal
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('payment-modal').style.display = 'none';
    });
});
