import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AlbumEdit() {
    const {id} = useParams();
    const [album_name, setAlbumName] = useState<string>('');
    const [album_desc, setAlbumDesc] = useState<string>('');
    const [year_released, setYear] = useState<string>('');
    const [imgUrl, setImg] = useState<string>('');
    const [album_price, setPrice] = useState<string>('');
    const [ytLink, setYT] = useState<string>('');
    const [spoLink, setSpo] = useState<string>('');
    const [reccomSong,setSong] = useState<string>('');

    useEffect(()=>{
        const requestOptions = {
            method: "GET",
          };
          
          fetch("https://testapi-livid.vercel.app/products/"+id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                    setAlbumName(result['album_name'])
                    setAlbumDesc(result['album_desc'])
                    setYear(result['year_released'])
                    setImg(result['img_url'])
                    setPrice(result['album_price'])
                    setYT(result['youtube_link'])
                    setSpo(result['spotify_link'])
                    setSong(result['reccom_song'])
            })
            .catch((error) => console.error(error));
    },[id])

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();  // เพิ่มการหยุดพฤติกรรมเริ่มต้นของฟอร์ม
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "img_url": imgUrl,
            "album_name": album_name,
            "album_desc": album_desc,
            "year_released": year_released,
            "album_price": album_price,
            "youtube_link": ytLink,
            "spotify_link": spoLink,
            "reccom_song": reccomSong
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            //redirect: "follow"
        };

        fetch("https://testapi-livid.vercel.app/products/"+ id , requestOptions)
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json();
            })
            .then(() => {
                alert("บันทึกข้อมูลแล้ว")
                window.location.href = '/Admin'
            })
            .catch((error) => console.error(error));


    }

    return (
        <div style={{backgroundColor:'white'}}>
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{color:'#9e958a'}}>
                    Edit Album
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField id="album_name" label="Album Name" variant="outlined" fullWidth required
                                onChange={(e) => setAlbumName(e.target.value)} value={album_name} style={{ backgroundColor: 'white', color: 'black' }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="album_desc" label="description" variant="outlined" fullWidth required
                                onChange={(e) => setAlbumDesc(e.target.value)} value={album_desc} style={{ backgroundColor: 'white', color: 'black' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="year_released" label="Year Released" variant="outlined" fullWidth required
                                onChange={(e) => setYear(e.target.value)} value={year_released} style={{ backgroundColor: 'white', color: 'black' }} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="album_price" label="Album price" variant="outlined" fullWidth required
                                onChange={(e) => setPrice(e.target.value)} value={album_price} style={{ backgroundColor: 'white', color: 'black' }} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="imgUrl" label="Album Image" variant="outlined" fullWidth required
                                onChange={(e) => setImg(e.target.value)} value={imgUrl} style={{ backgroundColor: 'white', color: 'black' }} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="ytLink" label="Youtube link" variant="outlined" fullWidth required
                                onChange={(e) => setYT(e.target.value)} value={ytLink} style={{ backgroundColor: 'white', color: 'black' }} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="spoLink" label="Spotify link" variant="outlined" fullWidth required
                                onChange={(e) => setSpo(e.target.value)} value={spoLink} style={{ backgroundColor: 'white', color: 'black' }} />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="reccomSong" label="Recomment Song" variant="outlined" fullWidth required
                                onChange={(e) => setSong(e.target.value)} value={reccomSong} style={{ backgroundColor: 'white', color: 'black' }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" fullWidth style={{ backgroundColor: '#9e958a', color: 'black' }}>
                                บันทึก
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </React.Fragment>
        </div>
    );
}
export { };