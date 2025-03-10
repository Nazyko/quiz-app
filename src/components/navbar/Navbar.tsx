import { Flex, Image, Text } from "@mantine/core"
import { Link, NavLink } from "react-router-dom"
import "./Navbar.css"
import Bee from "../../assets/nav/bee.svg"


export const Navbar = () => {

  return (
    <div className='wrapper'>
      <Flex align='center' justify='space-around' className="nav">
        <Link to='/' className="logo">
          <Image src={Bee}/>
          <Text fw={500}>Quiz Api Demo</Text>
        </Link>
        <Flex gap={20}>
          {/* <NavLink to='/docs' className="nav-docs">Qollanba</NavLink> */}
          <NavLink to='/options' className="nav-options">Sazlamalar</NavLink>
          <NavLink to='/auth' className="login">Login</NavLink> 
        </Flex>
      </Flex>
    </div>
  )
}
