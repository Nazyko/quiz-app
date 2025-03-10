import { Link } from "react-router-dom"
import "./Home.css"
import { Button } from "@mantine/core"


export const Home = () => {
  const token = localStorage.getItem('token')
  return (
    <div className="wrapper">
      <div className="home">
        <h1>Assalawma Aleykum!</h1>
        <p>Húrmetli paydalanıwshı, bul jerde siz IT tarawındaǵı bilimlerińizdi sınaqtan ótkeriwińiz múmkin!</p>
        <p>Bunıń ushın aldın ala <a className="quiz-api-link" href="https://quizapi.io/">Quiz API</a> saytınan dizimnen ótken bolıwıńız kerek!</p>
        <Button color='yellow' p={16} size="lg" w={150} mt={40}>
          <Link to={token ? "/categories" : "/auth"}>Baslaw</Link>
        </Button>
      </div>
    </div>
  )
}
