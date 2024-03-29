// @ts-nocheck
import React from 'react';
import './index.less'

const { useState, useRef, useEffect, useLayoutEffect, createContext } = React;

/**
 * Globals
 */

const CONSTANTS = {
  assetPath: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/184729",
}

const ASSETS = {
  head: `${CONSTANTS.assetPath}/head.svg`,
  waiting: `${CONSTANTS.assetPath}/hand.svg`,
  stalking: `${CONSTANTS.assetPath}/hand-waiting.svg`,
  grabbing: `${CONSTANTS.assetPath}/hand.svg`,
  grabbed: `${CONSTANTS.assetPath}/hand-with-cursor.svg`,
  shaka: `${CONSTANTS.assetPath}/hand-surfs-up.svg`
}

// Preload images
Object.keys(ASSETS).forEach(key => {
  const img = new Image();
  img.src = ASSETS[key];
});


/**
 * Shared hooks
 */

// Hover state - https://dev.to/spaciecat/hover-states-with-react-hooks-4023
const useHover = () => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const enter = () => setHovered(true);
  const leave = () => setHovered(false);

  useEffect(
    () => {
      ref.current.addEventListener("mouseenter", enter);
      ref.current.addEventListener("mouseleave", leave);
      return () => {
        ref.current.removeEventListener("mouseenter", enter);
        ref.current.removeEventListener("mouseleave", leave);
      };
    },
    [ref]
  );

  return [ref, hovered];
};

// Mouse position
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};

// Element position
const usePosition = () => {
  const ref = useRef();
  const [position, setPosition] = useState({});

  const handleResize = () => {
    setPosition(ref.current.getBoundingClientRect());
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);

  return [ref, position];
};


/**
 * React Components
 */

class Home extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      debug: false,
      cursorGrabbed: false,
      gameOver: false,
    };
    
    this.handleToggleDebug = this.handleToggleDebug.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.handleCursorGrabbed = this.handleCursorGrabbed.bind(this);
  }
  
  handleToggleDebug() {
    this.setState({
      debug: !this.state.debug
    });
  }
  
  handleCursorGrabbed() {
    this.setState({
      cursorGrabbed: true
    });
    setTimeout(() => {
      this.setState({
        cursorGrabbed: false
      });
    }, 2000)
  }

    
  handleButtonClicked() {
    this.setState({
      gameOver: true
    });
    setTimeout(() => {
      this.setState({
        gameOver: false
      });
    }, 4000)
  }

  render() {
    const { cursorGrabbed, gameOver, debug } = this.state;
    const screenStyle = cursorGrabbed ? { cursor: "none" } : {};
    const appClass = debug ? "app app--debug" : "app";
    
    return (
      <div className={appClass} style={screenStyle}>
        <section className="container">
          <h1>Hello!</h1>
          <h2>Welcome to the internet.</h2>
          <p>This is a classic website, no traps or weird stuff!</p>
          <p>Feel free to browse, relax and, I don't know, click the button down there? Might as well, right?</p>
          <p style={{textAlign: 'right'}}> --- Leo --- </p>
          
          {/* <button
            className="debug-button"
            onClick={this.handleToggleDebug}>
              Debug
          </button> */}
        </section>
        
        <button
          className="trap-button"
          onClick={this.handleButtonClicked}>
            { gameOver && "Nice one" }
            { cursorGrabbed && "Gotcha!" }
            { !gameOver && !cursorGrabbed && "Button!"}
        </button>
        
        <div className="grab-zone-wrapper">
          <GrabZone
            onCursorGrabbed={this.handleCursorGrabbed} 
            cursorGrabbed={cursorGrabbed}
            gameOver={gameOver}
          />
        </div>
      </div>
    );
  }
}

// GrabZone (The hover trigger zone)
const GrabZone = ({ cursorGrabbed, gameOver, onCursorGrabbed }) => {
  const [outerRef, outerHovered] = useHover();
  const [innerRef, innerHovered] = useHover();
  const [isExtended, setExtendedArm] = useState(false);

  let state = "waiting";
  if (outerHovered) {
    state = "stalking";
  }
  if (innerHovered) {
    state = "grabbing";
  }
  if (cursorGrabbed) {
    state = "grabbed";
  }
  if (gameOver) {
    state = "shaka"
  }
  
  // If state is grabbing for a long time, they're being clever!
  useEffect(() => {
      let timer;
      if (state === "grabbing") {
        timer = setTimeout(() => {
          // Not so clever now, are they?
          setExtendedArm(true);
          timer = null;
        }, 2000);
      }
      return () => {
        setExtendedArm(false);
        if (timer) {
          clearTimeout(timer);
        }
      };
    },
    [state]
  );

  return (
    <div className="grab-zone" ref={outerRef}>
      <div className="grab-zone__debug">
        <strong>Debug info:</strong>
        <p>Current state: {state}</p>
        <p>Extended arm: {isExtended ? "Yes" : "No"}</p>
      </div>
      <div className="grab-zone__danger" ref={innerRef}>
        <Grabber
          state={state}
          gameOver={gameOver}
          extended={isExtended}
          onCursorGrabbed={onCursorGrabbed}
        />
      </div>
    </div>
  );
};

// Grabber (The graphic)
const Grabber = ({ state, gameOver, extended, onCursorGrabbed }) => {
  const mousePos = useMousePosition();
  const [ref, position] = usePosition();
  const hasCursor = false;

  // Calculate rotation of armWrapper
  const x = position.left + position.width * 0.5;
  const y = position.top + position.height * 0.5;
  const angle = gameOver ? 0 : Math.atan2(mousePos.x - x, -(mousePos.y - y)) * (180 / Math.PI);
  
  // Ensure value is within acceptable range (-75 to 75)
  const rotation = Math.min(Math.max(parseInt(angle), -79), 79);
  
  const grabberClass = `grabber grabber--${state} ${extended && "grabber--extended"}`;
  const wrapperStyle = { transform: `rotate(${rotation}deg)` };

  let handImageSrc = ASSETS[state];

  return (
    <div className={grabberClass}>
      <div className="grabber__body"></div>
      <img className="grabber__face" src={ASSETS.head} />
      <div className="grabber__arm-wrapper" ref={ref} style={wrapperStyle}>
        <div className="grabber__arm">
          <img
            className="grabber__hand"
            src={handImageSrc}
            onMouseEnter={onCursorGrabbed}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;