import React from 'react'

function Slider({changeGain, setter, gainNode, subtext, value, bgcolor}) {

    return (
        <div className='flex flex-col items-center mx-4'>
            <input
                type='range'  
                className={`
                    lg:-rotate-90
                    rotate-0
                    appearance-none
                    bg-transparent
                    border-solid
                    border-2
                    h-4
                    border-white
                    [&::-webkit-slider-thumb]:appearance-none
                    ${bgcolor}
                    [&::-webkit-slider-thumb]:w-5  
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:border-solid
                    [&::-webkit-slider-thumb]:border-white
                    [&::-webkit-slider-thumb]:border-1`}
                min={0}
                max={10}
                step={0.5}
                value={value}
                onChange={e =>  {
                        changeGain(e.target.valueAsNumber, setter, gainNode);
                    }
                }  
            />
            <p className='lg:mt-16 mt-2'>{subtext}</p>
            <p className='mb-6'>Gain: {value}</p>
        </div>
    )
}

export default Slider