import liff from '@line/liff';
import { Box, Button, Fade } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './UserContext';
import Alert from '@mui/material/Alert';
import { getProductsById, sentFlexToLine } from '../services/items';

export default function Detail() {
    const [productId,setProductId] = useState<string>('');
    const [albumName, setAlbumName] = useState<string>('');
    const [albumDesc, setAlbumDesc] = useState<string>('');
    const [yearReleased, setYear] = useState<string>('');
    const [imgUrl, setImg] = useState<string>('');
    const [ytLink, setYT] = useState<string>('');
    const [spoLink, setSpo] = useState<string>('');
    const [albumPrice, setPrice] = useState<string>('');
    const [reccomSong, setSong] = useState<string>('');
    const { id } = useParams();
    const { userId } = useUser();
    const { isLoggedIn } = useUser();
    const { login } = useUser();
    const songLink = "https://open.spotify.com/embed/track/" + reccomSong
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        if(id){
        getProductsById(id)
            .then((result) => {
                setProductId(result['_id'])
                setAlbumName(result['albumName']);
                setAlbumDesc(result['albumDesc']);
                setYear(result['yearReleased']);
                setImg(result['imgUrl']);
                setYT(result['youtubeLink']);
                setSpo(result['spotifyLink']);
                setPrice(result['albumPrice'])
                setSong(result['reccomSong'])
            })
            .catch((error) => console.error(error));
        }
    }, [id]);

    const navigateToYoutube = () => {
        window.location.href = ytLink;
    };

    const navigateToSpotify = () => {
        window.location.href = spoLink;
    };

    const data = {
        userId: userId,
        productId: productId
    };

    async function sendMsgbyBody() {
        if(data){
            sentFlexToLine(data)
            .then((result) => {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            })
            .catch((error) => console.error(error));
        }
    }

    async function testlog() {
        console.log(songLink)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center md:items-center">
                <img src={imgUrl} alt={albumName} className="w-full md:w-1/2 h-auto aspect-square object-cover mb-4 md:mb-0 md:mr-4" />
                <div className="md:flex-1 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold mb-2 mt-6">{albumName}</h1>
                    <p className="mb-2">{albumDesc}</p>
                    <p className="text-md mb-2">Released: {yearReleased}</p>
                    <p className="text-md mb-2">Price: {albumPrice} Baht</p>
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