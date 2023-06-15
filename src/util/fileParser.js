import { convertTimeStringToSeconds } from '../util/utils';

export const parseBootlegs = (data) => {
    const skipInitialLines = 13;

    const result = {
        bootlegs: [],
        stats: {},
    };

    data = data.split('\n').slice(skipInitialLines);

    for (let entry of data) {
        entry = entry.split('\t');

        const show = {
            date: new Date(entry[0]),
            dateAdded: new Date(entry[1]),
            id: entry[2],
            band: entry[3],
            venue: entry[4],
            city: entry[5],
            country: entry[6],
            tour: entry[7] === '' ? 'Unknown tour' : entry[7],
            members: entry[8] === '' ? [] : entry[8].split(', '),
            guests: entry[9] === '' ? [] : entry[9].split(', '),
            observations: entry[10] === '' ? 'No observations' : entry[10],
            audioQuality: entry[11] === '' ? '-' : entry[11],
            videoQuality: entry[12] === '' ? '-' : entry[12],
            audioSource: entry[13] === '' ? '-' : entry[13],
            videoSource: entry[14] === '' ? '-' : entry[14],
            format: entry[15],
            audioFormatList: entry[16] === '' ? '-' : entry[16],
            videoFormatList: entry[17] === '' ? '-' : entry[17],
            audioSampleSize: entry[18] === '' ? '-' : entry[18],
            audioBitRate: entry[19] === '' ? '-' : entry[19],
            audioSampleRate: entry[20] === '' ? '-' : entry[20],
            resolution: entry[21] === '' ? '-' : entry[21],
            framerate: entry[22] === '' ? '-' : entry[22],
            version: entry[23],
            duration: entry[24] === '' ? 0 : convertTimeStringToSeconds(entry[24]),
            size: entry[25] === '' ? 0 : parseInt(entry[25]),
            isComplete: entry[26] === '' ? 'No' : 'Yes',
            isRare: entry[27] === '' ? false : true,
            notForTrade: entry[28] === '' ? false : true,
            taper: entry[29] === '' ? '-' : entry[29],
            isNotable: entry[30] === '' ? false : true,
            hasImage: entry[31] === '' ? false : true,
            hasFrequency: entry[32] === '' ? false : true,
            snapshotLocation: entry[33] === '' ? '-' : entry[33],
            lineage: entry[34] === '' ? [] : entry[34].split(' > '),
            setlist: entry[35] === '' ? [] : entry[35].split('/'),
        };

        result.bootlegs.push(show);

        const bandName = show.band.toLowerCase().replace(' ', '');
        const stats = result.stats[bandName];

        if (stats) {
            stats.totalShows++;
            stats.totalTime += show.duration;
            stats.totalSize += show.size;
            stats.tradeable += !show.isRare && !show.notForTrade ? 1 : 0;
            stats.rare += show.isRare ? 1 : 0;
            stats.notForTrade += show.notForTrade ? 1 : 0;

            if (!stats.formats.find((f) => f === show.format)) {
                stats.formats.push(show.format);
            }

            if (!stats.years.find((y) => y === show.date.getFullYear())) {
                stats.years.push(show.date.getFullYear());
            }

            if (show.tour !== null && !stats.tours.find((t) => t === show.tour)) {
                stats.tours.push(show.tour);
            }

            if (!stats.countries.find((c) => c === show.country)) {
                stats.countries.push(show.country);
            }

            if (show.audioSource !== null && !stats.audioSources.find((as) => as === show.audioSource)) {
                stats.audioSources.push(show.audioSource);
            }

            if (show.videoSource !== null && !stats.videoSources.find((vs) => vs === show.videoSource)) {
                stats.videoSources.push(show.videoSource);
            }

            if (show.audioFormatList !== null && !stats.audioFormats.find((vs) => vs === show.audioFormatList)) {
                stats.audioFormats.push(show.audioFormatList);
            }

            if (show.videoFormatList !== null && !stats.videoFormats.find((vs) => vs === show.videoFormatList)) {
                stats.videoFormats.push(show.videoFormatList);
            }
        } else {
            const formats = [];
            const years = [];
            const tours = [];
            const countries = [];
            const audioSources = [];
            const videoSources = [];
            const audioFormats = [];
            const videoFormats = [];

            formats.push(show.format);
            years.push(show.date.getFullYear());
            countries.push(show.country);

            if (show.tour !== null) {
                tours.push(show.tour);
            }

            if (show.audioSource !== null) {
                audioSources.push(show.audioSource);
            }

            if (show.videoSource !== null) {
                videoSources.push(show.videoSource);
            }

            if (show.audioFormatList !== null) {
                audioFormats.push(show.audioFormatList);
            }

            if (show.videoFormatList !== null) {
                videoFormats.push(show.videoFormatList);
            }

            result.stats[bandName] = {
                name: show.band,
                totalShows: 1,
                totalTime: show.duration,
                totalSize: show.size,
                tradeable: !show.isRare && !show.notForTrade ? 1 : 0,
                rare: show.isRare ? 1 : 0,
                notForTrade: show.notForTrade ? 1 : 0,
                formats,
                years,
                tours,
                countries,
                audioSources,
                videoSources,
                audioFormats,
                videoFormats,
            };
        }
    }

    for (const band in result.stats) {
        result.stats[band].formats.sort();
        result.stats[band].years.sort();
        result.stats[band].tours.sort();
        result.stats[band].countries.sort();
        result.stats[band].audioSources.sort();
        result.stats[band].videoSources.sort();
        result.stats[band].audioFormats.sort();
        result.stats[band].videoFormats.sort();
        result.stats[band].tradeablePercent = Math.round(
            (result.stats[band].tradeable /
                (result.stats[band].tradeable + result.stats[band].rare + result.stats[band].notForTrade)) *
                100
        );
        result.stats[band].rarePercent = Math.round(
            (result.stats[band].rare /
                (result.stats[band].tradeable + result.stats[band].rare + result.stats[band].notForTrade)) *
                100
        );
        result.stats[band].notForTradePercent = Math.round(
            (result.stats[band].notForTrade /
                (result.stats[band].tradeable + result.stats[band].rare + result.stats[band].notForTrade)) *
                100
        );
    }

    return result;
};

