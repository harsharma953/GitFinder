import React,{useState,useEffect} from 'react'
import Axios from "axios"
import { ListGroup,ListGroupItem } from 'reactstrap'

const Repos = ({repos_url}) => {
  
  const [repos,setRepos] = useState([]);
    
   const fetchRepos = async()=>{
     console.log("this is url")
     console.log(repos_url)
     const {data} = await Axios.get(repos_url);
     setRepos(data);
   }

   useEffect(()=>{
     fetchRepos()
   },[repos_url])


   

   return (
     <ListGroup>
      
       {repos.map(repo=>{
        return <ListGroupItem key={repo.id}>
               <div className="text-primary">{repo.name}</div>
               <div className="text-secondary">{repo.language}</div>
         </ListGroupItem>
       })}
     </ListGroup>
   )
}

export default Repos
