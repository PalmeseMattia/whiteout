import Slider from '@/components/Slider'
import { Inter } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [bassGain, setBassGain] = useState(0);
  const [midBassGain, setMidBassGain] = useState(0);
  const [highBassGain, setHighBassGain] = useState(0);
  const [lowerMidGain, setLowerMidGain] = useState(0);
  const [midGain, setMidGain] = useState(0);
  const [trebbleGain, setTrebbleGain] = useState(0);


  const [dataPlaying, setDataPlaying] = useState(false);
  const audioContext = useRef();

  const bassGainNode = useRef();
  const midBassGainNode = useRef();
  const highBassGainNode = useRef();
  const lowerMidGainNode = useRef();
  const midGainNode = useRef();
  const trebbleGainNode = useRef();

  const bassOscillatorNode = useRef();    
  const midBassOscillatorNode = useRef();
  const highBassOscillatorNode = useRef();
  const lowerMidOscillatorNode = useRef();
  const midOscillatorNode = useRef();       
  const trebbleOscillatorNode = useRef();

  
  useEffect(() => {
    //Create audio context 
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext.current = new AudioContext();

    //Create gain node
    bassGainNode.current = audioContext.current.createGain();
    bassGainNode.current.connect(audioContext.current.destination);
    bassGainNode.current.gain.value = bassGain;

    midBassGainNode.current = audioContext.current.createGain();
    midBassGainNode.current.connect(audioContext.current.destination);
    midBassGainNode.current.gain.value = midBassGain;

    highBassGainNode.current = audioContext.current.createGain();
    highBassGainNode.current.connect(audioContext.current.destination);
    highBassGainNode.current.gain.value = highBassGain;

    lowerMidGainNode.current = audioContext.current.createGain();
    lowerMidGainNode.current.connect(audioContext.current.destination);
    lowerMidGainNode.current.gain.value = lowerMidGain;

    midGainNode.current = audioContext.current.createGain();
    midGainNode.current.connect(audioContext.current.destination);
    midGainNode.current.gain.value = midBassGain;

    trebbleGainNode.current = audioContext.current.createGain();
    trebbleGainNode.current.connect(audioContext.current.destination);
    trebbleGainNode.current.gain.value = highBassGain;
    
    //Create oscillator node
    bassOscillatorNode.current = audioContext.current.createOscillator();
    bassOscillatorNode.current.type = 'sine';
    bassOscillatorNode.current.frequency.value = 60;
    bassOscillatorNode.current.connect(bassGainNode.current);
    bassOscillatorNode.current.start();

    midBassOscillatorNode.current = audioContext.current.createOscillator();
    midBassOscillatorNode.current.type = 'sine';
    midBassOscillatorNode.current.frequency.value = 175;
    midBassOscillatorNode.current.connect(midBassGainNode.current);
    midBassOscillatorNode.current.start();

    highBassOscillatorNode.current = audioContext.current.createOscillator();
    highBassOscillatorNode.current.type = 'sine';
    highBassOscillatorNode.current.frequency.value = 250;
    highBassOscillatorNode.current.connect(highBassGainNode.current);
    highBassOscillatorNode.current.start();

    lowerMidOscillatorNode.current = audioContext.current.createOscillator();
    lowerMidOscillatorNode.current.type = 'sine';
    lowerMidOscillatorNode.current.frequency.value = 440;
    lowerMidOscillatorNode.current.connect(lowerMidGainNode.current);
    lowerMidOscillatorNode.current.start();

    midOscillatorNode.current = audioContext.current.createOscillator();
    midOscillatorNode.current.type = 'sine';
    midOscillatorNode.current.frequency.value = 1250;
    midOscillatorNode.current.connect(midGainNode.current);
    midOscillatorNode.current.start();

    trebbleOscillatorNode.current = audioContext.current.createOscillator();
    trebbleOscillatorNode.current.type = 'sine';
    trebbleOscillatorNode.current.frequency.value = 2000;
    trebbleOscillatorNode.current.connect(trebbleGainNode.current);
    trebbleOscillatorNode.current.start();

  }, []);

  const toggleOscillator = () => {
    if (dataPlaying) {
      audioContext.current.suspend();
    } else {
      audioContext.current.resume();
    }
    setDataPlaying((play) => !play);
  };

  const changeGain = (g, setter, gainNode) => {
      gainNode.current.gain.value = g;
      setter(g);
  }

  // TODO: this functions works only after we change the gain value, so everytime we
  // force a rerender
  const getHz = (oscillator) => {
    return oscillator.current ? oscillator.current.frequency.value : "Undefined"
  };


  return (
    <main
      className="flex flex-col h-screen text-white bg-black items-center justify-center font-mono">
          <div className='flex lg:flex-row flex-col'>
          <Slider subtext="Bass(60Hz)" 
            value={bassGain} 
            changeGain={changeGain} 
            setter={setBassGain} 
            gainNode={bassGainNode} 
            bgcolor="[&::-webkit-slider-thumb]:bg-[#8A307F]"/>
          <Slider 
            subtext="Mid Bass(175Hz)" 
            value={midBassGain} 
            changeGain={changeGain} 
            setter={setMidBassGain} 
            gainNode={midBassGainNode}
            bgcolor="[&::-webkit-slider-thumb]:bg-[#5F57AC]"/>
          <Slider 
            subtext="High bass(250hz)" 
            value={highBassGain} 
            changeGain={changeGain} 
            setter={setHighBassGain}
            gainNode={highBassGainNode}
            bgcolor="[&::-webkit-slider-thumb]:bg-[#0076C1]"/>
          <Slider 
            subtext={`Lower Mid(440hz)`}
            value={lowerMidGain} 
            changeGain={changeGain} 
            setter={setLowerMidGain} 
            gainNode={lowerMidGainNode}
            bgcolor="[&::-webkit-slider-thumb]:bg-[#008DBE]"/>
          <Slider 
            subtext="Mid(1250Hz)" 
            value={midGain} 
            changeGain={changeGain} 
            setter={setMidGain}
            gainNode={midGainNode}
            bgcolor="[&::-webkit-slider-thumb]:bg-[#009FA9]"/>
          <Slider 
            subtext="Trebble(2000hz)" 
            value={trebbleGain} 
            changeGain={changeGain} 
            setter={setTrebbleGain}
            gainNode={trebbleGainNode}
            bgcolor="[&::-webkit-slider-thumb]:bg-[#3BAD8F]"/>
          </div>
        <button 
          onClick={() => toggleOscillator()}
          className="appearance-none mt-10 border-solid border-white border-2 p-2 ">
          {dataPlaying ? "Stop" : "Play"}
        </button>
    </main>
  )
}
