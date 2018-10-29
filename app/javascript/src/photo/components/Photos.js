import React from 'react'
import PropTypes from 'prop-types'
import { upperFirst } from 'lodash/fp'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Image from 'material-ui-image'
import Lightbox from 'react-images'
import styled from 'styled-components'
import findGridColumns from '../services/findGridColumns'

const StyledImage = styled(Image)`
  height: auto !important;
`

class Photos extends React.Component {
  static propTypes = {
    photos: PropTypes.arrayOf(PropTypes.shape({
      caption: PropTypes.string,
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }

  state = {
    columns: findGridColumns(),
    hasMore: true,
    isFetching: false,
    lightboxOpen: false,
    lightBoxCurrentImage: 0,
    page: 1,
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateColumns)
    window.addEventListener('scroll', this.handleOnScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateColumns)
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  /**
   * Responsive
   */
  updateColumns = () =>
    this.setState({ columns: findGridColumns() })

  /**
   * Infinite Scroll
   */
  handleFetchPhotos = async () => {
    const {
      fetchPhotos,
    } = this.props
    const {
      hasMore,
      isFetching,
      page,
    } = this.state

    if (hasMore && !isFetching) {
      this.setState({ isFetching: true })

      const { data } = await fetchPhotos(page)

      if (data && data.length) {
        this.setState({ page: page + 1 })
      } else {
        this.setState({ hasMore: false })
      }

      this.setState({ isFetching: false })
    }
  }

  handleOnScroll = () => {
    const viewportHeight = window.innerHeight
    const offset = window.pageYOffset

    if (offset + 250 >= viewportHeight) {
      this.handleFetchPhotos()
    }
  }

  /**
   * Lightbox
   */
  handleImageClick = index => () =>
    this.setState({ lightboxOpen: true, lightBoxCurrentImage: index })

  handleLightboxClickPrev = () =>
    this.setState({ lightBoxCurrentImage: this.state.lightBoxCurrentImage - 1 })

  handleLightboxClickNext = () =>
    this.setState({ lightBoxCurrentImage: this.state.lightBoxCurrentImage + 1 })

  handleLightboxClose = () =>
    this.setState({ lightboxOpen: false })

  handleLightboxOpen = () =>
    this.setState({ lightboxOpen: true })

  render() {
    const {
      photos,
    } = this.props
    const {
      columns,
      lightBoxCurrentImage,
      lightboxOpen,
    } = this.state

    return (
      <React.Fragment>
        <GridList cols={columns}>
          {photos.map((photo, index) => (
            <GridListTile key={photo.id} cols={1}>
              <StyledImage
                onClick={this.handleImageClick(index)}
                src={photo.url}
                alt={photo.caption}
              />
              {
                (photo.caption || photo.user) &&
                  <GridListTileBar
                    title={photo.caption}
                    subtitle={
                      <span>
                        by: {`${upperFirst(photo.user.firstName)}
                        ${upperFirst(photo.user.lastName)}`}
                      </span>
                    }
                  />
              }
            </GridListTile>
          ))}
        </GridList>

        <Lightbox
          backdropClosesModal
          currentImage={lightBoxCurrentImage}
          images={photos.map(photo => ({
            ...photo,
            src: photo.url,
          }))}
          isOpen={lightboxOpen}
          onClickPrev={this.handleLightboxClickPrev}
          onClickNext={this.handleLightboxClickNext}
          onClose={this.handleLightboxClose}
        />
      </React.Fragment>
    )
  }
}

export default Photos
