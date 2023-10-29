function formatNumber(value) {
    const absValue = Math.abs(value);
    let prefix = value < 0 ? '-' : '';
    if (absValue >= 1000000000) {
        return prefix + (absValue / 1000000000) + 'B';
    } else if (absValue >= 1000000 && absValue < 1000000000) {
        return prefix + (absValue / 1000000) + 'M';
    } else {
        return value;
    }
}

module.exports = {
    formatNumber
};