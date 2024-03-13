const Dupa = () => {

    const teamsData2 = [
        //[name,wins,draws,losses,G+,G-]
        ["CFFC Segundo", 0, 0, 0, 0, 0],
        ["Wotforden Unixi", 0, 0, 0, 0, 0],
        ["Hajduk Era-Split", 0, 0, 0, 0, 0],
        ["CFC Dinze Rimavera", 0, 0, 0, 0, 0],
        ["Versmarv Vokulsk", 0, 0, 0, 0, 0],
        ["Arghan Denashi", 0, 0, 0, 0, 0]
    ]

    const generateTable = (teams, rounds) => {
        let teamsInfo = []
        let totalMatches = []
        const numOfOpp = teams.length - 1
        const addMatches = (round) => {
            if (round % 2 === 0) {
                for (let n = 0; n < matches.length; n++) {
                    totalMatches.push(matches[n])
                }
            } else {
                let reversedMatches = []
                for (let i = 0; i < matches.length; i++) {
                    let reversedMatchday = []
                    for (let j = 0; j < matches[i].length; j++) {
                        let match = {
                            host: matches[i][j].guest,
                            guest: matches[i][j].host,
                            hostGoals: null,
                            guestGoals: null
                        }
                        reversedMatchday.push(match)
                    }
                    reversedMatches.push(reversedMatchday)
                }
                for (let n = 0; n < reversedMatches.length; n++) {
                    totalMatches.push(reversedMatches[n])
                }
            }
        }

        let matches = []
        for (let i = 0; i < teams.length; i++) { //tworzenie informacji o drużynach
            let teamInfo = {
                team: teams[i],
                hadMatchWith: []
            }
            teamsInfo.push(teamInfo)
        }
        for (let i = 0; i < numOfOpp; i++) { //tworzenie obiektów dni meczowych
            let matchday = []
            for (let j = 0; j < teams.length / 2; j++) { //pętla dodająca odpowiednią liczbę obiektów meczy
                matchday.push(null)
            }
            matches.push(matchday)
        }
        let didTeamsPlayed = [] //tablica do sprawdzania, czy drużyna ma już mecz w danej kolejce
        for (let i = 0; i < numOfOpp; i++) {
            let row = []
            didTeamsPlayed.push(row)
        }
        for (let i = 0; i < teams.length; i++) { //pętla przechodzi po kolei przez każdą drużynę: i - drużyna, której mecze są wybierane
            let opponentIndex = numOfOpp
            for (let j = 0; j < numOfOpp; j++) { //dodawanie wszystkich meczów jednej drużyny w danej rundzie: j - matchday
                if (!didTeamsPlayed[j].includes(i)) {
                    for (let k = 0; k < numOfOpp; k++) {
                        if (teamsInfo[i].hadMatchWith.includes(opponentIndex) || didTeamsPlayed[j].includes(opponentIndex) || opponentIndex === i) {
                            opponentIndex--
                            if (opponentIndex === -1) {
                                opponentIndex = numOfOpp
                            }
                        } else {
                            if (i > Math.floor(numOfOpp / 2)) { //zabezpieczenie w przypadku, gdy drużyna o indeks niżej niż aktualny opponentIndex ma już mecz w każdej następnej kolejce
                                let oppIndHasMatch = 0 //licznik, czy drużyna o tym indeksie ma już przydzielone mecze w pozostałych kolejkach
                                let loopTimes = 0
                                for (let l = j + 1; l < numOfOpp; l++) {
                                    if (didTeamsPlayed[l].includes(opponentIndex)) {
                                        oppIndHasMatch++
                                    }
                                    loopTimes++
                                }
                                if (oppIndHasMatch !== loopTimes) {
                                    let lowerOppIndHasMatch = 0 //licznik, czy drużyna o indeks niżej ma już przydzielone mecze w pozostałych kolejkach
                                    let secondLoopTimes = 0
                                    for (let l = j + 1; l < numOfOpp; l++) {
                                        if (didTeamsPlayed[l].includes(opponentIndex - 1)) {
                                            lowerOppIndHasMatch++
                                        }
                                        secondLoopTimes++
                                    }
                                    if (lowerOppIndHasMatch === loopTimes) {
                                        opponentIndex--
                                        if (opponentIndex === -1) {
                                            opponentIndex = numOfOpp
                                        }
                                    }
                                } else {
                                    break
                                }
                            }
                            break
                        }
                    }

                    didTeamsPlayed[j].push(i)
                    didTeamsPlayed[j].push(opponentIndex)
                    teamsInfo[i].hadMatchWith.push(opponentIndex)
                    teamsInfo[opponentIndex].hadMatchWith.push(i)

                    let matchPlace = Math.floor(Math.random() * teams.length / 2)
                    while (matches[j][matchPlace] !== null) {
                        matchPlace = Math.floor(Math.random() * teams.length / 2)
                    }
                    let match = {
                        host: teams[i],
                        guest: teams[opponentIndex]
                    }
                    if (j % 2 === 0) {
                        match = {
                            host: teams[i],
                            guest: teams[opponentIndex]
                        }
                    } else {
                        match = {
                            host: teams[opponentIndex],
                            guest: teams[i]
                        }
                    }
                    matches[j][matchPlace] = match
                }
            }
        }

        for (let r = 0; r < rounds; r++) {
            addMatches(r)
        }

        return totalMatches
    }
}