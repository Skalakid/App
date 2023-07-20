import React from 'react';
import PropTypes from 'prop-types';
import ThumbnailImage from '../ThumbnailImage';
import styles from '../../styles/styles';
import PressableWithoutFeedback from '../Pressable/PressableWithoutFeedback';
import CONST from '../../CONST';

const propTypes = {
    onPress: PropTypes.func.isRequired,
    accessibilityLabel: PropTypes.string.isRequired,
};

const defaultProps = {};

const placeholderThumbnailImage = 'https://d33v4339jhl8k0.cloudfront.net/docs/assets/591c8a010428634b4a33375c/images/5ab4866b2c7d3a56d8873f4c/file-MrylO8jADD.png';
const videoContainerWidth = 400;

function VideoPlayerThumbnail(props) {
    return (
        <PressableWithoutFeedback
            accessibilityLabel={props.accessibilityLabel}
            accessibilityRole={CONST.ACCESSIBILITY_ROLE.BUTTON}
            onPress={props.onPress}
        >
            <ThumbnailImage
                previewSourceURL={placeholderThumbnailImage}
                style={styles.webViewStyles.tagStyles.img}
                isAuthTokenRequired
                imageWidth={videoContainerWidth}
            />
        </PressableWithoutFeedback>
    );
}

VideoPlayerThumbnail.propTypes = propTypes;
VideoPlayerThumbnail.defaultProps = defaultProps;
VideoPlayerThumbnail.displayName = 'AttachmentView';

export default VideoPlayerThumbnail;
