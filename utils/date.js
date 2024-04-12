const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const options = {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
};

const getDateString = (dateParam) => {
    const date = dateParam instanceof Date ? dateParam : new Date(dateParam);
    console.log(date.toLocaleString('en-GB', options));
    return date.toLocaleString('en-GB', options);
};
export function convertDateStrToHourMinute(dateStr) {
    const dateObj = new Date(dateStr);
    const hour = dateObj.getUTCHours()
    const minute = dateObj.getUTCMinutes()
    const formattedHours = hour.toString().padStart(2, '0'); // Ensure two digits
    const formattedMinutes = minute.toString().padStart(2, '0'); // Ensure two digits
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    
    return formattedTime;
}

export default getDateString;

export function getAccurancyDateVN(date) {  
    const utcDate = new Date(date);
    const utcTime = utcDate.getTime();
    const utcPlus7Offset = 7 * 60 * 60 * 1000;
    const utcPlus7Time = new Date(utcTime + utcPlus7Offset);
    return utcPlus7Time.toISOString();
}