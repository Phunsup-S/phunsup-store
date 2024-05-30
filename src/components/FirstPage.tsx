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
import { getProductsList } from '../services/items';
import { albums } from '../types/albums';


export default function FirstPage() {

    const [items, setItems] = useState<albums[]>([
    ]);

    useEffect(() => {
        getProductsList().then((res)=>{
            setItems(res)
        })
    }, [])


    function goToDetail(id: string) {
        window.location.href = '/detail/' + id
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Album List</h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
                {items.map(item => (
                    <div key={item._id} className="bg-custom-gray shadow-lg rounded-lg overflow-hidden mb-6">
                        <img src={item.imgUrl} alt={item.albumName} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-6">{item.albumName}</h2>
                            <Button
                                onClick={() => goToDetail(item._id)}
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
                                Detail
                            </Button>
                        </div>
                    </div>
                ))}



            </div>
        </div>
    );
}