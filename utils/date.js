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

export default getDateString;