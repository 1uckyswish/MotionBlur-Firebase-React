import { useState, createContext, useEffect } from "react";
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const FirebaseData = createContext();

export default function FirebaseDataProvider({children}){
    const [allPosts, setAllPosts] = useState([]);
    
     function isYouTubeLink(link) {
    return link.includes('youtube.com');
  }

    useEffect(
        ()=>{
            const postsRef = collection(db, 'Posts');
            const q = query(postsRef, orderBy('CreatedAt', "desc"))
            onSnapshot(q,(snapshot)=>{
               const posts = snapshot.docs.map((item)=>{
                return {id: item.id, ...item.data()};
               });
            setAllPosts(posts);
            })
        },[]
    )
    return (
        <FirebaseData.Provider value={{allPosts, isYouTubeLink}}>
            {children}
        </FirebaseData.Provider>
    );
}