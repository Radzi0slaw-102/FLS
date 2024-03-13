import { useState, useEffect } from 'react'
import { Flex, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
import Header from "./Header"

const ManLeagues = () => {

    const [sortedTeamsData, setSortedTeamsData] = useState([])

    const year = 2023

    const leagueData = {
        leagueName: "ProLeague",
    }

    const teamsData = [
        //[name,wins,draws,losses,G+,G-,points]
        ["Raków Częstochowa", 9, 5, 4, 35, 22],
        ["Legia Warszawa", 9, 5, 5, 29, 23],
        ["Lech Poznań", 9, 6, 4, 32, 25],
        ["Pogoń Szczecin", 9, 3, 7, 34, 23],
        ["Piast Gliwice", 4, 14, 2, 18, 14],
        ["Górnik Zabrze", 7, 5, 7, 22, 21]
    ]

    useEffect(() => {
        for (let i = 0; i < teamsData.length; i++) {
            teamsData[i].push(teamsData[i][4] - teamsData[i][5])
            teamsData[i].push(3 * teamsData[i][1] + teamsData[i][2])
        }
        let indexesSort = [0]

        for (let i = 1; i < teamsData.length; i++) {
            indexesSort.unshift(i)
            for (let j = 1; j < indexesSort.length; j++) {
                if (teamsData[i][7] < teamsData[indexesSort[j]][7]) {
                    indexesSort[j - 1] = indexesSort[j]
                    indexesSort[j] = i
                } else if (teamsData[i][7] === teamsData[j][7]) {
                    if (teamsData[i][6] < teamsData[indexesSort[j]][6]) {
                        indexesSort[j - 1] = indexesSort[j]
                        indexesSort[j] = i
                    } else if (teamsData[i][6] === teamsData[j][6]) {
                        if (teamsData[i][4] < teamsData[indexesSort[j]][4]) {
                            indexesSort[j - 1] = indexesSort[j]
                            indexesSort[j] = i
                        } else {
                            j = indexesSort.length
                        }
                    } else {
                        j = indexesSort.length
                    }
                } else {
                    j = indexesSort.length
                }
            }
        }
        let sorted = []
        for (let i = 0; i < indexesSort.length; i++) {
            sorted.push(teamsData[indexesSort[i]])
        }
        setSortedTeamsData(sorted)
    }, [])

    return (
        <Flex direction="column" align="center" minH="100vh" minW='100vw' m='0' p='0'>
            <Header />
            <TableContainer pos='absolute' top='150px'>
                <Table variant='simple' size='lg'>
                    <TableCaption style={{ "captionSide": "top" }}>{leagueData.leagueName} {year}/{year + 1}</TableCaption>
                    <Thead>
                        <Tr borderTop='2px' borderBottom='2px'>
                            <Th borderLeft='2px'></Th>
                            <Th borderLeft='2px'>Team name</Th>
                            <Th borderLeft='2px'>Matches</Th>
                            <Th borderLeft='2px'>Wins</Th>
                            <Th borderLeft='2px'>Draws</Th>
                            <Th borderLeft='2px'>Losses</Th>
                            <Th borderLeft='2px'>G+</Th>
                            <Th borderLeft='2px'>G-</Th>
                            <Th borderLeft='2px'>GD</Th>
                            <Th borderLeft='2px' borderRight='2px'>Points</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            sortedTeamsData.map((team, i) => (
                                <Tr borderBottom='2px' key={i}>
                                    <Td borderLeft='2px'>{i + 1}.</Td>
                                    <Td borderLeft='2px'>{team[0]}</Td>
                                    <Td textAlign='center' borderLeft='2px'>{team[1] + team[2] + team[3]}</Td>
                                    <Td textAlign='center' borderLeft='2px'>{team[1]}</Td>
                                    <Td textAlign='center' borderLeft='2px'>{team[2]}</Td>
                                    <Td textAlign='center' borderLeft='2px'>{team[3]}</Td>
                                    <Td textAlign='center' borderLeft='2px'>{team[4]}</Td>
                                    <Td textAlign='center' borderLeft='2px'>{team[5]}</Td>
                                    <Td textAlign='center' borderLeft='2px'>{team[6]}</Td>
                                    <Td textAlign='center' borderLeft='2px' borderRight='2px' fontWeight='bold'>{team[7]}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td>

                            </Td>
                            <Td>
                                Legenda
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Flex>
    )
}

export default ManLeagues