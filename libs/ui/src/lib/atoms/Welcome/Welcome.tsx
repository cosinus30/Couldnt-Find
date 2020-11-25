import React from 'react';
import Typist from 'react-typist'

export const Welcome = ({...props }) => {
    return (
        <Typist cursor={{show: false}} avgTypingDelay={100}>
            <span style={{fontSize:'xxx-large'}}>Your</span>
            <Typist.Delay ms={500} />
            <Typist.Backspace count={4}/>
            <span style={{fontSize:'xxx-large'}}>Our knowledge</span>
            <br/>
            <Typist.Delay ms={500} />
            <span style={{fontSize:'xx-large'}}>Your experniece</span>
            <Typist.Delay ms={500} />
            <Typist.Backspace count={5}/>
            <span style={{fontSize:'xx-large'}}>ience</span>
            <Typist.Delay ms={500} />
            <span style={{fontSize:'xx-large'}}>, our success</span>
        </Typist>
    )
};
