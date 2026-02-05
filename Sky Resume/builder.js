/**
 * Logic for managing dynamic resume sections (Experience, Education, Skills)
 */

const Builder = {
    // Dynamic lists data
    experience: [],
    education: [],
    skills: '',

    // Init Event Listeners
    init() {
        this.addExperienceItem();
        this.addEducationItem();

        document.getElementById('add-xp').addEventListener('click', () => this.addExperienceItem());
        document.getElementById('add-edu').addEventListener('click', () => this.addEducationItem());
        
        // Listen to skills input
        document.getElementById('in-skills').addEventListener('input', (e) => {
            this.skills = e.target.value;
            this.renderPreview();
        });
    },

    addExperienceItem() {
        const id = Date.now();
        const html = `
            <div class="dynamic-item" id="xp-${id}">
                <button class="remove-btn" onclick="Builder.removeItem('xp-${id}')">&times;</button>
                <div class="input-group">
                    <label>Company</label>
                    <input type="text" class="xp-company" placeholder="e.g. Tesla" oninput="Builder.renderPreview()">
                </div>
                <div class="input-group">
                    <label>Role</label>
                    <input type="text" class="xp-role" placeholder="e.g. Software Engineer" oninput="Builder.renderPreview()">
                </div>
                <div class="input-group">
                    <label>Duration</label>
                    <input type="text" class="xp-date" placeholder="e.g. 2020 - Present" oninput="Builder.renderPreview()">
                </div>
                <div class="input-group">
                    <label>Description</label>
                    <textarea class="xp-desc" placeholder="Responsibilities..." oninput="Builder.renderPreview()"></textarea>
                </div>
            </div>
        `;
        document.getElementById('experience-list').insertAdjacentHTML('beforeend', html);
        this.renderPreview();
    },

    addEducationItem() {
        const id = Date.now();
        const html = `
            <div class="dynamic-item" id="edu-${id}">
                <button class="remove-btn" onclick="Builder.removeItem('edu-${id}')">&times;</button>
                <div class="input-group">
                    <label>Institution</label>
                    <input type="text" class="edu-school" placeholder="e.g. Stanford University" oninput="Builder.renderPreview()">
                </div>
                <div class="input-group">
                    <label>Degree</label>
                    <input type="text" class="edu-degree" placeholder="e.g. B.Sc Computer Science" oninput="Builder.renderPreview()">
                </div>
                <div class="input-group">
                    <label>Year</label>
                    <input type="text" class="edu-date" placeholder="e.g. 2018" oninput="Builder.renderPreview()">
                </div>
            </div>
        `;
        document.getElementById('education-list').insertAdjacentHTML('beforeend', html);
        this.renderPreview();
    },

    removeItem(id) {
        document.getElementById(id).remove();
        this.renderPreview();
    },

    renderPreview() {
        // Render Experience
        const xpPreview = document.getElementById('pv-experience');
        const xpItems = document.querySelectorAll('.dynamic-item[id^="xp-"]');
        let xpHTML = '<div class="section-title">Experience</div>';
        xpItems.forEach(item => {
            const company = item.querySelector('.xp-company').value || 'Company Name';
            const role = item.querySelector('.xp-role').value || 'Role Title';
            const date = item.querySelector('.xp-date').value || 'Dates';
            const desc = item.querySelector('.xp-desc').value || '';
            
            xpHTML += `
                <div class="xp-item">
                    <div class="xp-header"><span>${role}</span><span>${date}</span></div>
                    <div class="xp-place">${company}</div>
                    <div class="xp-desc">${desc.replace(/\n/g, '<br>')}</div>
                </div>
            `;
        });
        xpPreview.innerHTML = xpHTML;

        // Render Education
        const eduPreview = document.getElementById('pv-education');
        const eduItems = document.querySelectorAll('.dynamic-item[id^="edu-"]');
        let eduHTML = '<div class="section-title">Education</div>';
        eduItems.forEach(item => {
            const school = item.querySelector('.edu-school').value || 'University';
            const degree = item.querySelector('.edu-degree').value || 'Degree';
            const date = item.querySelector('.edu-date').value || 'Year';
            
            eduHTML += `
                <div class="edu-item">
                    <div class="edu-header"><span>${degree}</span><span>${date}</span></div>
                    <div class="edu-place">${school}</div>
                </div>
            `;
        });
        eduPreview.innerHTML = eduHTML;

        // Render Skills
        const skillsPreview = document.getElementById('pv-skills');
        const skillArray = this.skills.split(',').map(s => s.trim()).filter(s => s !== '');
        let skillsHTML = '<div class="section-title">Skills</div><div class="skills-container">';
        skillArray.forEach(skill => {
            skillsHTML += `<span class="skill-tag">${skill}</span>`;
        });
        skillsHTML += '</div>';
        skillsPreview.innerHTML = skillArray.length > 0 ? skillsHTML : '';
    }
}






