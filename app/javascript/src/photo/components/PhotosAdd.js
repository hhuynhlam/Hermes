import React from 'react'
import PropTypes from 'prop-types'
import { omit, map, noop, reduce, size } from 'lodash/fp'
import Image from 'material-ui-image'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import md5 from 'blueimp-md5'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { MdHighlightOff } from 'react-icons/md'
import styled from 'styled-components'
import ButtonWithTooltip from '../../common/components/ButtonWithTooltip'
import Dropzone from '../../common/components/Dropzone'
import readAsDataUrl from '../services/readAsDataUrl'

const StyledButton = styled(ButtonWithTooltip)`
  background-color: rgba(62, 62, 62, 0.49) !important;
  color: #FFF !important;
  position: absolute !important;
  z-index: 1 !important;
`
const StyledDropzone = styled(Dropzone)`
  margin-bottom: 32px;
`
const StyledTextField = styled(TextField)`
  margin-bottom: 32px !important;
`

class PhotosAdd extends React.Component {
  static defaultProps = {
    onSubmit: noop,
  }
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    onSubmit: PropTypes.func,
  }

  state = {
    files: {},
    uploadProgress: null,
  }

  handleChange = name => (event) => {
    this.setState({
      files: {
        ...this.state.files,
        [name]: {
          ...this.state.files[name],
          caption: event.target.value,
        },
      },
    })
  }
  handleDrop = (files) => {
    const newFiles = reduce((previous, file) => {
      const fileId = md5(file.preview)

      // Asynchronously base64 encode file and update state on completion.
      // NOTE: Don't make this blocking call, or rendering will be blocked.
      readAsDataUrl(file, data => this.setState({
        files: {
          ...this.state.files,
          [fileId]: {
            ...this.state.files[fileId],
            data,
          },
        },
      }))

      return {
        ...previous,
        [fileId]: {
          caption: '',
          id: fileId,
          preview: file.preview,
        },
      }
    }, {})(files)

    this.setState({
      files: {
        ...this.state.files,
        ...newFiles,
      },
    })
  }
  handleRemove = name => () => {
    this.setState({
      files: omit(name)(this.state.files),
    })
  }
  handleSubmit = async (event) => {
    event.preventDefault()

    this.setState({
      uploadProgress: 100,
    })

    try {
      await this.props.onSubmit(this.state.files)

      this.setState({
        files: [],
      })
    } finally {
      this.setState({
        uploadProgress: null,
      })
    }
  }

  render() {
    const {
      history,
    } = this.props
    const {
      files,
      uploadProgress,
    } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardHeader
            subheader=""
            title="Add Photos"
          />

          <CardContent>
            <div className="row">
              <div className="col-xs-12">
                <StyledDropzone
                  accept="image/*"
                  onDrop={this.handleDrop}
                />
              </div>

              {
                map(file => (
                  <div className="col-xs-6 col-sm-3" key={file.id}>
                    <StyledButton
                      aria-label="Remove Photo"
                      onClick={this.handleRemove(file.id)}
                      title="Remove Photo"
                      icon
                    >
                      <MdHighlightOff size="28" />
                    </StyledButton>

                    <Image
                      imageStyle={{ height: 'auto', width: '100%' }}
                      src={file.preview}
                      style={{ marginBottom: 15, overflowY: 'hidden' }}
                    />

                    <StyledTextField
                      label="Caption"
                      onChange={this.handleChange(file.id)}
                      name="caption"
                      fullWidth
                      value={file.caption}
                    />
                  </div>
                ))(files)
              }
            </div>
          </CardContent>

          <CardActions>
            <Button
              onClick={() => history.push('/photos')}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={!!uploadProgress || !size(files)}
              type="submit"
              variant="contained"
            >
              Upload
            </Button>
          </CardActions>

          {
            uploadProgress && <LinearProgress />
          }
        </Card>
      </form>
    )
  }
}

export default compose(
  withRouter,
)(PhotosAdd)