export const parseWishlist = (data) => {
    const skipInitialLines = 1;

    const result = [];

    data = data.split('\n').slice(skipInitialLines);

    for (let entry of data) {
        entry = entry.split('\t');

        let wish = {
            date: new Date(entry[0]),
            band: entry[1],
            description: entry[2] === '' ? null : entry[2],
        };

        result.push(wish);
    }

    return result;
};

export const parseTraders = (data) => {
    const skipInitialLines = 1;

    const result = [];

    data = data.split('\n').slice(skipInitialLines);

    for (let entry of data) {
        entry = entry.split('\t');

        let trader = {
            alias: entry[0] === '' ? null : entry[0],
            website: entry[1] === '' ? null : entry[1],
            email: entry[2] === '' ? null : entry[2],
            country: entry[3] === '' ? null : entry[3],
            isGood: entry[4] === '' ? false : true,
            observations: entry[5] === '' ? null : entry[5],
        };

        result.push(trader);
    }

    return result;
};

export const parseInfo = (data) => {
    const skipInitialLines = 1;

    data = data.split('\n').slice(skipInitialLines);
    data = data[0].split('\t');

    const result = {
        tradingStatus: data[0],
        color: data[1],
        email: data[2],
        interested: data[3] === '' ? [] : data[3].split(', '),
    };

    return result;
};

export const parseRatios = (data) => {
    const skipInitialLines = 1;

    const result = {
        audio: [],
        video: [],
        other: [],
    };

    data = data.split('\n').slice(skipInitialLines);

    for (let entry of data) {
        entry = entry.split('\t');

        let audio = {
            trader1: entry[0],
            trader2: entry[1],
        };

        let video = {
            trader1: entry[2],
            trader2: entry[3],
        };

        let other = {
            trader1: entry[4],
            trader2: entry[5],
        };

        if (audio.trader1 !== '' && audio.trader2 !== '') {
            result.audio.push(audio);
        }

        if (video.trader1 !== '' && video.trader2 !== '') {
            result.video.push(video);
        }

        if (other.trader1 !== '' && other.trader2 !== '') {
            result.other.push(other);
        }
    }

    return result;
};
