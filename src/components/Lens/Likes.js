import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';
import { addDoc, collection, doc, getDocs, query, runTransaction, setDoc, where, writeBatch, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Avatar, Box, Divider } from '@mui/material';

function Likes(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        getLikeUp();
    }, [props.data.id, props.update])

    async function getLikeUp() {
        // const id = detail == undefined ? data.id && data.id : detail.id;
        const cId = props.data.id;
        const q = query(collection(db, "Votes"), where("publicationId", "==", cId));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setCount(0);
        }
        querySnapshot.forEach((data) => {
            setCount(data.data().vote);
        })
    }
    return (
        <p className='m-2'>Votes {count}</p>
    )
}

export default Likes