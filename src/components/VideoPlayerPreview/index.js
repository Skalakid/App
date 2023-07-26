import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import VideoPlayer from '../VideoPlayer';
import PressableWithoutFeedback from '../Pressable/PressableWithoutFeedback';
import Icon from '../Icon';
import styles from '../../styles/styles';
import * as Expensicons from '../Icon/Expensicons';
import VideoPlayerThumbnail from './VideoPlayerThumbnail';
import {PlaybackContext} from '../withPlayback';

const propTypes = {
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
};

const defaultProps = {};

let sharedComponent = {
    sharedElement: {current: null},
    originalParent: {current: null},
};

function VideoPlayerPreview(props) {
    const {currentlyPlayingURL, updateCurrentlyPlayingURL} = React.useContext(PlaybackContext);
    const [aspectRatio, setAspectRatio] = useState(1.5);
    const videoRef = useRef(null);

    const handleOnPress = () => {
        updateCurrentlyPlayingURL(props.url);
    };

    const onVideoLoaded = (e) => {
        setAspectRatio(e.srcElement.videoWidth / e.srcElement.videoHeight);
    };

    return currentlyPlayingURL !== props.url ? (
        <VideoPlayerThumbnail
            onPress={handleOnPress}
            accessibilityLabel={props.fileName}
        />
    ) : (
        <View style={{width: 350, aspectRatio, overflow: 'hidden', ...styles.webViewStyles.tagStyles.img}}>
            <View
                ref={(el) => {
                    if (!el) return;
                    sharedComponent.originalParent.current = el;
                    if (el.childNodes[0]) sharedComponent.sharedElement.current = el.childNodes[0];
                }}
                style={{flex: 1}}
            >
                <VideoPlayer
                    ref={videoRef}
                    url={props.url}
                    videoPlayerStyles={{borderRadius: 10}}
                    shouldPlay={currentlyPlayingURL === props.url}
                    onVideoLoaded={onVideoLoaded}
                />
            </View>
            <PressableWithoutFeedback
                accessibilityLabel={props.fileName}
                accessibilityRole="button"
                onPress={() => props.showModal(sharedComponent)}
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
