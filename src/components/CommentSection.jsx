/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'

import { addDoc, collection, getFirestore, onSnapshot, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { app } from "@/firebase";
import Moment from 'react-moment'

function CommentSection({id}) {
  const {data:session}= useSession();
  const [comment ,setComment] = useState('')
  const [comments , setComments] = useState([]);
  const db = getFirestore(app)

  async function handleSubmit(e){
    e.preventDefault();

    //Add comment to firestore

    await addDoc(collection(db,'posts',id,'comments'),{
        comment:comment,
        username:session?.user?.username,
        userImage:session?.user?.image,
        timestamp:serverTimestamp(),
    })

    setComment('');
  }

  useEffect(()=>{
    onSnapshot(query(collection(db,'posts',id,'comments')),(snapshot)=>{
        setComments(snapshot.docs);
    })
  },[db])
  
  return (
    <div>
        {
        comments.length >0 &&(
            <div className="p-2 overflow-y-scroll max-h-24 flex flex-col  gap-2">
                {
                    comments.map((comment , id)=>(
                        <div  key={id}   className="flex items-center justify-between ">
                            <img 
                             src={comment.data().userImage}
                             alt="userImage"
                             className="h-7 rounded-full object-cover border p-[2px]" 
                            />
                            <p className="text-sm text-gray-700 truncate flex-1">
                               <span className="font-semibold mr-2 ml-1">{comment.data().username}</span> 
                             {comment.data().comment}
                            </p>
                            <Moment fromNow className="text-xs text-gray-400 ">
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))
                }

            </div>
        )
        }
        {
        session && (
            <form className="flex items-center gap-2 p-2" onSubmit={handleSubmit}>
                <img src= {session.user.image} alt="userImage" 
                className='h-10 w-10 rounded-full border p-[4px] object-cover '
                />
                <input
                 type="text"
                 value={comment}
                 onChange={(e)=>setComment(e.target.value)}
                 placeholder="Enter Comment"
                 className="border-none flex-1 focus:ring-0 outline-none"
                />
                <button
                 disabled={comment.trim()===""}
                 type="submit"
                 className="text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                    Post
                </button>
            </form>
        )
        } 
    </div>
  )
}

export default CommentSection
