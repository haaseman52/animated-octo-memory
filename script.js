class WorldClock {
    constructor() {
        this.clocks = new Map();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadClocks();
        this.startUpdating();
    }

    setupEventListeners() {
        document.getElementById('addBtn').addEventListener('click', () => this.addClockFromInput());
        document.getElementById('timezoneInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addClockFromInput();
        });

        document.querySelectorAll('.btn-quick').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tz = e.target.dataset.tz;
                this.addClock(tz);
            });
        });
    }

    addClockFromInput() {
        const input = document.getElementById('timezoneInput');
        const timezone = input.value.trim();

        if (!timezone) {
            this.showError('Please enter a timezone');
            return;
        }

        if (this.addClock(timezone)) {
            input.value = '';
        }
    }

    addClock(timezone) {
        // Validate timezone
        try {
            new Date().toLocaleString('en-US', { timeZone: timezone });
        } catch (error) {
            this.showError(`Invalid timezone: ${timezone}`);
            return false;
        }

        if (this.clocks.has(timezone)) {
            this.showError(`${timezone} is already added`);
            return false;
        }

        this.clocks.set(timezone, true);
        this.saveClocksToStorage();
        this.renderClock(timezone);
        return true;
    }

    removeClock(timezone) {
        this.clocks.delete(timezone);
        this.saveClocksToStorage();
        this.renderClocks();
    }

    renderClocks() {
        const container = document.getElementById('clocksContainer');
        container.innerHTML = '';

        if (this.clocks.size === 0) {
            container.innerHTML = '<div class="empty-message">No timezones added yet. Add one using the input above or quick add buttons!</div>';
            return;
        }

        this.clocks.forEach((_, timezone) => {
            this.renderClock(timezone);
        });
    }

    renderClock(timezone) {
        const container = document.getElementById('clocksContainer');
        
        if (container.querySelector(`[data-timezone="${timezone}"]`)) {
            return; // Clock already exists
        }

        const clockEl = document.createElement('div');
        clockEl.className = 'clock';
        clockEl.dataset.timezone = timezone;

        const timeEl = document.createElement('div');
        timeEl.className = 'clock-time';
        timeEl.dataset.timezone = timezone;

        const tzEl = document.createElement('div');
        tzEl.className = 'clock-timezone';
        tzEl.textContent = this.formatTimezoneDisplay(timezone);

        const dateEl = document.createElement('div');
        dateEl.className = 'clock-date';
        dateEl.dataset.timezone = timezone;

        const infoEl = document.createElement('div');
        infoEl.className = 'clock-info';

        const offsetEl = document.createElement('div');
        offsetEl.className = 'clock-offset';
        offsetEl.dataset.timezone = timezone;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-remove';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => this.removeClock(timezone));

        infoEl.appendChild(offsetEl);
        infoEl.appendChild(removeBtn);

        clockEl.appendChild(tzEl);
        clockEl.appendChild(timeEl);
        clockEl.appendChild(dateEl);
        clockEl.appendChild(infoEl);

        container.appendChild(clockEl);

        // Initial update
        this.updateClock(timezone);
    }

    updateClock(timezone) {
        const now = new Date();
        const tzTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));

        // Update time
        const timeEl = document.querySelector(`[data-timezone="${timezone}"].clock-time`);
        if (timeEl) {
            const hours = String(tzTime.getHours()).padStart(2, '0');
            const minutes = String(tzTime.getMinutes()).padStart(2, '0');
            const seconds = String(tzTime.getSeconds()).padStart(2, '0');
            timeEl.textContent = `${hours}:${minutes}:${seconds}`;
        }

        // Update date
        const dateEl = document.querySelector(`[data-timezone="${timezone}"].clock-date`);
        if (dateEl) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = tzTime.toLocaleDateString('en-US', options);
        }

        // Update offset
        const offsetEl = document.querySelector(`[data-timezone="${timezone}"].clock-offset`);
        if (offsetEl) {
            const offset = this.getTimezoneOffset(timezone);
            offsetEl.textContent = `UTC ${offset}`;
        }
    }

    updateAllClocks() {
        this.clocks.forEach((_, timezone) => {
            this.updateClock(timezone);
        });
    }

    startUpdating() {
        this.updateAllClocks();
        setInterval(() => this.updateAllClocks(), 1000);
    }

    getTimezoneOffset(timezone) {
        const now = new Date();
        const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
        
        const offsetMs = tzDate - utcDate;
        const offsetHours = Math.round(offsetMs / (1000 * 60 * 60));
        
        const sign = offsetHours >= 0 ? '+' : '';
        return `${sign}${offsetHours}:00`;
    }

    formatTimezoneDisplay(timezone) {
        return timezone.split('/').join(' / ').replace(/_/g, ' ');
    }

    saveClocksToStorage() {
        localStorage.setItem('worldClocks', JSON.stringify(Array.from(this.clocks.keys())));
    }

    loadClocks() {
        const saved = localStorage.getItem('worldClocks');
        if (saved) {
            try {
                const timezones = JSON.parse(saved);
                timezones.forEach(tz => {
                    try {
                        this.clocks.set(tz, true);
                    } catch (error) {
                        console.warn(`Failed to load timezone: ${tz}`);
                    }
                });
            } catch (error) {
                console.error('Failed to load saved clocks', error);
            }
        }
        this.renderClocks();
    }

    showError(message) {
        const container = document.getElementById('clocksContainer');
        const errorEl = document.createElement('div');
        errorEl.className = 'error';
        errorEl.textContent = message;
        container.insertBefore(errorEl, container.firstChild);
        
        setTimeout(() => errorEl.remove(), 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WorldClock();
});