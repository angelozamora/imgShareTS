import moment from 'moment';


export function randomName() : string{
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomName = '0';
    for (let i = 0; i < 7; i++) {
        randomName += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return randomName;
}

export function timeAgo( timestamp : string) : string{
    return moment(timestamp).startOf('minute').fromNow();
}

