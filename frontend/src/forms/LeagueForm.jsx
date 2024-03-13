import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import {
    Flex, Heading, FormControl, FormLabel, Input, Button, InputGroup, InputRightElement, Table, Thead, Tbody, Tr, Th, Td, Box, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Image
} from '@chakra-ui/react'
import { LuShield } from "react-icons/lu"
import { TiDelete } from "react-icons/ti"
import Header from "../Header"

const LeagueForm = () => {

    const navigate = useNavigate()

    const [leagueName, updateLeagueName] = useState('')
    const [teamsList, updateTeamsList] = useState([])
    const [anyTeams, updateAnyTeams] = useState(false)
    const [points, updatePoints] = useState([null, null, null])
    const [rounds, updateRounds] = useState(1)

    // useEffect(() => {
    //     console.log('dupa')
    // }, [])

    const addTeam = (value) => {
        if (value !== '') {
            let filtered = null
            if (teamsList.length > 0) {
                filtered = teamsList.filter(team => team[1] === value)
            }
            if (filtered === null || filtered.length === 0) {
                let teamsArray = [...teamsList, [null, value, 0]]
                updateTeamsList(teamsArray)
                document.getElementById('add_team').value = ''
                updateAnyTeams(true)
            }
        }
    }

    const deleteTeam = (value) => {
        let teamsArray = teamsList.filter(team => team[1] !== value)
        updateTeamsList(teamsArray)
        if (teamsArray.length === 0) {
            updateAnyTeams(false)
        }
    }

    const setStrength = (value, i) => {
        let teams = [...teamsList]
        teams[i][2] = value
        updateTeamsList(teams)
    }

    const updatePointsFun = (value, label) => {
        let pointsArray = [...points]
        pointsArray[label] = value
        updatePoints(pointsArray)
    }

    const validate = () => {
        // function blockSpecialChar(e) {
        //     return /[!@#$%^&*()/\\{}[]+=|;"'<>?`~]/.test(e);
        //   }
        let listOfIssues = []
        if (leagueName === '') {
            listOfIssues.push('no league name')
        }
        if (teamsList.length < 3) {
            listOfIssues.push('not enough teams')
        }
        if (points[0] === null || points[0] === '') {
            listOfIssues.push('win points is undefined')
        }
        if (points[1] === null || points[1] === '') {
            listOfIssues.push('draw points is undefined')
        }
        if (points[2] === null || points[2] === '') {
            listOfIssues.push('loss points is undefined')
        }
        if (listOfIssues.length === 0) {
            let teamsInfo = []
            for (let i = 0; i < teamsList.length; i++) {
                teamsInfo.push([teamsList[i][0], teamsList[i][1], teamsList[i][2], 0, 0, 0, 0, 0])
            }
            localStorage.setItem("teamsInfo", JSON.stringify(teamsInfo))
            let leagueInfo = {
                leagueName: leagueName,
                points: points,
                rounds: rounds
            }
            localStorage.setItem("leagueInfo", JSON.stringify(leagueInfo))
            navigate("/leagues/manage")
        } else {

        }
    }

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh">
            <Header />
            <Flex direction='column' alignItems='center' justifyContent='center' w='35%' p='5' pos='absolute' top='120'>
                <Heading p='3'>League creator</Heading>
                <FormControl p='3'>
                    <FormLabel htmlFor='league_name'>League name (up to 60 characters)</FormLabel>
                    <Input id='league_name' max='60' placeholder='League name' onInput={(e) => updateLeagueName(e.target.value)} />
                </FormControl>
                <FormControl p='3'>
                    <FormLabel>Teams (up to 60 characters)</FormLabel>
                    {
                        anyTeams &&
                        <Box maxH='xs' overflowY='scroll'>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th textAlign='center'>Logo</Th>
                                        <Th textAlign='center' p='4'>Name</Th>
                                        <Th textAlign='center' p='4'>Strength</Th>
                                        <Th p='4'></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        teamsList.map((team, i) => (
                                            <Tr key={i}>
                                                <Td>
                                                    <Box display='flex' alignItems='center' justifyContent='center' maxW='fit-content' p='2' _hover={{ bg: 'gray.400' }}>
                                                        {
                                                            team[0] === null ? <LuShield /> : <Image src={team[0]}></Image>
                                                        }
                                                    </Box>
                                                </Td>
                                                <Td textAlign='center' p='4'>{team[1]}</Td>
                                                <Td textAlign='center' p='4'>
                                                    <Slider value={team[2]} onChange={(val) => setStrength(val, i)}>
                                                        <SliderMark value={0}>
                                                            0
                                                        </SliderMark>
                                                        <SliderMark value={50}>
                                                            50
                                                        </SliderMark>
                                                        <SliderMark value={100}>
                                                            100
                                                        </SliderMark>
                                                        <SliderMark
                                                            value={team[2]}
                                                            textAlign='center'
                                                            bg='blue.500'
                                                            color='white'
                                                            mt='-10'
                                                            ml='-5'
                                                            w='12'
                                                        >
                                                            {team[2]}
                                                        </SliderMark>
                                                        <SliderTrack>
                                                            <SliderFilledTrack />
                                                        </SliderTrack>
                                                        <SliderThumb />
                                                    </Slider>
                                                </Td>
                                                <Td p='4' textAlign='right'>
                                                    <Button onClick={(e) => deleteTeam(team[1])} ><TiDelete /></Button>
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </Box>
                    }
                    <InputGroup mt='2'>
                        <Input id='add_team' max='60' placeholder='Add team' />
                        <InputRightElement>
                            <Button fontWeight='bold' onClick={() => addTeam(document.getElementById('add_team').value)}>
                                +
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl p='3'>
                    <FormLabel>Points</FormLabel>
                    <InputGroup>
                        <Flex direction='row'>
                            <Flex direction='column' m='2'>
                                <FormLabel>Win</FormLabel>
                                <Input type='number' onChange={(e) => updatePointsFun(e.target.value, 0)}></Input>
                            </Flex>
                            <Flex direction='column' m='2'>
                                <FormLabel>Draw</FormLabel>
                                <Input type='number' onChange={(e) => updatePointsFun(e.target.value, 1)}></Input>
                            </Flex>
                            <Flex direction='column' m='2'>
                                <FormLabel>Loss</FormLabel>
                                <Input type='number' onChange={(e) => updatePointsFun(e.target.value, 2)}></Input>
                            </Flex>
                        </Flex>
                    </InputGroup>
                </FormControl>
                <FormControl p='3'>
                    <FormLabel>Rounds</FormLabel>
                    <Slider value={rounds} max='3' onChange={(val) => updateRounds(val)}>
                        <SliderMark value={0}>
                            1
                        </SliderMark>
                        <SliderMark value={1}>
                            2
                        </SliderMark>
                        <SliderMark value={2}>
                            3
                        </SliderMark>
                        <SliderMark value={3}>
                            4
                        </SliderMark>
                        <SliderMark
                            value={rounds}
                            textAlign='center'
                            bg='blue.500'
                            color='white'
                            mt='-10'
                            ml='-5'
                            w='12'
                        >
                            {rounds + 1}
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </FormControl>
                <Button onClick={validate}>
                    Create
                </Button>
            </Flex>
        </Flex>
    )
}

export default LeagueForm