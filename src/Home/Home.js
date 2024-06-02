import React, { useState } from 'react';

const Home = () => {
  const [words, setData] = useState([]);
  const onsubmitHandler = (e) => {
    e.preventDefault();
    const wd = e.target.wd.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wd}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json'}
    })
      .then(data => data.json())
      .then(data => {
        setData(data)
      })
  }

  console.log(words)
 
  return (
    <div data-theme="night" className="bg-base-300">
      <header className="">
        <form onSubmit={onsubmitHandler}>
          <input
            type="text" placeholder='enter the word' name='wd' className='input w-40 h-20' defaultValue={'a'}/>
          <button className='btn btn-outline'>search</button>
        </form>
        Dictionary
        <div>Searching...:</div>
        {
          words.length>0?<>{
            words?.map(w => <div>
              <h2>word: {w?.word}</h2>
              {w?.phonetic ? <p>Phonetic: {w?.phonetic}</p> : <p>Phonetic: Phonetic is not available</p>}
              {w?.meanings?.map(m => <div>
                <h2>{m?.partofSpeech}</h2>
                {m?.definations?.map(df=><p>{df?.defination}</p>)}
              </div>)}
              {w?.phonetics?.map(dt => <span>
                {dt.audio ? <><div className='bg-red-300 w-full'>
                  <audio controls className=''>
                    <source src={dt.audio} type="audio/ogg" />
                  </audio>
                </div></> : <></>
                }
              </span>)}
            </div>)
          }</>:<div>
          <p className='text-orange'>{words?.title}</p>
          <p className='text-blue-500'>message: {words?.message}</p>
          <p className='text-red'>{words?.resolution}</p>
        </div>
        }
      </header>
    </div>
  );
}

export default Home;