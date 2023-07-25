import React, {createContext, useState, forwardRef, useContext, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import getComponentDisplayName from '../libs/getComponentDisplayName';

const PlaybackContext = createContext(null);

const playbackPropTypes = {
    currentlyPlayingURL: PropTypes.string.isRequired,
    updateCurrentlyPlayingURL: PropTypes.func.isRequired,
};

function PlaybackContextProvider({children}) {
    const [currentlyPlayingURL, setCurrentlyPlayingURL] = useState(1);

    const updateCurrentlyPlayingURL = useCallback(
        (url) => {
            setCurrentlyPlayingURL(url);
        },
        [setCurrentlyPlayingURL],
    );

    const contextValue = useMemo(
        () => ({
            updateCurrentlyPlayingURL,
            currentlyPlayingURL,
        }),
        [updateCurrentlyPlayingURL, currentlyPlayingURL],
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
