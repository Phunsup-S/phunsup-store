import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { createProducts } from '../services/items';

export default function AlbumCreate() {

    const [albumName, setAlbumName] = useState<string>('');
    const [albumDesc, setAlbumDesc] = useState<string>('');
    const [yearReleased, setYear] = useState<string>('');
    const [imgUrl, setImg] = useState<string>('');
    const [albumPrice, setPrice] = useState<string>('');
    const [ytLink, setYT] = useState<string>('');
    const [spoLink, setSpo] = useState<string>('');
    const [reccomSong,setSong] = useState<string>('');

    const raw = JSON.stringify({
        "imgUrl": imgUrl,
        "albumName": albumName,
        "albumDesc": albumDesc,
        "yearReleased": yearReleased,
        "albumPrice": albumPrice,
        "youtubeLink": ytLink,
        "spotifyLink": spoLink,
        "reccomSong": reccomSong
    });
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();  // เพิ่มการหยุดพฤติกรรมเริ่มต้นของฟอร์ม
        createProducts(raw)
            .then(() => {
                alert("เพื่มข้อมูลแล้ว")
                window.location.href = '/admin'
            })
            .catch((error) => console.error(error));
    }

    return (
        <div style={{backgroundColor:'white'}}>
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{color:'#9e958a'}}>
                    Add new Albums
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField id="albumName" label="Album Name" variant="outlined" fullWidth required
                                onChange={(e) => setAlbumName(e.target.value)} style={{ backgroundColor: 'white', color: 'black'  }}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="albumDesc" label="description" variant="outlined" fullWidth required
                                onChange={(e) => setAlbumDesc(e.target.value)} style={{ backgroundColor: 'white', color: 'black' }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="yearReleased" label="Year Released" variant="outlined" fullWidth required
                                onChange={(e) => setYear(e.target.value)} style={{ backgroundColor: 'white', color: 'black' }}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="albumPrice" label="Album price" variant="outlined" fullWidth required
                                onChange={(e) => setPrice(e.target.value)} style={{ backgroundColor: 'white', color: 'black' }}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="imgUrl" label="Album Image" variant="outlined" fullWidth required
                                onChange={(e) => setImg(e.target.value)} style={{ backgroundColor: 'white', color: 'black' }}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="ytLink" label="Youtube link" variant="outlined" fullWidth required
                                onChange={(e) => setYT(e.target.value)} style={{ backgroundColor: 'white', color: 'black' }}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="spoLink" label="Spotify link" variant="outlined" fullWidth required
                                onChange={(e) => setSpo(e.target.value)} style={{ backgroundColor: 'white', color: 'black' }}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField id="reccomSong" label="Recomment Song" variant="outlined" fullWidth required
                                onChange={(e) => setSong(e.target.value)} style={{ backgroundColor: 'white', color: 'black' }}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' variant="contained" fullWidth style={{ backgroundColor: '#9e958a', color: 'black' }}>
                                Add
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