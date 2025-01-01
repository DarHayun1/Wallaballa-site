import CONFIG from './config.js';

function isIOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function showDesktopMessage() {
    document.getElementById('desktop-message').style.display = 'block';
    document.querySelector('h1').style.display = 'none';
    document.querySelector('p').style.display = 'none';
}

function openAppOrStore() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const queryParams = window.location.search;

    if (isIOS()) {
        window.location.href = `${CONFIG.IOS.APP_SCHEME}${queryParams}`;
        setTimeout(() => {
            window.location.href = CONFIG.IOS.APP_STORE;
        }, 1500);
    } else if (/android/i.test(userAgent)) {
        window.location.href = `intent://open${queryParams}#Intent;scheme=wallaballa;package=${CONFIG.ANDROID.PACKAGE};S.browser_fallback_url=${CONFIG.ANDROID.PLAY_STORE};end`;
    } else {
        showDesktopMessage();
    }
}

window.openAppOrStore = openAppOrStore;

window.onload = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (!(isIOS() || /android/i.test(userAgent))) {
        showDesktopMessage();
    }
}; 