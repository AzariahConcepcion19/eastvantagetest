import {
  useEffect,
  useState
} from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'
import {
  useHistory
} from 'react-router-dom';
import Select from 'react-select'

import { COLORS } from '../Utils/Colors'
import {
  createUserRequest,
  getAllRolesRequest
} from '../Utils/Axios'
import { motion } from 'framer-motion';

const MotionBox = motion(Box)

export const Form = () => {
  const history = useHistory()
  const [options, setOptions] = useState([])
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState([])
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    roles: ''
  })

  const validateFields = () => {
    const newErrors = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!roles.length) {
      newErrors.roles = 'Please select at least one role'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const customBorderColor = (isFocused) => {
    if (isFocused) {
      return COLORS.lightGreen + ' !important'
    }

    if (!!errors.roles) {
      return COLORS.errorRed + ' !important'
    }

    return COLORS.white + ' !important'
  }

  const createUser = () => {
    if (!validateFields()) {
      return
    }

    createUserRequest({
      fullName,
      email,
      roles,
      setErrors,
      history
    })
  }

  useEffect(() => {
    getAllRolesRequest({
      setOptions
    })
  }, [])

  return (
    <MotionBox
      initial={{
        y: 200
      }}
      animate={{
        y: 0
      }}
      transition={{
        type: 'tween',
        duration: 0.5
      }}
    >
      <FormControl
        mt="5svh"
        isRequired
        isInvalid={!!errors.fullName}
      >
        <FormLabel
          textColor={COLORS.white}
        >
          Full Name
        </FormLabel>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          type='text'
          textColor={COLORS.white}
          placeholder='Ex: Tester'
          _focus={{
            borderColor: COLORS.lightGreen
          }}
          _hover={{
            borderColor: COLORS.darkGreen
          }}
        />
        <FormErrorMessage>{errors.fullName}</FormErrorMessage>
      </FormControl>
        
      <FormControl
        mt="2svh"
        isRequired
        isInvalid={!!errors.email}
      >
        <FormLabel
          textColor={COLORS.white}
        >
          Email address
        </FormLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          textColor={COLORS.white}
          placeholder='Ex: Tester@testing.com'
          _focus={{
            borderColor: COLORS.lightGreen
          }}
          _hover={{
            borderColor: COLORS.darkGreen
          }}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl
        marginTop="2svh"
        isRequired
        isInvalid={!!errors.roles}
      >
        <FormLabel
          textColor={COLORS.white}
        >
          Roles
        </FormLabel>

        <Select
          value={roles}
          onChange={(chosen) => setRoles(chosen)}
          options={options}
          isMulti
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: 'transparent',
              color: COLORS.white,
              borderColor: customBorderColor(state.isFocused),
              border: '1px solid',
              borderRadius: '0.375rem',
              boxShadow: 'none',
              outline: 'none',
              transition: '0.3s',
              '&:hover': {
                borderColor: COLORS.darkGreen + ' !important',
                cursor: 'pointer'
              },
              '&:focus': {
                borderColor: COLORS.darkGreen,
                cursor: 'pointer'
              }
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: COLORS.lightGreen
            }),
            input: (base) => ({
              ...base,
              color: COLORS.white
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? COLORS.lightGreen : '#4A5568',
              color: COLORS.white,
              '&:hover': {
                borderColor: COLORS.darkGreen,
                cursor: 'pointer'
              }
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: COLORS.white
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: COLORS.lightGreen
            })
          }}
        />
        <FormErrorMessage>{errors.roles}</FormErrorMessage>
      </FormControl>

      <Button
        onClick={() => createUser()}
        textColor={COLORS.white}
        bg="transparent"
        border={`solid 2px ${COLORS.lightGreen}`}
        mt="2svh"
        minWidth="55px"
        float="right"
        _hover={{
          background: COLORS.lightGreen
        }}
      >
        Submit
      </Button>
    </MotionBox>
  )
}