import React from 'react'
import useGetAllLoops from '../hooks/useGetLoops'
import { useSelector } from 'react-redux';
import LoopCard from '../components/LoopCard';

const Loop = () => {
    useGetAllLoops();
    const {loopData} = useSelector(state=>state.loop);
    // console.log("this is loop dtaa",loopData);
  return (
    <div className='snap-mandatory snap-y'>
        {loopData && loopData.map((e,i)=>{
            return(
                <div key={i} className='text-white snap-start scrollbar-hide'>
                    <LoopCard video={e} />
                </div>
            )
        })}






    </div>
  )
}

export default Loop
