import React, { useState, useContext } from "react";
import Axios from "axios";

import {
  Row,
  Container,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

import { Redirect } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";
import Repos from "../Components/Repos";
import UserCard from "../Components/UserCard";

const Home = () => {
  const context = useContext(UserContext);
  
  // console.log("this is context");
  console.log(context);
   
  

  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const fetchDetails = async function () {

    try {

     
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      console.log(data);
      setUser(data);
      
    } catch (error) {
      toast("Not Available", { type: "error" });
    }
  };

  if(context.user==null)
  {
     return <Redirect to="/signin"></Redirect>
  }

  return (
    
    <Container>
      <Row className=" mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              value={query}
              placeholder="Please provide the username"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={fetchDetails}>
                Fetch User
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {user ? <UserCard user={user} /> : null}
        </Col>
        <Col md="7">{user ? <Repos repos_url={user.repos_url} /> : null}</Col>
      </Row>
    </Container>
  );
};

export default Home;
