import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams,
  useNavigate
} from 'react-router-dom'

import { useField } from './hooks'
import { Table, Navbar, Nav} from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    /*
    <div>
      <a href='/anecdotes' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='/' style={padding}>about</a>
    </div> */

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/anecdotes">anecdotes</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/create">create new</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/">about</Link>
      </Nav.Link>
      </Nav>
    </Navbar.Collapse>
   </Navbar>
    


  )
}

const Anecdote = ({ anecdotes }) => {

  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === Number(id))

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <Link>{anecdote.info}</Link></div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
      {anecdotes.map(anecdote => 
       <tr key={anecdote.id}>
        <td>
        <Link to={`/anecdotes/${anecdote.id}`}>
          {anecdote.content}
        </Link>
        </td>
        </tr>
        )}
    </tbody>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ addNew, setNotification}) => {

    const content = useField()
    const author = useField()
    const info = useField()

    const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
   
    setNotification(`a new anecdote '${content.value}'created!`)

    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/anecdotes')
  } 

  const handleReset = () => {
    // eslint-disable-next-line no-unused-expressions
    content.reset(),
    author.reset(),
    info.reset()
  }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          content
          <input {...content}/>
          <br />
             author
          <input {...author}/>
          <br />
              url for more info
          <input {...info}/>
          <br />
          <button type="submit">create</button>
          <button onClick={handleReset} type="button">reset</button>
        </form>
      </div>
    )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')


  /* const match = useMatch('anecdotes/:id')

  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null */


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  return (
    <Router>
      <div className='container'>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification && <div>{notification}</div>}
        <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes}/>}/>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/' element={ <About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
        </Routes>
        <Footer />
    </div> 
    </Router>
  )
}


export default App

