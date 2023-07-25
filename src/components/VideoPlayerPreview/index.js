import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import VideoPlayer from '../VideoPlayer';
import PressableWithoutFeedback from '../Pressable/PressableWithoutFeedback';
import Icon from '../Icon';
import styles from '../../styles/styles';
import * as Expensicons from '../Icon/Expensicons';
import VideoPlayerThumbnail from './VideoPlayerThumbnail';

const propTypes = {
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
};

const defaultProps = {};

function VideoPlayerPreview(props) {
    const [isThumbnail, setIsThumbnail] = useState(true);
    const [aspectRatio, setAspectRatio] = useState(1.5);
    const videoRef = useRef(null);

    const handleOnPress = () => {
        setIsThumbnail(false);
    };

    const onVideoLoaded = (e) => {
        setAspectRatio(e.srcElement.videoWidth / e.srcElement.videoHeight);
    };

    return isThumbnail ? (
        <VideoPlayerThumbnail
            onPress={handleOnPress}
            accessibilityLabel={props.fileName}
        />
    ) : (
        <View style={{width: 350, aspectRatio, overflow: 'hidden', ...styles.webViewStyles.tagStyles.img}}>
            <VideoPlayer
                ref={videoRef}
                url={props.url}
                videoPlayerStyles={{borderRadius: 10}}
                shouldPlay={false}
                onVideoLoaded={onVideoLoaded}
            />
            <PressableWithoutFeedback
                accessibilityLabel={props.fileName}
                accessibilityRole="button"
                onPress={props.showModal}
                style={{position: 'absolute', top: 10, right: 10}}
            >
                <Icon src={Expensicons.Expand} />
            </PressableWithoutFeedback>
        </View>
    );
}

VideoPlayerPreview.propTypes = propTypes;
VideoPlayerPreview.defaultProps = defaultProps;
VideoPlayerPreview.displayName = 'AttachmentView';

export default VideoPlayerPreview;
