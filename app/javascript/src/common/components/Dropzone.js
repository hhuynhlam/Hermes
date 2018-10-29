import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash/fp'
import ReDropzone from 'react-dropzone'
import { MdCloudDownload } from 'react-icons/md'
import styled from 'styled-components'

const EmptyPreview = styled(
  ({ className }) => (
    <div className={className}>
      <MdCloudDownload size={78} />
      <span style={{ marginTop: 20 }}>Choose a file or drag it here.</span>
    </div>
  )
)`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ImagePreview = styled.div`
  background: ${({ file }) => `url(${file})`};
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
`

const StyledDropzone = styled(ReDropzone)`
  background-color: rgba(150, 150, 150, 0.34);
  border: 1px dashed black;
  color: #484848;
  cursor: pointer;
  font-size: 1.35rem;
  height: 320px;
  width: 100%;
`

class Dropzone extends React.Component {
  static defaultProps = {
    onDrop: noop,
    preview: false,
  }
  static propTypes = {
    onDrop: PropTypes.func,
    preview: PropTypes.bool,
  }

  state = {
    file: null,
  }

  handleDrop = (files) => {
    const {
      onDrop,
      preview,
    } = this.props

    if (preview) {
      window.URL.revokeObjectURL(this.state.file)

      this.setState({
        file: window.URL.createObjectURL(files[0]),
      })
    }

    onDrop(files)
  }

  render() {
    const {
      preview,
      ...restOfProps
    } = this.props
    const {
      file,
    } = this.state

    return (
      <StyledDropzone
        file={file}
        onDrop={this.handleDrop}
        {...restOfProps}
      >
        {
          preview && file ?
            <ImagePreview file={file} /> :
            <EmptyPreview />
        }
      </StyledDropzone>
    )
  }
}

export default Dropzone
