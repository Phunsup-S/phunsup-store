import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export default function Detail() {
    const [album_name, setAlbumName] = useState<string>('');
    const [album_desc, setAlbumDesc] = useState<string>('');
    const [year_released, setYear] = useState<string>('');
    const [imgUrl, setImg] = useState<string>('');
    const { id } = useParams();

    const folkloreAlbum: string[] = [
        "the 1",
        "cardigan",
        "the last great american dynasty",
        "exile",
        "my tears ricochet",
        "mirrorball",
        "seven",
        "august",
        "this is me trying",
        "illicit affairs",
        "invisible string",
        "mad woman",
        "epiphany",
        "betty",
        "peace",
        "hoax",
        "the lakes"  // Bonus track
    ];
    useEffect(() => {
        const requestOptions = {
            method: "GET",
        };

        fetch("http://localhost:3000/products/" + id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setAlbumName(result['album_name'])
                setAlbumDesc(result['album_desc'])
                setYear(result['year_released'])
                setImg(result['img_url'])
            })
            .catch((error) => console.error(error));
    }, [id])
    return (<div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center md:items-center">
            <img src={imgUrl} alt={album_name} className="w-full md:w-1/2 h-auto aspect-square object-cover mb-4 md:mb-0 md:mr-4" />
            <div className="md:flex-1 flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-4">{album_name}</h1>
                <p className=" mb-2">{album_desc}</p>
                <p className=" text-sm mb-4">Released: {year_released}</p>
            </div>
        </div>
    </div>
    )
}