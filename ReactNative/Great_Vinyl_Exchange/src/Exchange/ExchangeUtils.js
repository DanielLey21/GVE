export function generateMatchups(members, history) {
    let senderList = members.slice();
    let recieverList = members.slice();
    let matchups = {};
    console.log(history);

    while(senderList.length !== 0) {
        let sendTo;
        do {
            const rand = Math.floor(Math.random() * (recieverList.length));
            sendTo = recieverList[rand];
            let hasBeenSentTo = false;
            for (let value of Object.values(matchups)) {
                if (value === sendTo) {
                    hasBeenSentTo = true;
                }
            }

            // Check to make sure the matchup is valid
            if (matchups[senderList[0]] === undefined 
                && senderList[0] !== sendTo
                && !hasBeenSentTo) {
                matchups[senderList[0]] = sendTo;
            }

            let isInRecentHistory = false;
            //console.log(history);
            for (let matchups of history) {
                //console.log(matchups);
                if (matchups[senderList[0]] === sendTo) {
                    console.log(senderList[0]);
                    console.log(sendTo);
                    isInRecentHistory = true;
                }
            }
            
            // Check to make sure that the current matchup is not x=x and the last of the send list
            if ((senderList[0] === sendTo && senderList.length === 1) || isInRecentHistory) {
                senderList = members.slice();
                recieverList = members.slice();
                matchups = {};
            }
        } while (matchups[senderList[0]] === undefined );
        console.log('Found a match');
        senderList.splice(0, 1);
    }
    console.log('Found the matchups');
    console.log(matchups);
}