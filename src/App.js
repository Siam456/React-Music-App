import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [result, setresult] = useState([]);
  const [searchSong, setsearchSong] = useState('');
  const [lyricsState, setlyricsState] = useState('');
  const search = (e) => {
    setsearchSong(e.target.value);
    
  }

  useEffect(() => {
    axios.get(`https://api.lyrics.ovh/suggest/${searchSong}`)
    .then(res => {
      setresult(res.data.data);
      //console.log(result)
      
    })
    .catch(err => console.log('search first'))
  });

  const lyrics = (artist, title) => {
    axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => {
      setlyricsState(res.data.lyrics)
      //console.log(res.data.lyrics)
    })
    .catch(err => console.log(err))
  }


  return (
    <>
      <div style={{textAlign:'center'}}>
        
          <div className='my-5' style={{display: 'flex', width: '50%', margin: 'auto'}}>
            <i style={{fontSize: '30px', margin: '10px'}} className="fab fa-searchengin"></i> <input className='form-control' type='text' name='search' onChange={search} placeholder="&#xf002; Search here..."></input>
          </div>

        <>
          <div className="container">
            <div className="row my-5">
              {result.map((v, i) => {
                return(
                  <>
                    <div className="col-sm m-2" key={i}>
                      <div className='cardx'>
                        <div className='p-3' style={{textAlign: 'center'}}>
                          <h5>Your Song</h5>
                        </div>
                        <div className='imgWrapper'>
                          <img src={v.album.cover_medium} alt='siam'/>
                        </div>
                        <div className='container py-3'  style={{textAlign: 'center'}}>
                          <h5 className='my-2' style={{color: '#89787E'}}><i class="fas fa-headphones-alt"></i> {v.title}</h5>
                          <p className='my-2' style={{color: '#89787E'}}> {v.artist.name}</p>
                          <p className='my-2' style={{color: '#89787E'}}> <i className="fas fa-compact-disc"></i> {v.album.title}</p>
                          
                        </div>
                        <div className='my-3'>
                          <button  data-toggle="modal" data-target="#exampleModalLong" onClick={() => lyrics(v.artist.name , v.title)} className='btn btn-outline-dark'>Get Lyrics</button> 
                        </div>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle"><i class="fas fa-headphones-alt"></i> Lyrics</h5>
                                <button style={{border: 'none'}} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                {lyricsState}
                              </div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                
                              </div>
                            </div>
                          </div>
                        </div>



                        <div style={{textAlign: 'center'}}>
                          <audio controls>
                            <source src={v.preview} type="audio/ogg"/>
                            Your browser does not support the audio tag.
                          </audio>
                        </div>
                        
                      </div>
                    </div>
              
                  </>
                )
              })}
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default App;
