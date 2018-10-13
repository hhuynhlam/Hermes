import React from 'react'
import PropTypes from 'prop-types'
import { at, flow, join, map } from 'lodash/fp'
import DataTable from 'mui-datatables'
import { FaPaperPlane } from 'react-icons/fa'
import styled from 'styled-components'
import AnchorLink from '../../common/components/AnchorLink'
import ButtonWithTooltip from '../../common/components/ButtonWithTooltip'

const StyledButton = styled(ButtonWithTooltip)`
  align-self: center;
  margin-right: 26px !important;
`
const Wrapper = styled.div`
  table:focus, tbody:focus {
    outline: none;
  }
  tbody > tr {
    cursor: pointer;
  }
`

function ToolbarSelect(props) {
  const {
    data,
    selected,
  } = props

  const emails = flow([
    at(selected),
    map('email'),
    join(';'),
  ])(data)

  return (
    <AnchorLink href={`mailto:${emails}`}>
      <StyledButton
        aria-label="Send Email"
        title="Send Email"
        icon
      >
        <FaPaperPlane size="1em" />
      </StyledButton>
    </AnchorLink>
  )
}
ToolbarSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
  })).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number).isRequired,
}

class ContactList extends React.Component {
  static defaultProps = {
    data: [],
  }
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
    })),
  }

  state = {
    rowsSelected: [],
  }

  columns = [
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Address',
  ]
  columnMapping = datum => [
    datum.firstName,
    datum.lastName,
    datum.email,
    datum.phone,
    datum.address,
  ]

  handleRowsSelect = (selectedRows, allSelectedRows) => {
    this.setState({ rowsSelected: map('index')(allSelectedRows) })
  }

  render() {
    const { data } = this.props
    const { rowsSelected } = this.state

    const options = {
      customToolbarSelect: () =>
        <ToolbarSelect data={data} selected={rowsSelected} />,
      download: false,
      filter: false,
      onRowsSelect: this.handleRowsSelect,
      pagination: false,
      print: false,
      rowsSelected,
    }

    return (
      <Wrapper>
        <DataTable
          columns={this.columns}
          data={map(this.columnMapping)(data)}
          options={options}
          title="Contact List"
        />
      </Wrapper>
    )
  }
}

export default ContactList
