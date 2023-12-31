import React, { useEffect } from 'react';

const EasterEggs = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const birthdays = {
        '1-14': 'marko', // Sound check - Artmania
        '2-21': 'floor', // The Poet - End - Wembley 15
        '4-21': 'jukka', // Sacrament - Macumba 99
        '5-30': 'troy', // Sleeping Sun - Luna Park 15
        '6-21': 'anette', // Amaranth end - Tavastia 07
        '6-24': 'emppu', // Dead Boy's Poem / Walking In The Air - Graspop 09
        '8-17': 'tarja', // Beauty - Providência 00
        '9-26': 'sami', // Moondance - Palatsi 99
        '12-25': 'tuomas', // Beauty and the Beast - Tavastia 98
        '12-31': 'kai', // Ghost Love Score - Drum Cam - Espoo 15
    };

    const birthday = birthdays[month + '-' + day];

    const audio = birthday ? new Audio(`/assets/ee/audio/ee_${birthday}.mp3`) : undefined;
    const audioReseter = audio ? audio.addEventListener('ended', () => (audioPlaying = false)) : undefined;
    let audioPlaying = false;

    useEffect(() => {
        return () => {
            if (audio) {
                audio.removeEventListener('ended', audioReseter);
            }
        };
    }, []);

    return (
        <div>
            {birthday !== undefined ? (
                <img
                    src={`/assets/ee/ee_${birthday}_bd.png`}
                    alt="easter egg"
                    style={{
                        position: 'fixed',
                        bottom: '0px',
                        right: '0px',
                        height: '100px',
                    }}
                    onClick={() => {
                        if (audioPlaying) {
                            audio.pause();
                            audio.currentTime = 0;
                            audioPlaying = false;
                            return;
                        }
                        audioPlaying = true;
                        audio.play();
                    }}
                />
            ) : (
                <React.Fragment />
            )}
        </div>
    );
};

export default EasterEggs;
