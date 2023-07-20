import React from 'react';
import PropTypes from 'prop-types';
import {withLocalizePropTypes} from '../withLocalize';
import VideoPlayerThumbnail from './VideoPlayerThumbnail';

const propTypes = {
    showModal: PropTypes.func.isRequired,
    fileName: PropTypes.string.isRequired,
    ...withLocalizePropTypes,
};

const defaultProps = {};

function VideoPlayerPreview(props) {
    return (
        <VideoPlayerThumbnail
            onPress={props.showModal}
            accessibilityLabel={props.fileName}
        />
    );
}

VideoPlayerPreview.propTypes = propTypes;
VideoPlayerPreview.defaultProps = defaultProps;
VideoPlayerPreview.displayName = 'AttachmentView';

export default VideoPlayerPreview;
