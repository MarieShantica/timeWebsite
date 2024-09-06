function updateTimeForContainer(containerId, timeZone) {
    const now = new Date();
    const time = new Date(now.toLocaleString("en-US", { timeZone: timeZone }));
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');

    document.getElementById(containerId + 'Time').textContent = `${containerId.replace(/([A-Z])/g, ' $1')} Time: ${hours}:${minutes}:${seconds}`;

    const midnight = new Date(time);
    midnight.setHours(24, 0, 0, 0);
    const timeDiff = midnight - time;
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
    document.getElementById(containerId + 'TimeLeft').textContent = `Time Left Today: ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
}

function startUpdatingTimeForContainer(containerId, timeZone) {
    if (!document.getElementById(containerId).classList.contains('paused')) {
        updateTimeForContainer(containerId, timeZone);
        return setInterval(() => updateTimeForContainer(containerId, timeZone), 1000);
    }
}

function toggleContainer(containerId, timeZone) {
    const container = document.getElementById(containerId);
    if (container.classList.contains('paused')) {
        container.classList.remove('paused');
        container.interval = startUpdatingTimeForContainer(containerId, timeZone);
    } else {
        container.classList.add('paused');
        clearInterval(container.interval);
    }
}

// Initialize intervals
document.querySelectorAll('.container').forEach(container => {
    const containerId = container.id;
    const timeZone = container.dataset.timezone;
    container.interval = startUpdatingTimeForContainer(containerId, timeZone);

    container.addEventListener('click', () => toggleContainer(containerId, timeZone));
});
