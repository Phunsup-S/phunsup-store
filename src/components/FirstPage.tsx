import { useEffect, useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box } from '@mui/material';
import Button from '@mui/material/Button';
import '../App.css'
export default function FirstPage() {

    const [items, setItems] = useState<{ _id: string, img_url: string, album_name: string, album_desc: string, year_released: string, album_price: number, update_at: string, __v: string }[]>([
    ]);

    useEffect(() => {
        ProductsGet();
    }, [])
    const ProductsGet = () => {

        fetch("http://localhost:3000/products")
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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Album List</h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
                {items.map(item => (
                    <div key={item._id} className="bg-custom-gray shadow-lg rounded-lg overflow-hidden mb-6">
                        <img src={item.img_url} alt={item.album_name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-6">{item.album_name}</h2>
                            {/* <p className="text-gray-700 mb-2">{item.album_desc}</p>
                            <p className="text-gray-500 text-sm mb-4">Released: {item.year_released}</p> */}

                            <Button
                                onClick={() => goToDetail(item._id)}
                                variant="outlined"
                                sx={{
                                    color: '#9C958B', // สีของตัวอักษร
                                    borderColor: '#9C958B', // สีของเส้นขอบ
                                    '&:hover': {
                                        backgroundColor: '#9C958B', // สีพื้นหลังเมื่อโฮเวอร์
                                        color: 'white', // สีของตัวอักษรเมื่อโฮเวอร์
                                        borderColor: '#9C958B', // สีของเส้นขอบเมื่อโฮเวอร์
                                    },
                                }}
                            >
                                เพิ่มเติม
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}