import axios from 'axios';

export const getAllRolesRequest = ({setOptions}) => {
  axios.get(process.env.REACT_APP_API_URL + '/get-all-roles')
    .then((res) => {
    const roles = res.data

    let tempOptions = []
    if (roles.length) {
        roles.forEach((role) => {
        tempOptions.push({
            value: role.id,
            label: role.name
          })
        })

        setOptions(tempOptions)
    }
    })
    .catch((err) => {
      console.error(err)
    })
}

export const createUserRequest = ({
  fullName,
  email,
  roles,
  setErrors,
  history
}) => {
  axios.post(process.env.REACT_APP_API_URL + '/create-user', {
    full_name: fullName,
    email,
    roles: roles.map((role) => role.value)
  })
  .then((res) => {
    history.push('/list')
  })
  .catch((err) => {
    const errs = Object.keys(err.response.data.errors)

    if (errs.length) {
      const newErrors = {}

      errs.forEach((key) => {
        const messages = err.response.data.errors[key]

        messages.forEach((msg) => {
          newErrors[key] = msg
        })
      })

      setErrors(newErrors)
    }
  })
}

export const getAllUsersRequest = ({
  formatTitle,
  setColumns,
  setUsers,
  setOrigUsers
}) => {
  axios.get(process.env.REACT_APP_API_URL + '/get-all-users')
    .then((res) => {
      const users = res.data

      if (Array.isArray(users) && users.length) {
        setOrigUsers(users)

        let tempColumns = []
        let tempUsers = []

        users.forEach((user) => {
          tempUsers.push({
            id: user.id,
            full_name: user.full_name,
            roles: user.roles.join(', ')
          })
        })
        Object.keys(users[0]).forEach((key) => {
          tempColumns.push({
            dataField: key,
            text: formatTitle(key),
            sort: true
          })
        })

        setColumns(tempColumns)
        setUsers(tempUsers)
      }
    })
    .catch((err) => {
      console.error('Failed to fetch users:', err)
    })
}