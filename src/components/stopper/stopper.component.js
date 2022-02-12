import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import './stopper.css';

const StopperComponent = () => {
    const [time, setTime] = useState(0);
    const [pause, setPause] = useState(false);
    const [start, setStart] =  useState(true);
    const incerement = useRef(null);

    const [options, setOptions] = useState({
        speed: 500
    });

    useEffect(() => {
        clearInterval(incerement.current); // stop interval ...
        // ... and start it with new setting
        if (!start) {
            incerement.current =  setInterval(() => {
                setTime(old => old + 1); // Add 1 sek to old time value in state
            }, options.speed);
        }
    }, [options.speed]) // Listen to speed changes

    const handleStart = () => {
        setStart(false); // Set state start as "run"
        setPause(true); // Set state pause as "not this time" :P
        incerement.current =  setInterval(() => {
            setTime(old => old + 1); // Add 1 sek to old time value in state
        }, options.speed); // 1000 Milisecond === 1sek -> 500 Mil=== 0.5 sek
    }
    const handlePause = () => {
        clearInterval(incerement.current);
        setStart(true); // Set state start as "not thistime" ;P
        setPause(false); // Set state pause as "stop"

    }
    const handleReset = () => {
        setTime(0); // Set time to 0
    }

    const getForrmatedTime = () => {
        //  Output time ===  '00:00:00'
        const seconds = `0${time % 60}`.slice(-2); // Every 60 sec -> count to 60
        const minutes = `0${(Math.trunc(time / 60)) % 60}`.slice(-2); // Get minutes without decimals -> count to 60
        const hours = `0${Math.floor(time / 3600)}`.slice(-2)
        return `${hours} : ${minutes} : ${seconds}` // return correct format
    }

    return <section id="stopper">
        {/* Show in title, witch option is selected */}
        <h2>⏲️ Stopper {(1000 / options.speed) === 1 ? 'with normal speed' : 'is ' + (1000 / options.speed) + 'x faster'}</h2>
        <h3 className="time-counter">{getForrmatedTime()}</h3>
        <ul className="stopper-nav">
            {start && <li><button className={'btn btn-tertiary'} onClick={handleStart}>Start</button></li>}
            {pause && <li><button className={'btn btn-tertiary'} onClick={handlePause}>Pause</button></li>}
            <li><button className={'btn btn-tertiary'} onClick={handleReset}>Reset</button></li>
        </ul>
        <ul className="stopper-options">
            <li>
                <h3>⚙️ Speed options</h3>
                <ul>
                    <li>
                        <button className={classnames('btn btn-tertiary', {active: options.speed === 1000})} onClick={() => setOptions(old => {
                            return {...old, speed: 1000}
                        })}>
                            Normal Speed
                        </button>
                    </li>
                    <li>
                        <button className={classnames('btn btn-tertiary', {active: options.speed === 500})} onClick={() => setOptions(old => {
                            return {...old, speed: 500}
                        })}>
                            {(1000 / 500)}x faster
                        </button>
                    </li>
                    <li>
                        <button className={classnames('btn btn-tertiary', {active: options.speed === 200})} onClick={() => setOptions(old => {
                            return {...old, speed: 200}
                        })}>
                            {(1000 / 200)}x faster
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
}

export default StopperComponent;