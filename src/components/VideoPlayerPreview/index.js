import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import AttachmentView from '../AttachmentView';
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
    const handleOnPress = () => {
        setIsThumbnail(false);
    };

    return isThumbnail ? (
        <VideoPlayerThumbnail
            onPress={handleOnPress}
            accessibilityLabel={props.fileName}
        />
    ) : (
        <View style={{height: 250, width: 400, ...styles.webViewStyles.tagStyles.img}}>
            <AttachmentView
                source={props.url}
                file={{name: props.fileName}}
                videoPlayerStyles={{borderRadius: 10}}
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
