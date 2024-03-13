import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { Flex, Heading, Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {

    const navigate = useNavigate()

    return (
        <Flex direction="column" align="center" justify="center" bg="blue.500" p={4} w="100vw" m="0" pos="fixed" top="0" zIndex='1'>
            <Heading as="h1" mb={4} color="white">
                Football League Simulator
            </Heading>

            <Flex>
                <MenuCustomItem dest='/home'>Home</MenuCustomItem>
                <Menu mx={2}>
                    <MenuButton as={Button} bg="blue.500" color="white" transition='.2s' fontWeight="bold" borderRadius='20' p='2' textDecoration="none" _hover={{ textDecoration: 'none', bg: 'blue.700', cursor: 'pointer' }} _expanded={{ bg: 'blue.700' }}>
                        Leagues
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={(e) => navigate('/leagues/form')}>Create new league</MenuItem>
                        <MenuItem onClick={(e) => navigate('/leagues/manage')}>Load league</MenuItem>
                    </MenuList>
                </Menu>
                <MenuCustomItem dest='/home'>Account</MenuCustomItem>
                <MenuCustomItem dest='/home'>Contact</MenuCustomItem>
            </Flex>
            <Box mt={4} pos="fixed" right='30px'>
                <Menu>
                    <MenuButton as={Button} rightIcon={<IoIosArrowDown />}>
                        Languages
                    </MenuButton>
                    <MenuList>
                        <MenuItem>English</MenuItem>
                        <MenuItem>Polski</MenuItem>
                        <MenuItem>Deutsch</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    )
}

const MenuCustomItem = ({ dest, children }) => {

    const navigate = useNavigate()

    return (
        <Box onClick={(e) => navigate(dest)} mx={2} color="white" transition='.2s' fontWeight="bold" borderRadius='20' p='2' textDecoration="none" _hover={{ textDecoration: 'none', background: 'blue.700', cursor: 'pointer' }}>
            {children}
        </Box>
    )
}

export default Header;