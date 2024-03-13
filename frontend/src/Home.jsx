import Header from './Header'
import { Flex } from '@chakra-ui/react'

function Home() {
  return (
    <Flex direction="column" align="center" justify="center" minH="100vh">
      <Header/>
    </Flex>
  )
}

export default Home;