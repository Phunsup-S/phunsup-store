import { useEffect, useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Link } from '@mui/material';
import Button from '@mui/material/Button';
import '../App.css'
export default function AdminPage() {

    const [items, setItems] = useState<{ _id: string, img_url: string, album_name: string, album_desc: string, year_released: string, album_price: number, youtube_link: string, spotify_link: string, update_at: string, __v: string }[]>([
    ]);

    useEffect(() => {
        ProductsGet();
    }, [])
    const ProductsGet = () => {

        fetch("https://testapi-livid.vercel.app/products")
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                },
            )
    }

    function goToDetail(id: string) {
        window.location.href = '/Detail/' + id
    }
    function handleDelete(id: string) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id": id
        });

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
        };

        fetch("https://testapi-livid.vercel.app/products/" + id, requestOptions)
            .then((response) => response.json())
            .then(() => {
                alert("ลบข้อมูลแล้ว")
                ProductsGet();
            })
            .catch((error) => console.error(error));
    }
    function handleEdit(id: string) {
        window.location.href = '/Edit/' + id
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Album List</h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
                {items.map(item => (
                    <div key={item._id} className="bg-custom-gray shadow-lg rounded-lg overflow-hidden mb-6 relative">
                        <img src={item.img_url} alt={item.album_name} className="w-full h-48 object-cover" />
                        <div className="absolute top-0 right-0 p-2">
                            <Button onClick={() => handleEdit(item._id)} >Edit</Button>
                            <button style={{ color: 'red' }}
                                onClick={() => handleDelete(item._id)}
                                className=" text-red rounded-full p-2 hover:bg-red-200 focus:outline-none"
                            >
                                X
                            </button>
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-6">{item.album_name}</h2>
                            <Button
                                onClick={() => goToDetail(item._id)}
                                variant="outlined"
                                sx={{
                                    color: '#9e958a',
                                    borderColor: '#9e958a',
                                    '&:hover': {
                                        backgroundColor: '#9e958a',
                                        color: 'white',
                                        borderColor: '#9e958a',
                                    },
                                }}
                            >
                                เพิ่มเติม
                            </Button>
                        </div>
                    </div>
                ))}

                <div style={{ display: 'flex' }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[316px] border border-gray-400 flex items-center justify-center shadow-lg rounded-lg">
                    <Link href="Create" style={{ textDecoration: 'none' }} >
                        <Button
                            className="text-9xl rounded-full" // ปรับขนาดตัวอักษรเป็น 9xl
                            sx={{
                                width: '50px', // ปรับขนาดความกว้างของปุ่ม
                                height: '50px', // ปรับขนาดความสูงของปุ่ม
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem', // ปรับขนาดตัวอักษรให้ใหญ่ขึ้น
                                color: '#9e958a', // สีของตัวอักษร
                                borderColor: '#9e958a', // สีของเส้นขอบ
                                textDecoration: 'none',
                                '&:hover': {
                                    backgroundColor: 'none', // สีพื้นหลังเมื่อโฮเวอร์
                                    color: 'white', // สีของตัวอักษรเมื่อโฮเวอร์
                                    borderColor: '#9e958a', // สีของเส้นขอบเมื่อโฮเวอร์
                                    textDecoration: 'none',
                                },
                            }}
                        >
                            +
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}