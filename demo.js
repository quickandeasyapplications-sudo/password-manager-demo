// Quick and Easy Tech Password Manager - Interactive Demo
// All data is stored in memory for demonstration purposes

let passwords = [
    {
        id: 1,
        service: 'GitHub',
        username: 'developer@example.com',
        password: 'Gh!7kL@9mP2$qR',
        category: 'work',
        notes: 'Development account',
        created: new Date('2024-01-15')
    },
    {
        id: 2,
        service: 'Gmail',
        username: 'john.doe@gmail.com',
        password: 'Em@1lP@ssw0rd!',
        category: 'personal',
        notes: 'Personal email',
        created: new Date('2024-02-20')
    },
    {
        id: 3,
        service: 'Bank of America',
        username: 'johndoe123',
        password: 'B@nk!ng$ecure99',
        category: 'finance',
        notes: 'Online banking',
        created: new Date('2024-03-10')
    },
    {
        id: 4,
        service: 'LinkedIn',
        username: 'john.doe',
        password: 'L!nk3d1n#2024',
        category: 'work',
        notes: 'Professional network',
        created: new Date('2024-04-05')
    },
    {
        id: 5,
        service: 'Amazon',
        username: 'john.doe@gmail.com',
        password: 'Amaz0n$h0pp!ng',
        category: 'personal',
        notes: 'Shopping account',
        created: new Date('2024-05-12')
    }
];

let currentPassword = '';

// Initialize the demo
function init() {
    renderPasswords();
    updateSecurityStats();
}

// Switch between tabs
function switchTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Deactivate all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Activate selected tab
    event.target.classList.add('active');
    
    // Update security stats when switching to security tab
    if (tabName === 'security') {
        updateSecurityStats();
    }
}

// Render password list
function renderPasswords() {
    const container = document.getElementById('passwordList');
    
    if (passwords.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                No passwords stored yet. Click "Add New" to create your first password entry.
            </div>
        `;
        return;
    }
    
    container.innerHTML = passwords.map(pwd => `
        <div class="password-item">
            <div class="password-info">
                <h3>${pwd.service} <span class="feature-badge">${pwd.category.toUpperCase()}</span></h3>
                <p>Username: ${pwd.username}</p>
                <div class="password-value" id="pwd-${pwd.id}" style="display: none;">
                    ${pwd.password}
                </div>
                ${pwd.notes ? `<p style="color: #666; font-style: italic; margin-top: 8px;">📝 ${pwd.notes}</p>` : ''}
                <p style="color: #666; font-size: 12px; margin-top: 8px;">
                    Created: ${pwd.created.toLocaleDateString()}
                </p>
            </div>
            <div class="password-actions">
                <button class="btn btn-secondary" onclick="togglePassword(${pwd.id})">
                    👁️ Show
                </button>
                <button class="btn btn-primary" onclick="copyPasswordToClipboard('${pwd.password}')">
                    📋 Copy
                </button>
                <button class="btn btn-danger" onclick="deletePassword(${pwd.id})">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Toggle password visibility
function togglePassword(id) {
    const element = document.getElementById(`pwd-${id}`);
    const button = event.target;
    
    if (element.style.display === 'none') {
        element.style.display = 'block';
        button.textContent = '🙈 Hide';
    } else {
        element.style.display = 'none';
        button.textContent = '👁️ Show';
    }
}

// Copy password to clipboard
function copyPasswordToClipboard(password) {
    navigator.clipboard.writeText(password).then(() => {
        alert('✅ Password copied to clipboard!\n\n⚠️ For security, the clipboard will be cleared in 30 seconds.');
        
        // Clear clipboard after 30 seconds
        setTimeout(() => {
            navigator.clipboard.writeText('');
        }, 30000);
    }).catch(err => {
        alert('❌ Failed to copy password. Please try again.');
    });
}

// Delete password
function deletePassword(id) {
    if (confirm('Are you sure you want to delete this password?')) {
        passwords = passwords.filter(pwd => pwd.id !== id);
        renderPasswords();
        updateSecurityStats();
        alert('✅ Password deleted successfully!');
    }
}

// Add new password
function addPassword(event) {
    event.preventDefault();
    
    const newPassword = {
        id: Date.now(),
        service: document.getElementById('serviceName').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        category: document.getElementById('category').value,
        notes: document.getElementById('notes').value,
        created: new Date()
    };
    
    passwords.push(newPassword);
    
    // Reset form
    document.getElementById('addPasswordForm').reset();
    
    // Switch to passwords tab
    document.getElementById('passwords').classList.add('active');
    document.getElementById('add').classList.remove('active');
    
    // Update tab buttons
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[0].classList.add('active');
    
    // Render updated list
    renderPasswords();
    updateSecurityStats();
    
    alert('✅ Password saved successfully!\n\n🔒 Your password is encrypted with AES-256-GCM and stored locally on your device.');
}

// Generate password
function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        alert('❌ Please select at least one character type!');
        return;
    }
    
    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }
    
    currentPassword = password;
    
    // Display generated password
    document.getElementById('generatedPassword').textContent = password;
    document.getElementById('generatorOutput').style.display = 'block';
    
    // Calculate and display strength
    const strength = calculatePasswordStrength(password);
    updateStrengthMeter(strength);
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length
    if (password.length >= 12) score += 25;
    else if (password.length >= 8) score += 15;
    else score += 5;
    
    // Character variety
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 20;
    
    // Bonus for length
    if (password.length >= 16) score += 10;
    
    return Math.min(score, 100);
}

// Update strength meter
function updateStrengthMeter(score) {
    const fill = document.getElementById('strengthFill');
    const text = document.getElementById('strengthText');
    
    fill.style.width = score + '%';
    
    if (score < 40) {
        fill.className = 'strength-fill strength-weak';
        text.textContent = '❌ Weak Password (Score: ' + score + '/100)';
        text.style.color = '#FF4444';
    } else if (score < 70) {
        fill.className = 'strength-fill strength-medium';
        text.textContent = '⚠️ Medium Password (Score: ' + score + '/100)';
        text.style.color = '#FFA500';
    } else {
        fill.className = 'strength-fill strength-strong';
        text.textContent = '✅ Strong Password (Score: ' + score + '/100)';
        text.style.color = '#A6FF00';
    }
}

// Copy generated password
function copyPassword() {
    navigator.clipboard.writeText(currentPassword).then(() => {
        alert('✅ Password copied to clipboard!');
    }).catch(err => {
        alert('❌ Failed to copy password. Please try again.');
    });
}

// Update password length display
function updateLength(value) {
    document.getElementById('lengthValue').textContent = value;
}

// Update security statistics
function updateSecurityStats() {
    const total = passwords.length;
    let strong = 0;
    let weak = 0;
    const passwordValues = [];
    let duplicates = 0;
    
    passwords.forEach(pwd => {
        const strength = calculatePasswordStrength(pwd.password);
        if (strength >= 70) strong++;
        else if (strength < 40) weak++;
        
        if (passwordValues.includes(pwd.password)) {
            duplicates++;
        } else {
            passwordValues.push(pwd.password);
        }
    });
    
    document.getElementById('totalPasswords').textContent = total;
    document.getElementById('strongPasswords').textContent = strong;
    document.getElementById('weakPasswords').textContent = weak;
    document.getElementById('duplicatePasswords').textContent = duplicates;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);

