function secondsToTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        return 'Invalid input';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours > 0 ? hours + 'h ' : '';
    const formattedMinutes = minutes > 0 ? minutes + 'm ' : '';
    const formattedSeconds = remainingSeconds > 0 ? remainingSeconds + 's' : '';

    return formattedHours + formattedMinutes + formattedSeconds;
}
export {secondsToTime}