import {
  useEffect,
  useState
} from 'react'
import { motion } from 'framer-motion';
import {
  Box,
  Flex,
  Button
} from '@chakra-ui/react'
import {
  useHistory,
  useLocation
} from 'react-router-dom';

import { COLORS } from '../Utils/Colors'

const MotionFlex = motion(Flex)

export const Layout = ({ children }) => {
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      
    }
  }, [location.pathname])

  return (
    <>
      <Flex direction="column" align="center">
        <MotionFlex
          initial={{
            marginTop: location.pathname === '/' ? '5svh' : '45svh'
          }}
          animate={{
            marginTop: location.pathname === '/' ? '45svh' : '5svh'
          }}
          transition={{
            type: 'tween',
            duration: 0.5
          }}
          align="center"
          justify="center"
        >
          <Box display="flex">
            <Button
              textColor={COLORS.white}
              bg={location.pathname === '/' ? COLORS.lightGreen : 'transparent'}
              border={`solid 2px ${COLORS.lightGreen}`}
              padding="0 30px"
              minWidth="155px"
              mr="25px"
              _hover={{
                background: COLORS.lightGreen
              }}
              onClick={() => history.push('/')}
              disabled={location.pathname === '/'}
            >
              Home
            </Button>

            <Button
              textColor={COLORS.white}
              bg={location.pathname === '/form' ? COLORS.lightGreen : 'transparent'}
              border={`solid 2px ${COLORS.lightGreen}`}
              padding="0 30px"
              minWidth="155px"
              mr="25px"
              _hover={{
                background: COLORS.lightGreen
              }}
              onClick={() => history.push('/form')}
              disabled={location.pathname === '/form'}
            >
              Create
            </Button>

            <Button
              textColor={COLORS.white}
              bg={location.pathname === '/list' ? COLORS.lightGreen : 'transparent'}
              border={`solid 2px ${COLORS.lightGreen}`}
              padding="0 30px"
              minWidth="155px"
              _hover={{
                background: COLORS.lightGreen
              }}
              onClick={() => history.push('/list')}
              disabled={location.pathname === '/list'}
            >
              List
            </Button>
          </Box>
        </MotionFlex>

        <Box
          width="40%"
        >
          { children }
        </Box>
      </Flex>
    </>
  )
}