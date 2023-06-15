export const convertTimeStringToSeconds = (time) => {
    const parcels = time.split(':');
    const timeUnits = parcels.length - 1;
    let total = 0;

    for (let i = timeUnits; i >= 0; i--) {
        if (i === timeUnits) {
            total += parseInt(parcels[i]);
            continue;
        }

        total += parseInt(parcels[i]) * 60 ** (timeUnits - i);
    }

    return total;
};

export const convertSecondsToTimeString = (time, format) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    switch (format) {
        case 0:
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`;
        default:
            return `${hours === 0 ? '' : `${hours.toString().padStart(2, '0')}hrs `}${minutes
                .toString()
                .padStart(2, '0')}min ${seconds.toString().padStart(2, '0')}sec`;
    }
};

export const convertDateToHumanReadable = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const convertSizeToHumanReadable = (bytes) => {
    const kiloBytes = bytes / 1024;
    const megaBytes = kiloBytes / 1024;
    const gigaBytes = megaBytes / 1024;
    const teraBytes = gigaBytes / 1024;

    return teraBytes >= 1
        ? `${teraBytes.toFixed(2)} TB`
        : gigaBytes >= 1
        ? `${gigaBytes.toFixed(2)} GB`
        : `${megaBytes.toFixed(2)} MB`;
};
