import { useState, createContext, useEffect } from "react";
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';

export const FirebaseData = createContext();

export default function FirebaseDataProvider({children}){
    const [allPosts, setAllPosts] = useState([]);

    useEffect(
        ()=>{
            const postsRef = collection(db, 'Posts');
            getDocs(postsRef)
            .then((result)=>{
               const posts = result.docs.map((item)=>{
                return {id: item.id, ...item.data()};
               });
            setAllPosts(posts);
            })
            .catch((error)=> console.error(error));
        },[]
    )
    return (
        <FirebaseData.Provider value={{allPosts}}>
            {children}
        </FirebaseData.Provider>
    );
}