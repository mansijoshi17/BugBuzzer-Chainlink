
import { Avatar, Button } from '@mui/material'
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPublicationByLatest } from '../../LensProtocol/post/explore/explore-publications';
import { getComments } from '../../LensProtocol/post/get-post';
import { getpublicationById } from '../../LensProtocol/post/get-publicationById';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';
import { addDoc, collection, doc, getDocs, query, runTransaction, setDoc, where, writeBatch, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import Vote from './Vote';

const category = ["reactjs", "javascript", "typescript"]


function QuestionDetails() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [displayCmt, setDisplayCmt] = useState([]);
  const [likeUp, setLikeUp] = useState(false);
  const [count, setCount] = useState(0);

  const param = useParams();

  async function get_posts() {
    try {
      const pst = await getpublicationById(param.id);
      setPost(pst.data.publication);
    } catch (error) {
      toast.error(error);
    }

  }

  async function getComm() {

    let arr = [];
    const cmt = await getComments(param.id);
    cmt && cmt.map((com) => {
      let obj = {
        typename: com?.__typename,
        avtar: com?.profile?.picture?.original?.url,
        name: com?.profile?.handle,
        comment: com?.metadata?.content,
        id: com?.id
      }
      arr.push(obj);
    })

    setDisplayCmt(arr);
  }

  async function getLikeUp() {
    // const id = detail == undefined ? data.id && data.id : detail.id;
    const cId = param.id;
    const q = query(collection(db, "Votes"), where("publicationId", "==", cId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setCount(0);
    }
    querySnapshot.forEach((data) => {
      setCount(data.data().vote);
    })
  }

  const addVotes = async (data) => {
    const id = window.localStorage.getItem("profileId");
    const q = query(collection(db, "Votes"), where("publicationId", "==", data));
    const querySnapshot = await getDocs(q);
    if (id) {
      if (querySnapshot.empty === true) {
        const docRef = await addDoc(collection(db, "Votes"), {
          vote: 1,
          voteBy: arrayUnion(id),
          publicationId: data
        });
        setLikeUp(!likeUp);
      } else {
        querySnapshot.forEach(async (react) => {
          const nycRef = doc(db, 'Votes', react.id);
          react.data().voteBy.map(async (e) => {
            if (e === id) {
              await updateDoc(nycRef, {
                vote: react.data().vote - 1,
                voteBy: arrayRemove(id),
              })
              setLikeUp(!likeUp);
            } else if (e !== id) {
              await updateDoc(nycRef, {
                vote: react.data().vote + 1,
                voteBy: arrayUnion(id)
              })
              setLikeUp(!likeUp);
            } else {
              await updateDoc(nycRef, {
                vote: react.data().vote,
                voteBy: react.data().voteBy
              })
              setLikeUp(!likeUp);
            }
          })

          if (react.data().voteBy.length === 0) {
            await updateDoc(nycRef, {
              vote: react.data().vote + 1,
              voteBy: arrayUnion(id)
            })
            setLikeUp(!likeUp);
          }
        });
      }
    } else {
      toast.error("Please Login first!");
    }
  }


  useEffect(() => {
    get_posts();
    getComm();
    getLikeUp();
  }, [param.id, likeUp])

  return (
    <div className='container footer-position ' style={{ marginTop: '8%' }}>
      <div className='row'>
        <div className='col-12'>
          <div className='d-flex justify-content-between'>
            <h3>Question</h3>
            <AnswerModal id={param.id} />
          </div>
          <Divider component="li" style={{ listStyle: 'none', margin: '10px' }} />
        </div>
        <div className='col-12 mt-5'>

          {
            post && <div className='p-3 text-left '  >
              <h3 className='text-primary' style={{ cursor: 'pointer' }}>{post?.metadata?.content}</h3>
              <p >{post?.metadata?.description}</p>
              <div className='d-flex justify-content-start'>

                {
                  category.map((e) => {
                    return (
                      <Button className='m-2 '>{e}</Button>
                    )
                  })
                }
              </div>
              <div className='d-flex justify-content-between'>
                <div className='d-flex '>
                  <p className='m-2' style={{ margin: '0 5px', cursor: 'pointer' }} onClick={() => addVotes(post.id)}>{count} Votes</p>
                  <p className='m-2'>{post?.stats?.totalAmountOfComments} Answers</p>
                </div>
                <div style={{ cursor: 'pointer' }} className="d-flex">
                  <Avatar alt="" src={post?.profile?.picture != null ? post?.profile?.picture?.original?.url : "https://www.pinpng.com/pngs/m/615-6154495_avatar-png-icon-business-woman-icon-vector-transparent.png"} />

                  <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                    <p className=" text-secondary" style={{ padding: '7px 15px' }}>
                      {post?.profile?.handle}
                    </p>
                  </Box>
                </div>
              </div>
              <Divider component="li" style={{ listStyle: 'none' }} />
            </div>
          }

        </div>
        <div className='col-12 text-left mt-4'>
          <h3>Answers ({post?.stats?.totalAmountOfComments})</h3>
          <Divider component="li" style={{ listStyle: 'none' }} />
          {
            displayCmt && displayCmt.map((e) => {
              return (
                <Vote data={e} add={addVotes} update={likeUp} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default QuestionDetails