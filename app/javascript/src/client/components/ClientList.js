import React from 'react'
import { map } from 'lodash/fp'
import DataTable from 'mui-datatables'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import styled from 'styled-components'

const Wrapper = styled.div`
  table:focus, tbody:focus {
    outline: none;
  }
  tbody > tr {
    cursor: pointer;
  }
`

class ClientList extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  data = [
    { id: 1, name: 'Joe James' },
    { id: 2, name: 'John Walsh' },
    { id: 3, name: 'Bob Herm' },
  ]

  handleCellClick = (columnIndex, rowIndex) => {
    const { history } = this.props
    const clientId = this.data[rowIndex].id

    return history.push(`/clients/${clientId}/dashboard`)
  }

  render() {
    const columns = ['Name']
    const options = {
      filter: false,
      onCellClick: this.handleCellClick,
      selectableRows: false,
      viewColumns: false,
    }
    const clients = map(datum => [datum.name])(this.data)

    return (
      <Wrapper>
        <DataTable
          data={clients}
          columns={columns}
          options={options}
          title="Clients"
        />
      </Wrapper>
    )
  }
}

export default withRouter(ClientList)
