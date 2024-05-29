import liff from '@line/liff';
import { Box, Button, Fade } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './UserContext';
import Alert from '@mui/material/Alert';

export default function Detail() {
    const [album_name, setAlbumName] = useState<string>('');
    const [album_desc, setAlbumDesc] = useState<string>('');
    const [year_released, setYear] = useState<string>('');
    const [imgUrl, setImg] = useState<string>('');
    const [ytLink, setYT] = useState<string>('');
    const [spoLink, setSpo] = useState<string>('');
    const [album_price, setPrice] = useState<string>('');
    const [buyTime, setBuyTime] = useState<number>();
    const [reccomSong, setSong] = useState<string>('');
    const { id } = useParams();
    const { userId } = useUser();
    const { isLoggedIn } = useUser();
    const { login } = useUser();
    const songLink = "https://open.spotify.com/embed/track/" + reccomSong
    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
        const requestOptions = {
            method: "GET",
        };

        fetch("https://testapi-livid.vercel.app/products/" + id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setAlbumName(result['album_name']);
                setAlbumDesc(result['album_desc']);
                setYear(result['year_released']);
                setImg(result['img_url']);
                setYT(result['youtube_link']);
                setSpo(result['spotify_link']);
                setPrice(result['album_price'])
                setSong(result['reccom_song'])
            })
            .catch((error) => console.error(error));
    }, [id]);

    const navigateToYoutube = () => {
        window.location.href = ytLink;
    };

    const navigateToSpotify = () => {
        window.location.href = spoLink;
    };

    async function sendMsg() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer fTLQpURatpFHiI500kevYWlI9WhuuTmzRiuA93JjzraCWZleWQsrAqpJ1zGeLznCbB0TW75jSej4cLanrGUa+K3AsxaWCtLd/NqUWPKUWsmu7CQ5Y5vCAjREi44jUZtHASeELCW6eNvyKRCDfT8DrwdB04t89/1O/w1cDnyilFU=");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            //redirect: "follow"
        };

        fetch("https://testapi-livid.vercel.app/send-message/" + userId, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            })
            .catch((error) => console.error(error));
    }

    async function sendMsgbyBody() {
        const buyTimenow = Date.now();
        setBuyTime(buyTimenow);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer fTLQpURatpFHiI500kevYWlI9WhuuTmzRiuA93JjzraCWZleWQsrAqpJ1zGeLznCbB0TW75jSej4cLanrGUa+K3AsxaWCtLd/NqUWPKUWsmu7CQ5Y5vCAjREi44jUZtHASeELCW6eNvyKRCDfT8DrwdB04t89/1O/w1cDnyilFU=");

        const data = {
            id: userId,
            name: album_name,
            img: imgUrl,
            price: album_price,
            date: Date.now().toString(),
            youtube: ytLink,
            spotify: spoLink,
            weburl: window.location.href.toString()
        };

        console.log(data)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data), // ส่งข้อมูลในรูปแบบ JSON
            redirect: "follow" as RequestRedirect
        };

        fetch("https://testapi-livid.vercel.app/send-message/", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            })
            .catch((error) => console.error(error));
    }

    async function testlog() {
        console.log(songLink)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center md:items-center">
                <img src={imgUrl} alt={album_name} className="w-full md:w-1/2 h-auto aspect-square object-cover mb-4 md:mb-0 md:mr-4" />
                <div className="md:flex-1 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold mb-2 mt-6">{album_name}</h1>
                    <p className="mb-2">{album_desc}</p>
                    <p className="text-md mb-2">Released: {year_released}</p>
                    <p className="text-md mb-2">Price: {album_price} Baht</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <Button
                            onClick={navigateToYoutube}
                            variant="outlined"
                            sx={{
                                color: 'red', // สีของตัวอักษร
                                borderColor: 'red', // สีของเส้นขอบ
                                '&:hover': {
                                    backgroundColor: 'red', // สีพื้นหลังเมื่อโฮเวอร์
                                    color: 'white', // สีของตัวอักษรเมื่อโฮเวอร์
                                    borderColor: 'red', // สีของเส้นขอบเมื่อโฮเวอร์
                                },
                            }}
                        >
                            Youtube
                        </Button>
                        <Button
                            onClick={navigateToSpotify}
                            variant="outlined"
                            sx={{
                                color: 'green', // สีของตัวอักษร
                                borderColor: 'green', // สีของเส้นขอบ
                                '&:hover': {
                                    backgroundColor: 'green', // สีพื้นหลังเมื่อโฮเวอร์
                                    color: 'white', // สีของตัวอักษรเมื่อโฮเวอร์
                                    borderColor: 'green', // สีของเส้นขอบเมื่อโฮเวอร์
                                },
                            }}
                        >
                            Spotify
                        </Button>
                        <Button
                            onClick={() => {
                                if (isLoggedIn) {
                                    sendMsgbyBody();
                                } else {
                                    login();
                                }
                            }}
                            variant="outlined"
                            sx={{
                                color: '#9e958a', // สีของตัวอักษร
                                borderColor: '#9e958a', // สีของเส้นขอบ
                                '&:hover': {
                                    backgroundColor: '#9e958a', // สีพื้นหลังเมื่อโฮเวอร์
                                    color: 'black', // สีของตัวอักษรเมื่อโฮเวอร์
                                    borderColor: '#9e958a', // สีของเส้นขอบเมื่อโฮเวอร์
                                },
                            }}
                        >
                            Buy Now
                        </Button>

                    </div>
                    <div>
                        <Box sx={{ display: 'flex' }}>
                            {showAlert && (
                                <Fade in={showAlert}>
                                    <Alert variant="outlined" severity="success" className='mt-4'>
                                        The receipt will be sent via line, Enjoy!
                                    </Alert>
                                </Fade>
                            )}
                        </Box>

                    </div>
                    <div className='text-xl font-bold mt-6'>
                        <h1>Popular song in album</h1>
                    </div>
                    <div className="flex justify-center space-x-4 mt-6">
                        <iframe
                            //src={'https://open.spotify.com/embed/track/'+{reccomSong}}
                            src={songLink}
                            width="300"
                            height="380"
                            frameBorder="0"
                            allowTransparency={true}
                            allow="encrypted-media">

                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
