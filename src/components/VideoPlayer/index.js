import React, {forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Video, ResizeMode} from 'expo-av';
import styles from '../../styles/styles';

const propTypes = {
    url: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    // videoPlayerStyles: PropTypes.object,
    shouldPlay: PropTypes.bool,
    onVideoLoaded: PropTypes.func,
};

const defaultProps = {
    shouldPlay: false,
    onVideoLoaded: () => {},
};

const VideoPlayer = forwardRef((props, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (ref === null || !ref.current.setStatusAsync) return;
        if (isLoaded && props.shouldPlay) ref.current.setStatusAsync({shouldPlay: true});
        else ref.current.setStatusAsync({shouldPlay: false});
    }, [props.shouldPlay, isLoaded]);

    return (
        <Video
            ref={ref}
            style={[styles.w100, styles.h100]}
            videoStyle={[styles.w100, styles.h100]}
            source={{
                uri: props.url,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            shouldPlay
            onReadyForDisplay={(e) => {
                setIsLoaded(true);
                props.onVideoLoaded(e);
            }}
        />
    );
});

VideoPlayer.propTypes = propTypes;
VideoPlayer.defaultProps = defaultProps;
VideoPlayer.displayName = 'AttachmentView';

export default VideoPlayer;
