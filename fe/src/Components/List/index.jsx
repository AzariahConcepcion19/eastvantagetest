import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Text,
  Select
} from '@chakra-ui/react'

import {
  getAllRolesRequest,
  getAllUsersRequest
} from '../Utils/Axios'
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'bootstrap/dist/css/bootstrap.min.css'
import { COLORS } from '../Utils/Colors';


const MotionBox = motion(Box)

export const List = () => {
  const history = useHistory()
  const [columns, setColumns] = useState([])
  const [origUsers, setOrigUsers] = useState([])
  const [users, setUsers] = useState([])
  const [options, setOptions] = useState([])

  const formatTitle = (key) => {
    if (key === 'id') {
      return 'Id'
    }

    if (key === 'full_name') {
      return 'Full Name'
    }

    if (key === 'roles') {
      return 'Roles'
    }
  }

  const filterByRoles = (e) => {
    let tempUsers = []
    const filter = e.target.value

    origUsers.forEach((user) => {
      if (user.roles.includes(filter) || filter === 'all') {
        tempUsers.push({
          id: user.id,
          full_name: user.full_name,
          roles: user.roles.join(', ')
        })
      }
    })

    setUsers(tempUsers)
  }

  useEffect(() => {
    getAllUsersRequest({
      formatTitle,
      setColumns,
      setUsers,
      setOrigUsers
    })

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
      <Select
        textColor={COLORS.white}
        onChange={(e) => filterByRoles(e)}
        mt="5svh"
        width="60%"
        ml="auto"
        mr="auto"
        cursor="pointer"
        _focus={{
          borderColor: COLORS.lightGreen
        }}
        _hover={{
          borderColor: COLORS.darkGreen
        }}
      >
        <option value='all' selected>All Roles</option>
        {
          options.length
          ? (
            options.map((opt) => (
              <option key={opt.value} value={opt.label}>
                {opt.label}
              </option>
            ))
          ) : ''
        }
      </Select>
      <Box padding="4">
        {
          users.length && columns.length
          ? (
            <BootstrapTable
              keyField="id"
              data={users}
              columns={columns}
              pagination={paginationFactory({
                sizePerPage: 5,
                showTotal: true,
                hideSizePerPage: true,
                paginationTotalRenderer: (from, to, size) => (
                  <Text
                    as="span"
                    color="white"
                    ml="10px"
                  >
                    Showing rows {from} to {to} of {size}
                  </Text>
                )
              })}
              striped
              hover
              condensed
            />
          ) : (
            <Flex padding="4" justify="center">
              <Button
                textColor={COLORS.white}
                bg="transparent"
                border={`solid 2px ${COLORS.lightGreen}`}
                padding="0 30px"
                minWidth="155px"
                mr="auto"
                ml="auto"
                _hover={{
                  background: COLORS.lightGreen
                }}
                onClick={() => history.push('/form')}
              >
                No data. Create a user instead
              </Button>
            </Flex>
          )
        }
      </Box>
    </MotionBox>
  )
}
