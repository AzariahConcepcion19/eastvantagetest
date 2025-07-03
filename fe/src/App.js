import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  Route,
  Switch
} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Form } from './Components/Form'
import { Layout } from './Components/Layout'
import { List } from './Components/List'

export const App = () => {
  return (
    <ChakraProvider>
      <Layout>
        <Switch>
          <Route
            path="/form"
            component={Form}
          />
          <Route
            path="/list"
            component={List}
          />
        </Switch>
      </Layout>
    </ChakraProvider>
  )
}

export default App;
