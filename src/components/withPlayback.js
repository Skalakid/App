import React, {createContext, useState, forwardRef, useContext, useCallback, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import getComponentDisplayName from '../libs/getComponentDisplayName';

const PlaybackContext = createContext(null);

const playbackPropTypes = {
    currentlyPlayingURL: PropTypes.string.isRequired,
    updateCurrentlyPlayingURL: PropTypes.func.isRequired,
};

function PlaybackContextProvider({children}) {
    const [currentlyPlayingURL, setCurrentlyPlayingURL] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const originalParent = useRef(null);
    const sharedElement = useRef(null);

    const updateIsFullScreen = useCallback((isSet) => {
        setIsFullScreen(isSet);
    }, []);

    const updateCurrentlyPlayingURL = useCallback(
        (url) => {
            setCurrentlyPlayingURL(url);
        },
        [setCurrentlyPlayingURL],
    );

    const updateSharedElements = (parent, child) => {
        originalParent.current = parent;
        sharedElement.current = child;
    };

    const contextValue = useMemo(
        () => ({
            updateCurrentlyPlayingURL,
            currentlyPlayingURL,
            updateSharedElements,
            originalParent,
            sharedElement,
            updateIsFullScreen,
            isFullScreen,
        }),
        [updateCurrentlyPlayingURL, currentlyPlayingURL, updateIsFullScreen, isFullScreen],
    );

    return <PlaybackContext.Provider value={contextValue}>{children}</PlaybackContext.Provider>;
}

PlaybackContextProvider.displayName = 'EnvironmentProvider';
PlaybackContextProvider.propTypes = {
    /** Actual content wrapped by this component */
    children: PropTypes.node.isRequired,
};

export default function withPlayback(WrappedComponent) {
    const WithPlayback = forwardRef((props, ref) => {
        const {currentlyPlayingURL} = useContext(PlaybackContext);
        return (
            <WrappedComponent
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                ref={ref}
                currentlyPlayingURL={currentlyPlayingURL}
            />
        );
    });

    WithPlayback.displayName = `withPlayback(${getComponentDisplayName(WrappedComponent)})`;

    return WithPlayback;
}

export {PlaybackContext, playbackPropTypes, PlaybackContextProvider};
