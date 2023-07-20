import React, {memo} from 'react';
import PropTypes from 'prop-types';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';
import compose from '../../libs/compose';
import ThumbnailImage from '../ThumbnailImage';
import styles from '../../styles/styles';

const propTypes = {
    url: PropTypes.string.isRequired,
    ...withLocalizePropTypes,
};

const defaultProps = {};

const placeholderThumbnailImage = 'https://d33v4339jhl8k0.cloudfront.net/docs/assets/591c8a010428634b4a33375c/images/5ab4866b2c7d3a56d8873f4c/file-MrylO8jADD.png';
const videoContainerWidth = 400;

function VideoPlayerPreview() {
    return (
        <ThumbnailImage
            previewSourceURL={placeholderThumbnailImage}
            style={styles.webViewStyles.tagStyles.img}
            isAuthTokenRequired
            imageWidth={videoContainerWidth}
        />
    );
}

VideoPlayerPreview.propTypes = propTypes;
VideoPlayerPreview.defaultProps = defaultProps;
VideoPlayerPreview.displayName = 'AttachmentView';

export default compose(memo, withLocalize)(VideoPlayerPreview);
