import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import withLocalize, {withLocalizePropTypes} from '../withLocalize';
import compose from '../../libs/compose';
import AttachmentView from '../AttachmentView';
import PressableWithoutFeedback from '../Pressable/PressableWithoutFeedback';
import Icon from '../Icon';
import styles from '../../styles/styles';
import * as Expensicons from '../Icon/Expensicons';

const propTypes = {
    url: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
    ...withLocalizePropTypes,
};

const defaultProps = {};
const videoContainerHeight = 400;

function VideoPlayerPreview(props) {
    return (
        <View style={{height: videoContainerHeight, maxWidth: 500, ...styles.webViewStyles.tagStyles.img}}>
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

export default compose(memo, withLocalize)(VideoPlayerPreview);
