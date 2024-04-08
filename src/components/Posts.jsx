
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import {app} from '../firebase';
import Post from './Post';



async function Posts() {

const db = getFirestore(app);

const q = query(collection(db , 'posts'),orderBy('timestamp','desc'));
const querySnapShot = await getDocs(q)
let data = [];

querySnapShot.forEach((doc)=>{
    data.push({id:doc.id , ...doc.data()});
})

  return (
    <div>
      {
        data.map((post)=>(
            <Post
             key={post.id}
             post={post}
            />
        ))
      }
    </div>
  )
}

export default Posts
