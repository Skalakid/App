import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Video, ResizeMode} from 'expo-av';
import styles from '../../styles/styles';

const propTypes = {
    url: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    // videoPlayerStyles: PropTypes.object,
    shouldPlay: PropTypes.bool,
};

const defaultProps = {
    shouldPlay: false,
};

function VideoPlayer(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (!ref.current.setStatusAsync) return;

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
            onReadyForDisplay={() => setIsLoaded(true)}
        />
    );
}

VideoPlayer.propTypes = propTypes;
VideoPlayer.defaultProps = defaultProps;
VideoPlayer.displayName = 'AttachmentView';

export default VideoPlayer;
