import {createElement} from 'react';
import PropTypes from 'prop-types';
// import styles from '../../styles/styles';

const propTypes = {
    /** URL to video */
    url: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    videoPlayerStyles: PropTypes.object,
};

const defaultProps = {
    videoPlayerStyles: [],
};

function VideoPlayer(props) {
    return createElement('video', {
        src: props.url,
        controls: true,
        style: {height: '100%', width: '100%', ...props.videoPlayerStyles},
    });
}

VideoPlayer.propTypes = propTypes;
VideoPlayer.defaultProps = defaultProps;
VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
