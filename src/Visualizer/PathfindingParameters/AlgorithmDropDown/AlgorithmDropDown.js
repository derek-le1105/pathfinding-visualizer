import { useState } from 'react'
import './AlgorithmDropDown.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'

const AlgorithmDropDown = ({ algorithm, setAlgorithm, algoList }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="dropdown" style={{ margin: '15px' }}>
      <button
        onClick={handleMenuOpen}
        style={{ height: `100%`, minWidth: '120px' }}
      >
        <span>{algorithm} </span>
        {
          //got rotate transition from here
          //https://stackoverflow.com/questions/69656883/i-want-the-arrow-icon-to-flip-up-and-down-every-time-the-state-changes-and-i-wan
          <FontAwesomeIcon
            icon={faCaretUp}
            style={{
              transition: 'all 0.5s ease',
              transform: `rotate(${menuOpen ? 0 : `0.5turn`})`,
            }}
          ></FontAwesomeIcon>
        }
      </button>
      {menuOpen && (
        <ul className="algorithm-menu">
          {algoList.map((algo) => (
            <li className="menu-item">
              <button
                onClick={() => {
                  setAlgorithm(algo)
                  setMenuOpen(!menuOpen)
                }}
              >
                {algo}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AlgorithmDropDown
